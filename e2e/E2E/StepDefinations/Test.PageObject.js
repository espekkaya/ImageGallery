"use strict";

const Accounting = function () {

    this.pageHeader = element(by.xpath('/html/body/header/h1'));
    this.plusButton = element(by.xpath('/html/body/header/label'));
    this.fileElem = this.plusButton.element(by.css('input[type="file"]'));

    // Image List
    this.firstImage = element(by.xpath('/html/body/article/a[1]'));
    this.secondImage = element(by.xpath('/html/body/article/a[2]'));

    // Gallery List
    this.trashIconButton = element(by.xpath('/html/body/section/div/button[1]'));
    this.closeButton = element(by.xpath('/html/body/section/div/button[2]'));
    this.previousButton = element(by.xpath('/html/body/section/button[1]'));
    this.nextButton = element(by.xpath('/html/body/section/button[2]'));
    this.bigFirstImage = element(by.xpath('/html/body/section/div[@data-image="1"]'));
    this.bigThirthImage = element(by.xpath('/html/body/section/div[@data-image="3"]'));
    this.galleryArea = element(by.xpath('/html/body/section'));
};

module.exports = new Accounting();