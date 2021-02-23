
## Setup
Install the wdio and puppeteer in the folder with project using:
```terminal
npm instal @wdio/cli
npm i puppeteer
npm i puppeteer-core
```
## Configurate
Use next in wdio.conf.js (if u want to use your configurate)
```terminal
const puppeteerCore = require('puppeteer-core');

exports.config = {
 capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions':{
                args: ['--remote-debugging-port=48712']

        },
    }],


before: function () {
        browser.url('http://127.0.0.1:48712/json/version');
        let body = $("body");
        let connections = JSON.parse(body.getText());
        let puppeteer = browser.call(() =>{
            return puppeteerCore.connect({
                browserWSEndpoint: connections.webSocketDebuggerUrl
            });
        });
        global.puppeteer = puppeteer;
        console.log('### Puppeteer and WDIO connected!');
     },
}
```
You can use another free port, but don't forget to use it at two places 
(on 'args' and on 'browser.url')

## Start tests
Run the tests on how to do this with wdio
```terminal
npx wdio run wdio.conf.js
```
## Some examples
With all of this, you can write commands from wdio and puppeteer. 
But you must understand that puppeteer uses only async mode.
If you would like to write async commands at sync mode, you can try next:

```terminal
    const page = browser.call(() => puppeteer.pages())[0];
    page.keyboard.type('Some text');
```
You can use every command that you can find at [Puppeteer site](https://pptr.dev/).
For example let's write all requests with response:

```terminal
const button = ('#gb > div > div.gb_Ue > a'); //it`s signIn button at google.com

describe('Google page', () => {
    const page = browser.call(() => puppeteer.pages())[0];

    it('puppeteer + wdio', () => {
        browser.url("https://www.google.com/");
        browser.pause(1000);

        page.on('response', (response) => { 
            //it`s event emitter, more info at eventEmitter.on
            //we can not use browser.call cause page is actual at call
        
            console.log(response.request()._method , response.status(), 
            response.request()._resourceType, response.request()._url);
        })
        $(button).click();
        browser.pause(1000);
    })
})

```
Some more examples you can check at the project

## Thanks
Thanks for informatio to [Oleksandr Khotemskyi](https://xotabu4.github.io/) that I found at this [video](https://www.youtube.com/watch?v=UzdUu9QllK0&ab_channel=SeleniumCamp).
