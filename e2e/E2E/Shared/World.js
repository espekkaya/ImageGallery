"use strict";

let WorldPage = require('./World.PageObject');

Given(/^Open(?: "(.*)")? the web page/, async function (link) {
    link = link || browser.baseUrl;

    browser.manage().deleteAllCookies(); // Bütün çerezcikler silinir.

    return await browser.get(link);
});
