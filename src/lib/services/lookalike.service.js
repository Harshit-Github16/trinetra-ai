const dns = require('dns').promises;

/**
 * Homoglyph character substitution map.
 */
const HOMOGLYPHS = {
  'a': ['o', '4', '@'],
  'c': ['k', 's'],
  'e': ['3'],
  'g': ['q', '9'],
  'i': ['1', 'l', '|'],
  'l': ['1', 'i', '|'],
  'o': ['0', 'u', 'p'],
  's': ['5', 'z'],
  't': ['7'],
  'u': ['v', 'o']
};

/**
 * Generate lookalike domain candidates.
 */
const generateCandidates = (domain) => {
  const dotIndex = domain.indexOf('.');
  if (dotIndex === -1) return [];

  const name = domain.substring(0, dotIndex);
  const tld = domain.substring(dotIndex + 1);
  const candidates = new Set();

  // 1. Homoglyphs
  for (let i = 0; i < name.length; i++) {
    const char = name[i];
    if (HOMOGLYPHS[char]) {
      HOMOGLYPHS[char].forEach(sub => {
        const candidate = name.substring(0, i) + sub + name.substring(i + 1) + '.' + tld;
        candidates.add(candidate);
      });
    }
  }

  // 2. Character Omission (Missing character)
  for (let i = 0; i < name.length; i++) {
    const candidate = name.substring(0, i) + name.substring(i + 1) + '.' + tld;
    if (candidate.split('.')[0].length > 1) {
      candidates.add(candidate);
    }
  }

  // 3. Character Insertion / Duplication
  for (let i = 0; i < name.length; i++) {
    const candidate = name.substring(0, i) + name[i] + name[i] + name.substring(i + 1) + '.' + tld;
    candidates.add(candidate);
  }

  // 4. Transposition (swapping adjacent characters)
  for (let i = 0; i < name.length - 1; i++) {
    const chars = name.split('');
    const temp = chars[i];
    chars[i] = chars[i + 1];
    chars[i + 1] = temp;
    candidates.add(chars.join('') + '.' + tld);
  }

  // 5. Common TLD Variations
  const commonTlds = ['net', 'org', 'co', 'in', 'xyz'];
  commonTlds.forEach(altTld => {
    if (altTld !== tld) {
      candidates.add(name + '.' + altTld);
    }
  });

  return Array.from(candidates).filter(c => c !== domain);
};

/**
 * Safely resolves an IP address for a domain to check if it's active.
 */
const resolveIp = async (domain) => {
  try {
    const ips = await dns.resolve4(domain);
    return { domain, active: true, ips };
  } catch (err) {
    return { domain, active: false, ips: [] };
  }
};

/**
 * Service to run typosquatting and homoglyph scan.
 */
const detectLookalikeDomains = async (targetDomain) => {
  try {
    const candidates = generateCandidates(targetDomain);
    
    // Select top 12 candidates to test (to avoid spamming DNS servers)
    const selectedCandidates = candidates.slice(0, 12);
    
    // Resolve DNS for all candidates in parallel
    const results = await Promise.all(selectedCandidates.map(resolveIp));
    
    return {
      totalFound: candidates.length,
      scannedCount: selectedCandidates.length,
      lookalikes: results
    };
  } catch (error) {
    console.error('Error in lookalike domain detection:', error);
    return { totalFound: 0, scannedCount: 0, lookalikes: [] };
  }
};

module.exports = {
  detectLookalikeDomains
};
