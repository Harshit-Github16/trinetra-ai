const net = require('net');
const checkPort = (port, host) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = 'closed';

    socket.setTimeout(2000);

    socket.on('connect', () => {
      status = 'open';
      socket.destroy();
    });

    socket.on('timeout', () => {
      status = 'closed';
      socket.destroy();
    });

    socket.on('error', (err) => {
      status = 'closed';
    });

    socket.on('close', () => {
      resolve({ port, status });
    });

    socket.connect(port, host);
  });
};

Promise.all([21, 22, 23, 3306, 3389].map(p => checkPort(p, 'google.com'))).then(console.log);
