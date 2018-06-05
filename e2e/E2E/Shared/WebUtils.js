"use strict";

let WorldPage = require('./World.PageObject');

module.exports = function () {
    let module = {};

    /**
     * A helper function for adding a point on map
     *
     * https://github.com/angular/protractor/issues/4578
     *
     * @example
     * WebUtils.clickOnElement(element(by.id('map')), 500, 750);
     *
     * @param elm
     * @param x
     * @param y
     * @param isDoubleClick
     * @returns {Promise.<void>}
     */
    module.clickSpecPointOnElement = async function (elm, x, y, isDoubleClick) {
        var _this = this;
        _this.isDoubleClick = isDoubleClick;

        // await browser.actions().mouseMove(this.map, {x: width, y: height}).click().perform();

        await browser.actions().mouseMove(elm, {
            x: parseInt(x),
            y: parseInt(y)
        }).perform().then(async function () {
            if(_this.isDoubleClick) {
                await browser.actions().click().perform();
                await browser.actions().click().perform();
            }
            else
                await browser.actions().click().perform();
        });
    };

    /**
     * A Helper function for scrolling to top window
     *
     * @example
     * WebUtils.scrollTop();
     *
     * @returns {Promise<void>}
     */
    module.scrollTop = async function () {
        await browser.executeScript('window.scrollTo(0,0);').then(function (element) {
            return element;
        });
    };

    /**
     * A Helper function for open new tab on browser
     *
     * @example
     * WebUtils.opeNewTab("https://www.google.com");
     *
     * @param link
     * @returns {Promise<void>}
     */
    module.opeNewTab = async function (link) {
        await browser.executeScript('window.open("' + link + '");');
    };

    /**
     * A helper function for switching tab pages
     *
     * @example
     * WebUtils.workingOnTabSwitcher(1); // Second tab which I work on
     *
     * @param tabIndex
     * @returns {Promise<void>}
     */
    module.workingOnTabSwitcher = async function (tabIndex) {
        await browser.getAllWindowHandles().then(async function(handles) {
            await browser.switchTo().window(handles[tabIndex]);    // pass the index
        });
    };

    /**
     * A helper function for close tab page
     *
     * @example
     * WebUtils.closeTab(1); // Second tab which I want to close
     *
     * @param tabIndex
     * @returns {Promise<void>}
     */
    module.closeTab = async function (tabIndex) {
        await browser.getAllWindowHandles().then(async function (handles) {
            await browser.driver.switchTo().window(handles[tabIndex]);
            await browser.driver.close();
        });
    };

    /**
     * A helper function for wait frame or new page is loaded
     *
     * @example
     * WebUtils.waitForNewPageOrFrameLoaded(2); // Second tab which I want to close
     *
     * @param pageIndex
     * @returns {Promise.<Function>}
     */
    module.waitForNewPageOrFrameLoaded = async function windowCount (pageIndex) {
        return async function () {
            return await browser.getAllWindowHandles().then(async function (handles) {
                return await handles.length === pageIndex;
            });
        };
    };

    /**
     * Generate Random Number
     *
     * @example
     * WebUtils.generateRandomNumber(1, 100);
     *
     * @param min
     * @param max
     * @returns {*}
     */
    module.generateRandomNumber = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    };

    return module;
}();
