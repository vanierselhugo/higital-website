// CloudLinux/Passenger loads CommonJS entrypoints. This wrapper starts the
// existing ESM server using the port assigned by the hosting environment.
import('./scripts/server.mjs')
  .then(({startPassengerServer})=>startPassengerServer())
  .catch(error=>{
    console.error('Higital Passenger-start mislukt:',error);
    process.exitCode=1;
  });
