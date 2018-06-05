"use strict";

module.exports = function () {
    let module = {};

    /**
     * Operation System Info
     */
    module.osInfo = () => {
        // console.log(process.env);
        let os = require('os');
        let userInfo = require('user-info');

        let osType = '';

        switch (os.type()) {
            case "Linux":
                osType = "Linux";
                break;

            case "Darwin":
                osType = "OS X";
                break;

            case "Windows_NT":
                osType = "Windows";
                break;
        }

        global.osType = osType;
        global.osRelease = os.release();
        global.osUserName = userInfo()['username'];

        return {
            OS: osType,
            OSVersion: os.release(),
            UserName: userInfo()['username']
        };
    };

    /**
     * Check Remote Machine
     */
    module.isRemoteMachine = () => {
        return module.osInfo().OS === "Linux" || module.osInfo().UserName === "hp";
    };

    /**
     * Set Browser default behaviours
     */
    module.browserSettings = () => {
        browser.manage().window().maximize(); // maximize the browser before executing the feature files

        browser.ignoreSynchronization = true;
        browser.waitForAngular(false);

        // Throw TimeoutError: timeout exception
        // browser.manage().timeouts().setScriptTimeout(SETSCRIPTTIMEOUT);
        // browser.manage().timeouts().implicitlyWait(IMPLICITLYWAIT);
        // browser.manage().timeouts().pageLoadTimeout(PAGELOADTIMEOUT);

        browser.getCapabilities().then(function (capabilities) {
            global.browserName = capabilities.get('browserName');
            global.browserVersion = capabilities.get('version');
        });
    };

    /**
     * Set Cucumber variables to global
     */
    module.cucumberSettings = () => {
        // Set cucumber variable to Global
        const { Given, When, Then, BeforeAll, After, AfterAll, Status, setDefaultTimeout } = require('cucumber');

        global.Given = Given;
        global.When = When;
        global.Then = Then;
        global.BeforeAll = BeforeAll;
        global.After = After;
        global.AfterAll = AfterAll;
        global.Status = Status;
        global.setDefaultTimeout = setDefaultTimeout;
    };

    /**
     * Chai validation settings
     */
    module.chaiSettings = () => {
        const   chai               = require('chai'),
                chaiAsPromised     = require('chai-as-promised'),
                expect             = chai.expect;

        chai.use(chaiAsPromised);

        global.chai = chai;
        global.expect = expect;
    };

    /**
     * Generate E2E tests report
     * @param fullfill
     * @param reject
     */
    module.generateHtmlReport = (fullfill, reject) => {
        const report = require('multiple-cucumber-html-reporter');

        report.generate({
            jsonDir: __basefolder + 'Reports/',
            reportPath: __basefolder + 'Reports/report/',
            metadata:{
                browser: {
                    name: browserName,
                    version: browserVersion
                },
                device: osUserName,
                platform: {
                    name: osType,
                    version: osRelease
                }
            },
            automaticallyGenerateReport: true,
            removeExistingJsonReportFile: true,
            openReportInBrowser: true,
            reportName: "E2E Report",
            customData: {
                title: 'Run info',
                data: [
                    {label: 'Machine User Name', value: osUserName},
                    {label: 'Project', value: 'E2E-Project'},
                    {label: 'Release', value: '1.0.0'},
                    {label: 'Execution Start Time', value: testStartDate},
                    {label: 'Execution End Time', value: testFinishDate}
                ]
            }
        });

        fullfill();
    };

    return module;
}();