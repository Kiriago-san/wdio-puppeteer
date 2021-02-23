/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

class Page {

    page(){
        // it shoul be, if we want to use 'page' without declare const every time
        const page = browser.call(() => puppeteer.pages())[0];
        return page;
    }

    getRequestURL() {
        //const page = browser.call(() => puppeteer.pages())[0];
        // we use browser.call cause we in sync mode and trying to use sync function
        this.page().on('response', (response) => { 
            //it`s event emitter, more info at eventEmitter.on
            //we can not use browser.call cause page is actual at call
        
            console.log(response.request()._method , response.status(), response.request()._resourceType, response.request()._url);
            // we take request when take response for more info watch HTTPresponse
        });

    }

    getRequestbyMethod(method) {
        this.page().on('request', (request) => {
            if (request.method() == method) {
                console.log(request.method() + ': ' + request.resourceType() + ': ' + request.url());
            }

        });
    }

    typeKeybord(text){
        
        this.page().keyboard.type(text);
        //but for simpler func we can not to use browser call at second time
    }

    enterKeybord(key){
        this.page().keyboard.press(key);
    }

    getElement(element){
        return $(element);
    }


    getLocations(element, location){
       return (this.getElement(element)).getLocation(location);
    }

    clickByAnElement(element){
        this.page().mouse.click((this.getLocations(element, 'x')), this.getLocations(element, 'y'));
    }




}

module.exports = new Page()
