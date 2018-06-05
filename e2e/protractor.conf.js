/*
Basic configuration to run your cucumber
feature files and step definitions with protractor.
**/

let env = require('./environment.js');

exports.config = {

    seleniumAddress: env.seleniumAddress(),

    baseUrl: 'https://basitali.github.io/test_gallery/dist/',

    capabilities: {
        browserName:'chrome',
        'chromeOptions': {
            'args': env.browserArgs()
        }
    },

    framework: 'custom',  // set to "custom" instead of cucumber.

    frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file

    suites: {
        test: [
            'E2E/Features/Test.feature',
        ]
    },

    SELENIUM_PROMISE_MANAGER: false,

    // cucumber command line options
    cucumberOpts: {
        require: [
            './E2E/StepDefinations/**/*.js',
            "./E2E/Shared/*.js"
        ],                                                                                  // require step definition files before executing features
        tags: [],                                                                           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
        strict: true,                                                                       // <boolean> fail if there are any undefined or pending steps
        format: ['json:Reports/cucumber_report.json', 'node_modules/cucumber-pretty'],      // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
        'dry-run': false,                                                                   // <boolean> invoke formatters without executing steps
        compiler: [],                                                                       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        'no-colors': true
    },

    // Here the magic happens
    // plugins: [{
    //     package: 'protractor-multiple-cucumber-html-reporter-plugin',
    //     options:{
    //         automaticallyGenerateReport: true,
    //         removeExistingJsonReportFile: true,
    //         openReportInBrowser: false,
    //         reportName: "E2E Report",
    //         customData: {
    //             title: 'Run info',
    //             data: [
    //                 {label: 'Project', value: 'Custom project'},
    //                 {label: 'Release', value: '1.2.3'},
    //                 {label: 'Cycle', value: 'B11221.34321'},
    //                 {label: 'Execution Start Time', value: 'Nov 19th 2017, 02:31 PM EST'},
    //                 {label: 'Execution End Time', value: 'Nov 19th 2017, 02:56 PM EST'}
    //             ]
    //         }
    //     }
    // }],

    params: {},

    beforeLaunch: () => {
        let moment = require('moment');
        moment.locale('en');
        global.testStartDate = moment().format('LLLL');

        let uncaught = require('uncaught');
        uncaught.start();
        uncaught.addListener(function (error) {
            console.log('Uncaught error or rejection: ', error.message);
        });
    },

    onPrepare: () => {

        let reportName = browser.params.reportName || 'cucumber_report';
        let buildUrl = browser.params.buildUrl || "localMachine/";

        let envParams = {
            reportName: reportName,
            buildUrl: buildUrl,
        };

        global.ENVIRONMENT = envParams;
        global.EC = global.until = protractor.ExpectedConditions;
        global.__basefolder = __dirname + '/';

        // Default Timeouts
        global.SETSCRIPTTIMEOUT = 60000;
        global.IMPLICITLYWAIT = 3000;
        global.PAGELOADTIMEOUT = 60000;


        // Date Process
        // moment().add(3, 'days').format("DD");
        global.moment = require("moment");
        moment.locale('tr');

        // Required Utils
        global.CommonUtils = require('./E2E/Shared/CommonUtils');
        global.WebUtils = require('./E2E/Shared/WebUtils');

        require('./E2E/Shared/Extenders');
        CommonUtils.osInfo();
        CommonUtils.cucumberSettings();
        CommonUtils.chaiSettings();
    },

    onComplete: () => {
        let moment = require('moment');
        moment.locale('en');
        global.testFinishDate = moment().format('LLLL');
    },

    onCleanUp: () => {
        return new Promise(function (fulfill, reject) {
            CommonUtils.generateHtmlReport(fulfill, reject);
        });
    }
};