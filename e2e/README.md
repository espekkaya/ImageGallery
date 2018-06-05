# README #

An end to end testing platform for Web project.

### This repository includes ###

End to end specs for Project windows.

### How do I get set up? ###

1. Please install [NodeJS][6] latest version.
2. Just go to e2e folder and then follow the instruction.

Just open command prompt (shell) and run below

    install.cmd
    
Or Manuel Install

    npm install
    npm run webdriver-update
    
    
### Example Run Scripts ###
    node ./node_modules/protractor/bin/protractor protractor.conf.js --suite=test --params.reportName=TestReport
    OR
    npm run e2e

### See Reports ###

    After run tests, automatically generate reports to Reports/report/ directory
    Just click index.html for seing detail of report.

### Dependencies

[Protractor (5.2.2) - E2E Framework][1]

[Web-Driver Manager (12.0.6) - Run Selenium Server][2]

[CucumberJs (4.0.0) - Behaviour-Driven Development Library ][3]

[Chai Assertion Library (4.1.2) - Validation Library][4]

[Protractor Multiple Cucumber Html Reporter (1.3.0) - E2E HTML Report][5]

[1]: http://www.protractortest.org/
[2]: https://github.com/angular/webdriver-manager
[3]: https://github.com/cucumber/cucumber-js
[4]: http://chaijs.com/
[5]: https://github.com/wswebcreation/protractor-multiple-cucumber-html-reporter-plugin
[6]: https://nodejs.org/en/download/