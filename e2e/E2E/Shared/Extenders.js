"use strict";

////////////////////////////////////////////////
////////////////////////////////////////////////
//////////// COMMON EXTENDERS //////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

/**
 * Adding days to Date
 *
 * @example
 * var dat = new Date().addDays(5);
 *
 * @param days
 * @returns {Date}
 */
Date.prototype.addDays = function (days) {
    let dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);

    return dat;
};

////////////////////////////////////////////////
////////////////////////////////////////////////
////////// PROTRACTOR EXTENDERS ////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

/**
 * Find Element and focus
 *
 * @example
 * element(by.id('selectPerson').showIntoView();
 *
 * @returns {protractor.ElementFinder}
 */
protractor.ElementFinder.prototype.showIntoView = async function () {
    // var args = arguments;

    let element = this;
    let scriptCallBack = function (element) {
        element.scrollIntoView();
    };
    await browser.executeScript(scriptCallBack, element.getWebElement());

    await browser.wait(until.visibilityOf(element), 3000);

    return element;
};

/**
 * Click element because of problem of vertical scrolling
 * https://stackoverflow.com/questions/31922080/protractor-cant-add-new-method-to-return-findelement
 *
 * @example
 * element(by.id('selectPerson').clickOnHidden();
 *
 * @returns {Promise<protractor.ElementFinder>}
 */
protractor.ElementFinder.prototype.clickOnHidden = async function () {
    await this.showIntoView();

    await browser.wait(until.elementToBeClickable(this), 3000);

    await this.click();

    return this;
};

/**
 * If element is exist or not, invoke function
 *
 * @example
 * element(by.id('selectPerson').checkExistNInvoke(async function() { console.log('check'); });
 * element(by.id('selectPerson').checkExistNInvoke(async function() { console.log('check'); }, true, 2000);
 *
 * @param fn
 * @param isPresent
 * @param timeout
 * @returns {Promise<protractor.ElementFinder>}
 */
protractor.ElementFinder.prototype.checkExistNInvoke = async function (fn, isPresent, timeout) {
    timeout = timeout || 1000; // wait element timeout
    isPresent = isPresent || true;

    await browser.manage().timeouts().implicitlyWait(timeout);

    await this.isPresent().then(async (isExist) => {
        if (isExist === isPresent)
            await fn();
    });

    await browser.manage().timeouts().implicitlyWait(IMPLICITLYWAIT);

    return this;
};

/**
 * If element is exist or not, invoke function
 *
 * @example
 * element(by.id('selectPerson').checkVisibilityOfNInvoke(async function() { console.log('check'); });
 * element(by.id('selectPerson').checkVisibilityOfNInvoke(async function() { console.log('check'); }, true, 2000);
 *
 * @param fn
 * @param visibilityOf
 * @param timeout
 * @returns {Promise<protractor.ElementFinder>}
 */
protractor.ElementFinder.prototype.checkVisibilityOfNInvoke = async function (fn, visibilityOf, timeout) {
    timeout = timeout || 1000; // wait element timeout
    visibilityOf = visibilityOf || true;

    await browser.manage().timeouts().implicitlyWait(timeout);

    await this.isDisplayed().then(async (isDisplayed) => {
        if (isDisplayed === visibilityOf)
            await fn();
    });

    await browser.manage().timeouts().implicitlyWait(IMPLICITLYWAIT);

    return this;
};

/**
 * Click element via Js.
 * https://stackoverflow.com/questions/31922080/protractor-cant-add-new-method-to-return-findelement
 *
 * @example
 * element(by.id('selectPerson').clickPerform();
 *
 * @returns {Promise<protractor.ElementFinder>}
 */
protractor.ElementFinder.prototype.clickPerform = async function () {
    await browser.wait(until.elementToBeClickable(this), 5000);

    await browser.executeScript("arguments[0].click();", this);

    return this;
};

/**
 * Click on element specific location
 *
 * @example
 * element(by.id('selectPerson').clickSpecPoint({ x: 500, y: 600 });
 * element(by.id('selectPerson').clickSpecPoint(); // click center of element
 *
 * @param param
 * @param isDoubleClick
 * @returns {Promise.<protractor.ElementFinder>}
 */
protractor.ElementFinder.prototype.clickSpecPoint = async function (param, isDoubleClick) {
    let coordinate = {
        x:0,
        y:0
    };

    if (param !== undefined) {
        coordinate.x = param.x || coordinate.x;
        coordinate.y = param.y || coordinate.y;
    }
    else
        coordinate = await this.getCenterOfElement();

    await WebUtils.clickSpecPointOnElement(this, coordinate.x, coordinate.y, isDoubleClick);
    await browser.sleep(500); // wait for drawing poligons otherwise throw exception

    return this;
};

/**
 * Get center of element x and y coordinate
 *
 * @example
 * element(by.id('selectPerson').getCenterOfElement();
 *
 * @returns {Promise<{x: number, y: number}>}
 */
protractor.ElementFinder.prototype.getCenterOfElement = async function () {
    let x = 0;
    let y = 0;

    await this.getSize().then(function (eleSize) {
        x = eleSize.width / 2;
        y = eleSize.height / 2;
    });

    return {
        x: x,
        y: y
    }
};

/**
 * Select Element By Value
 *
 * @example
 * element(by.id('selectPerson').selectByValue('1');
 *
 * @param value
 * @returns {Promise<void>}
 */
protractor.ElementFinder.prototype.selectByValue = async function (value) {
    await this.$$('option[value="' + value + '"]').click();
};

/**
 * Select Element By Text
 *
 * @example
 * element(by.id('selectPerson').selectByText('Select 1');
 *
 * @param searchingText
 * @returns {Promise<void>}
 */
protractor.ElementFinder.prototype.selectByText = async function (searchingText) {
    return await this.all(by.xpath(`option[text()="${searchingText}"]`)).click();
};

/**
 * Select Element By Text(Li)
 */
protractor.ElementFinder.prototype.selectByTextInListElement = async function (searchingList) {
    return await this.all(by.xpath(`li[text()="${searchingList}"]`)).first();
};

/**
 * Select Element By Text(Td)
 */
protractor.ElementFinder.prototype.selectByTextInTableElement = async function (searchingList) {
    return await this.all(by.xpath(`td[text()="${searchingList}"]`)).first();
};

/**
 * Wait For Element Invisibility via display in style attribute
 *
 * @example
 * element(by.id('selectPerson')).waitForInvisibilityOf(10000); // wait 10 seconds
 *
 * @param timeout
 * @returns {Promise<*>}
 */
protractor.ElementFinder.prototype.waitForInvisibilityOf = async function (timeout) {
    let _debug = false;
    let isDone = false;
    timeout = timeout || 60000;
    let seconds = timeout / 1000;

    if (await !this.isPresent())
        return this;

    //This loop will rotate for 60 times to check If page Is ready after every 1 second.
    //You can replace your value with 60 If you wants to Increase or decrease wait time.
    for (let i = 1; i <= seconds; i++) {
        await browser.sleep(1000);

        let style = await this.getAttribute('style');
        let insibilityOf = await style.includes('display: none;');
        let visibilityOf = await style.includes('display: block;');

        if (insibilityOf) {
            if (_debug)
                console.log(i + " second: Element invisible!");
            isDone = true;
        }
        else {
            if (_debug)
                console.log(i + " second: Element NOT invisible!");
        }

        if (seconds === i)
            throw "Element invisibility timed out after " + timeout + " milliseconds";

        if (!insibilityOf && !visibilityOf && i > 5) // break for paging is loaded
            break;

        if (isDone) // If element is invisible
            break;
    }

    return await this;
};

/**
 * Searching in Table element and invoke what you want (eg. click, sendKeys)
 *
 * @example
 * Using Xpath
 * element(by.id('tableId')).searchInTableNInvoke('Recovery', '//td[1]/div/div[2]/span').then(async function (elem) {
 *   await elem.click();
 * });
 * Using Css
 * element(by.id('tableId')).searchInTableNInvoke('Recovery', 'td:nth-child(1) > div > div:nth-child(2) > span').then(async function (elem) {
 *   await elem.click();
 * });
 *
 * @param searchingText
 * @param path
 * @returns {Promise<*>}
 */
protractor.ElementFinder.prototype.searchInTableNInvoke = async function (searchingText, path) {
    let trIndex = undefined;
    let locator = undefined;

    await this.$$('tr').each(async function (elem, index) {
        await elem.getText().then(async function (text) {
            if (text === searchingText) {
                trIndex = index;
            }
        });
    });

    if (path.includes('/')) {
        path = path.replace('//', '');

        path = '//tr[' + trIndex + ']/' + path;
        locator = by.xpath(path);
    }
    else {
        path = 'tr:nth-of-type(' + trIndex + ') > ' + path;
        locator = by.css(path);
    }

    return await this.all(locator).first();
};

/**
 * Mouse Move
 *
 * @example
 * element(by.id('element')).mouseMove();
 *
 * @returns {Promise<void>}
 */
protractor.ElementFinder.prototype.mouseMove = async function () {
    await browser.actions().mouseMove(this).perform();
};

protractor.ElementFinder.prototype.getIntegerInString = async function () {
    let numberPattern = /\d+/g;

    return await this.getText().then(async function (text) {
        return await text.match(numberPattern)[0];
    });
};