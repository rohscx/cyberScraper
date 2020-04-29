const readline = require("readline");
const cyberArk0 = require('./lib/cyberArk0.js');

const win32 = process.platform === 'win32' ? true: false; //?
const configuration = require('./securityConfiguration.js');

const powerShellPutty = require('./lib/powerShellPutty.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,

});



const choicesR1 = [`Select A Scaper ? \n 1 :: cyberArk0 <passwordOnly> \n\n 2 :: cyberArk0 <gui> \n\n 3 :: cyberArk0 <headless> \n\n 4 :: cyberArk0 <manualPassword> \n\n`];
const choicesR2 = [`Enter Password ? \n`];

rl.question(choicesR1, function(choice) {
 const {puppeteerUrl1, puppeteerTimeout, sputtyUserName} = configuration[0];
switch (+choice) {
  case 1:
    cyberArk0(puppeteerUrl1,{headless: true, timeout: puppeteerTimeout})
      .then((t) => {
        console.log("\n\n"+t+"\n\n")
        rl.question("Press any key to Close ", function(anyKey) {
          console.log(`${anyKey} Presses`);
          rl.close();
      });
    return t;
  })
  .catch((t) => cyberArk0(puppeteerUrl1,{headless: true, timeout: puppeteerTimeout})
  .then((t) => {
    console.log("\n\n"+t+"\n\n")
    rl.question("Press any key to Close ", function(anyKey) {
      console.log(`${anyKey} Presses`);
      rl.close();
    });
    return t;
  }))
  .finally(console.log);
    break;
  case 2:
    cyberArk0(puppeteerUrl1,{headless: false, timeout: puppeteerTimeout}).then((t) => {
      console.log("\n\n"+t+"\n\n")
      rl.question("Press any key to Close ", function(anyKey) {
        console.log(`${anyKey} Presses`);
        rl.close();
    });
    return t;
  })
  .catch((t) => cyberArk0(puppeteerUrl1,{headless: false, timeout: puppeteerTimeout}).then((t) => {
    console.log("\n\n"+t+"\n\n")
    rl.question("Press any key to Close ", function(anyKey) {
      console.log(`${anyKey} Presses`);
      rl.close();
    });
    return t;
  }))
  .finally(console.log);
    break;
  case 3:
    cyberArk0(puppeteerUrl1,{headless: true, timeout: puppeteerTimeout}).then((t) => {
      console.log("\n\n"+t+"\n\n"+"win32 "+win32+"\n\n");
     
      const winSputty = new powerShellPutty(sputtyUserName,t,rl);
      if (win32) winSputty.sPutty() //?
      //rl.close()
      
    return t;
    })
    .catch((t) => cyberArk0(puppeteerUrl1,{headless: true, timeout: puppeteerTimeout}).then((t) => {
      console.log("\n\n"+t+"\n\n"+"win32 "+win32+"\n\n");
     
      const winSputty = new powerShellPutty(sputtyUserName,t,rl);
      if (win32) winSputty.sPutty() //?
      //rl.close()
      
      return t;
      }))
      .finally(console.log);
    break;
  case 4:
    rl.close();
    const r2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    
    });
    r2.question(choicesR2, function(password) {
      const winSputty = new powerShellPutty(sputtyUserName,password,r2);
    if (win32) winSputty.sPutty() //?
    })
  break;
  default:
    break;
}
});

rl.on("close", function() {
  // console.log("\nBYE BYE !!!");
  // process.exit(0);
});