"use strict";

let PageObject = require("./Test.PageObject");

var alert; // We are going to overwrite default alert() function

// 1.1.1

When(/^Check that web page is appeared.$/, async function () {
    return await expect(PageObject.pageHeader.getText()).to.eventually.contain("Image Gallery");
});

When(/^Click plus button on right top of the page. And upload image file$/, async function () {
    let filePath =  __basefolder + 'misc/cats.jpg';

    // Unhide file input
    await browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", PageObject.fileElem.getWebElement());
    await PageObject.fileElem.sendKeys(filePath);

    return await browser.driver.sleep(1000); // take a breath for visibility of fileupload
});

Then(/^Uploaded image is appeared$/, async function() {
    return await expect(PageObject.firstImage).to.exist;
});

// 1.1.2

Given(/^One image file is appeared.$/, async function() {
    return await expect(PageObject.firstImage).to.exist;
});

When(/^Click the image.$/, async function () {
    return await PageObject.firstImage.clickOnHidden();
});

When(/^When shows up gallery popup, click trash icon button.$/, async function () {
    return await PageObject.trashIconButton.clickOnHidden();
});

When(/^Confirm dialog shows up and click “OK” button.$/, async function () {
    return await browser.switchTo().alert().accept();
});

Then(/^Uploded image is disappeared on the page.$/, async function () {
    return await expect(PageObject.firstImage.isPresent()).to.eventually.be.false;
});

// 1.1.3

When(/^Click plus button on right top of the page. And upload multi image files$/, async function () {
    let filePath =  __basefolder + 'misc\\cats.jpg \n' + __basefolder + 'misc\\mountain.jpg';

    // Unhide file input
    await browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", PageObject.fileElem.getWebElement());
    await PageObject.fileElem.sendKeys(filePath);

    return await browser.driver.sleep(1000); // take a breath for visibility of fileupload
});

Then(/^Uploaded images are appeared$/, async function() {
    await expect(PageObject.firstImage).to.exist;
    return await expect(PageObject.secondImage).to.exist;
});

// 1.1.4

When(/^Click plus button on right top of the page. And upload non image file$/, async function () {
    let filePath =  __basefolder + 'misc\\word.docx';

    // Unhide file input
    await browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", PageObject.fileElem.getWebElement());
    await PageObject.fileElem.sendKeys(filePath);

    return await browser.driver.sleep(1000); // take a breath for visibility of fileupload
});

Then(/^Non image file never uploaded$/, async function() {
    let info = await browser.switchTo().alert().getText().then(async function(text) {
        return text;
    });
    await expect(info).to.contain("Only images avaliable to upload");

    return await browser.switchTo().alert().accept();
});

// 1.1.5

When(/^Click plus button on right top of the page. And upload image file up to 4MB$/, async function () {
    let filePath =  __basefolder + 'misc\\size.jpg';

    // Unhide file input
    await browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", PageObject.fileElem.getWebElement());
    await PageObject.fileElem.sendKeys(filePath);

    return await browser.driver.sleep(1000); // take a breath for visibility of fileupload
});

Then(/^image file up to 4MB never uploaded$/, async function() {
    let info = await browser.switchTo().alert().getText().then(async function(text) {
        return text;
    });
    await expect(info).to.contain("Files should be less than 4Mb");

    return await browser.switchTo().alert().accept();
});

// 1.1.6

When(/^Click plus button on right top of the page. And upload image files up to 4MB$/, async function () {
    let filePath =  __basefolder + 'misc\\size.jpg \n' + __basefolder + 'misc\\mountain.jpg';

    // Unhide file input
    await browser.executeScript("arguments[0].style.visibility = 'visible'; arguments[0].style.height = '1px'; arguments[0].style.width = '1px';  arguments[0].style.opacity = 1", PageObject.fileElem.getWebElement());
    await PageObject.fileElem.sendKeys(filePath);

    return await browser.driver.sleep(1000); // take a breath for visibility of fileupload
});

Then(/^image files up to 4MB never uploaded$/, async function() {
    let info = await browser.switchTo().alert().getText().then(async function(text) {
        return text;
    });
    await expect(info).to.contain("Files should be less than 4Mb");

    return await browser.switchTo().alert().accept();
});

// 1.2.1

When(/^Click on Back Button.$/, async function() {
    await PageObject.previousButton.clickOnHidden();
});

Then(/^Check that other image is showing.$/, async function() {
    return await expect(await PageObject.bigThirthImage.isDisplayed()).to.be.true;
});

// 1.2.2

When(/^Click on Next Button.$/, async function() {
    await PageObject.nextButton.clickOnHidden();
});

Then(/^Check that first image is showing.$/, async function() {
    return await expect(await PageObject.bigFirstImage.isDisplayed()).to.be.true;
});

// 1.2.3

When(/^Click on Cross Button$/, async function() {
    return await PageObject.closeButton.clickOnHidden();
});

Then(/^Check that Gallery slide popup is disappeared.$/, async function() {
    let attr = await PageObject.galleryArea.getAttribute("class");

    return await expect(attr.includes("hidden")).to.be.true;
});