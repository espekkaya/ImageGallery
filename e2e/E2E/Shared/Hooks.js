"use strict";

setDefaultTimeout(90000); // asynchronous hooks and steps timeout

BeforeAll(function (callback) {
    CommonUtils.browserSettings();

    return callback();
});

After(function (testCase) {
    var world = this;

    if (testCase.result.status === Status.FAILED) {
        return browser.takeScreenshot().then(function(screenShot) {
            // screenShot is a base-64 encoded PNG
            world.attach(screenShot, 'image/png');
        });
    }

    return browser;
});

AfterAll(function (callback) {
    return callback();
})