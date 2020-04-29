const puppeteer = require('puppeteer');


 
module.exports = (url,options) => {
    return new Promise (async (resolve, reject) => {
    console.log(url)
    const browser = await puppeteer.launch(options)
    const page = await browser.newPage()

    const navigationPromise = page.waitForNavigation()
    
    await page.goto(url).catch(reject)
    
    await page.setViewport({ width: 1920, height: 937 }).catch(reject)
    
    await navigationPromise
    
    await page.waitForSelector('.login_main > .login_controls_container > #pvBody_PageTemplate_innerHolder_CAAuthMethodsList1_pnlAuthMethods > .AuthMethodButton:nth-child(2) > span').catch(reject)
    await page.click('.login_main > .login_controls_container > #pvBody_PageTemplate_innerHolder_CAAuthMethodsList1_pnlAuthMethods > .AuthMethodButton:nth-child(2) > span').catch(reject)
    
    await navigationPromise
    
    await navigationPromise
    
    await navigationPromise
    
    await navigationPromise
    
    await page.waitForSelector('.auth-content-inner > .mfa-verify > #form2 > .o-form-button-bar > .button').catch(reject)
    await page.click('.auth-content-inner > .mfa-verify > #form2 > .o-form-button-bar > .button').catch(reject)
    
    await navigationPromise
    
    await navigationPromise
    
    await navigationPromise
  
    await page.waitForSelector('tbody > tr > .x-grid3-td-column5 > .x-grid3-cell-inner > .Grid-Panel-All').catch(reject)
    await page.click('tbody > tr > .x-grid3-td-column5 > .x-grid3-cell-inner > .Grid-Panel-All').catch(reject)
    
    await navigationPromise
    
    await page.waitForSelector('table #pvBody_PageTemplate_innerHolder_ObjDetails_PassContent_cmdShow').catch(reject)
    await page.click('table #pvBody_PageTemplate_innerHolder_ObjDetails_PassContent_cmdShow').catch(reject)
    
    await page.waitForSelector('td > .TableBorderNoTopBorder > tbody > .PasswordFieldsContentRow:nth-child(2) > td:nth-child(1)').catch(reject)
    await page.click('td > .TableBorderNoTopBorder > tbody > .PasswordFieldsContentRow:nth-child(2) > td:nth-child(1)').catch(reject)
    
    
    await page.waitForSelector('table #pvBody_PageTemplate_innerHolder_ObjDetails_PassContent_cmdShow').catch(reject)
    await page.click('table #pvBody_PageTemplate_innerHolder_ObjDetails_PassContent_cmdShow').catch(reject)
    
    await page.waitForSelector('.TableBorderNoTopBorder > tbody > .PasswordFieldsContentRow > td > .PasswordContent').catch(reject)
    await page.click('.TableBorderNoTopBorder > tbody > .PasswordFieldsContentRow > td > .PasswordContent').catch(reject)
    
    //await page.screenshot({path: './export/zAccount.png'});
    
    const arkPassword = await page.evaluate(async () => {
        let userPassword = () => {
          const data = document.getElementById('pvBody_PageTemplate_innerHolder_ObjDetails_PassContent_lblPasswordContent').innerText;
          return data;
        };
        // const copyToClipboard = str => {
        //   const el = document.createElement('textarea');  // Create a <textarea> element
        //   el.value = str;                                 // Set its value to the string that you want copied
        //   el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
        //   el.style.position = 'absolute';                 
        //   el.style.left = '-9999px';                      // Move outside the screen to make it invisible
        //   document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
        //   const selected =            
        //     document.getSelection().rangeCount > 0        // Check if there is any content selected previously
        //       ? document.getSelection().getRangeAt(0)     // Store selection if found
        //       : false;                                    // Mark as false to know no selection existed before
        //   el.select();                                    // Select the <textarea> content
        //   document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
        //   document.body.removeChild(el);                  // Remove the <textarea> element
        //   if (selected) {                                 // If a selection existed before copying
        //     document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
        //     document.getSelection().addRange(selected);   // Restore the original selection
        //   }
        // };

        const revealed = (data,count) => {
          const result = data.search(new RegExp(/(\*){1,}/)) !== 0;
          console.log(`Attempt: ${count} , Password detected: ${result}`)
          return result;
        };
        function timeout(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        };
        let counter = 0;
        while (!revealed(userPassword(),counter)) {
          ++ counter
          const checkAgain = await timeout(counter * 500).then((t) => userPassword());
          if (counter == 10) return checkAgain;
        }
                
      // setTimeout(() => {
      //   copyToClipboard(data);
      //   //consoleLogger(data);
      // }, 2000);
      return userPassword();
    }).catch(reject)
    resolve(arkPassword);
    //await browser.close()
    })
  }