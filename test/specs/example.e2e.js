const { Puppeteer } = require("puppeteer-core");
const button = ('#gb > div > div.gb_Ue > a');
const Pages = require('../pageobjects/page')
const get = 'GET';
const post = 'POST';
const firstLinkOnGoogle = '#rso > div:nth-child(1) > div:nth-child(1) > div > div.yuRUbf > a > h3';
describe('Google page', () => {

    it('puppeteer + wdio', () => {
        browser.setWindowSize(1280 , 1024);
        browser.url("https://www.google.com/");
        browser.pause(1000);



        Pages.getRequestURL();
       // $(button).click();
        //browser.pause(10000);

        Pages.typeKeybord('BAKA');
        browser.pause(500);
        Pages.enterKeybord('Enter');
        browser.pause(1000);
        Pages.clickByAnElement(firstLinkOnGoogle);
        browser.pause(10000);
        


       
        browser.pause(1000);
    })



})

