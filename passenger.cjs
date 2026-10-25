// CloudLinux/Passenger loads CommonJS entrypoints. This wrapper starts the
// existing ESM server, whose listener Passenger routes over its private socket.
import('./scripts/server.mjs')
  .then(({startPassengerServer})=>startPassengerServer())
  .catch(error=>{
    console.error('Higital Passenger-start mislukt:',error);
    process.exitCode=1;
  });
