const dns = require('dns').promises;

/**
 * Parses and validates SPF TXT record configuration.
 */
const validateSpf = (txtRecords, domain, resolver) => {
  const spfRecord = txtRecords.find(records => 
    records.some(r => r.startsWith('v=spf1'))
  );

  const rawQuery = `dig TXT ${domain} @${resolver}`;

  if (!spfRecord) {
    return {
      status: 'missing',
      record: null,
      valid: false,
      grade: 'F',
      rawQuery,
      rawResponse: 'No records matching "v=spf1" found in TXT response.',
      message: 'No SPF record found. Your domain is highly vulnerable to email spoofing/forgery.'
    };
  }

  const rawRecord = spfRecord.join(' ');
  const isHardFail = rawRecord.includes('-all');
  const isSoftFail = rawRecord.includes('~all');

  return {
    status: 'configured',
    record: rawRecord,
    valid: true,
    grade: isHardFail ? 'A' : isSoftFail ? 'B' : 'C',
    rawQuery,
    rawResponse: `ANSWER SECTION:\n${domain}. IN TXT "${rawRecord}"`,
    message: isHardFail 
      ? 'Strong SPF policy configured with Hard Fail (-all).'
      : isSoftFail 
      ? 'Moderate SPF policy configured with Soft Fail (~all).' 
      : 'Weak SPF policy configured (missing restriction mechanism).'
  };
};

/**
 * Resolves and validates DMARC TXT record configuration.
 */
const validateDmarc = async (domain, resolver) => {
  const dmarcDomain = `_dmarc.${domain}`;
  const rawQuery = `dig TXT ${dmarcDomain} @${resolver}`;

  try {
    const txtRecords = await dns.resolveTxt(dmarcDomain);
    const dmarcRecord = txtRecords.find(records => 
      records.some(r => r.startsWith('v=DMARC1'))
    );

    if (!dmarcRecord) {
      return {
        status: 'missing',
        record: null,
        valid: false,
        grade: 'F',
        policy: 'none',
        rawQuery,
        rawResponse: 'No records matching "v=DMARC1" found in TXT response.',
        message: 'No DMARC record discovered. Spoofed emails cannot be tracked or blocked.'
      };
    }

    const rawRecord = dmarcRecord.join(' ');
    
    // Parse policies: p=reject, p=quarantine, p=none
    let policy = 'none';
    if (rawRecord.includes('p=reject')) policy = 'reject';
    else if (rawRecord.includes('p=quarantine')) policy = 'quarantine';

    return {
      status: 'configured',
      record: rawRecord,
      valid: true,
      grade: policy === 'reject' ? 'A' : policy === 'quarantine' ? 'B' : 'C',
      policy,
      rawQuery,
      rawResponse: `ANSWER SECTION:\n${dmarcDomain}. IN TXT "${rawRecord}"`,
      message: policy === 'reject'
        ? 'DMARC is fully configured in REJECT mode. Spoofed messages will be blocked.'
        : policy === 'quarantine'
        ? 'DMARC is configured in QUARANTINE mode. Spoofed messages will be marked as spam.'
        : 'DMARC configured in monitor-only mode (p=none). Spoofed emails are not blocked.'
    };
  } catch (err) {
    return {
      status: 'missing',
      record: null,
      valid: false,
      grade: 'F',
      policy: 'none',
      rawQuery,
      rawResponse: `DNS Query Failed: ${err.code || err.message}`,
      message: 'No DMARC record discovered. Spoofed emails cannot be tracked or blocked.'
    };
  }
};

/**
 * Resolves a list of common DKIM selectors in parallel.
 */
const checkDkimSelectors = async (domain, resolver) => {
  const commonSelectors = ['google', 'default', 's1', 'mail', 'mailgun'];
  
  const checkSelector = async (selector) => {
    const recordName = `${selector}._domainkey.${domain}`;
    try {
      const records = await dns.resolveTxt(recordName);
      const rawRecord = records.map(r => r.join(' ')).join('\n');
      return {
        selector,
        found: true,
        recordName,
        rawQuery: `dig TXT ${recordName} @${resolver}`,
        record: rawRecord
      };
    } catch (err) {
      return {
        selector,
        found: false,
        recordName,
        rawQuery: `dig TXT ${recordName} @${resolver}`,
        error: err.code || err.message
      };
    }
  };

  const results = await Promise.all(commonSelectors.map(checkSelector));
  const active = results.filter(r => r.found);

  return {
    status: active.length > 0 ? 'configured' : 'missing',
    checked: results,
    active,
    message: active.length > 0
      ? `Discovered ${active.length} active DKIM selectors: ${active.map(a => a.selector).join(', ')}.`
      : 'No active DKIM selectors discovered automatically (scanned default, google, s1, mail, mailgun).'
  };
};

/**
 * Service to aggregate SPF, DMARC, and active DKIM configurations.
 */
const checkEmailSecurity = async (domain) => {
  try {
    const servers = dns.getServers();
    const resolver = servers[0] || '8.8.8.8';

    let txtRecords = [];
    try {
      txtRecords = await dns.resolveTxt(domain);
    } catch (err) {
      // If domain doesn't exist or TXT lookup fails, proceed with empty records
    }

    const spfResult = validateSpf(txtRecords, domain, resolver);
    const dmarcResult = await validateDmarc(domain, resolver);
    const dkimResult = await checkDkimSelectors(domain, resolver);

    const overallGrade = spfResult.valid && dmarcResult.valid 
      ? (dmarcResult.policy === 'reject' ? 'A' : 'B')
      : 'D';

    return {
      overallGrade,
      resolver,
      spf: spfResult,
      dmarc: dmarcResult,
      dkim: dkimResult
    };
  } catch (error) {
    console.error('Error checking email security records:', error);
    return {
      overallGrade: 'F',
      resolver: 'unknown',
      spf: { status: 'error', record: null, valid: false },
      dmarc: { status: 'error', record: null, valid: false },
      dkim: { status: 'error', record: null, active: [] }
    };
  }
};

module.exports = {
  checkEmailSecurity
};
