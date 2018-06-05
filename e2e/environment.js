// Common configuration files with defaults plus overrides from environment vars
let CommonUtils = require("./E2E/Shared/CommonUtils");

let webServerDefaultPort = 8081;

module.exports = {
    /**
     * The address of a running selenium server.
     *
     * @Docker Configuration
     * docker run -tid --name zalenium -p 4444:4444 -v /var/run/docker.sock:/var/run/docker.sock -v /tmp/videos:/home/seluser/videos -v /home/sysadmin/zalenium/:/tmp/node/home/seluser/folder --privileged dosel/zalenium start --desiredContainers 6 --maxTestSessions 1 --screenWidth 1920 --screenHeight 1080 --videoRecordingEnabled false --timeZone "Europe/Istanbul"
     * http://10.100.30.194:4444/wd/hub
     *
     * @returns {string}
     */
    seleniumAddress: function () {
        return CommonUtils.isRemoteMachine() ? "http://localhost:4444/wd/hub" : "";
    },
    //(process.env.SELENIUM_URL || 'http://localhost:4444/wd/hub'),

    // Capabilities to be passed to the webdriver instance.
    // capabilities: {
    //     'browserName':
    //         (process.env.TEST_BROWSER_NAME || 'chrome'),
    //     'version':
    //         (pr
    // ocess.env.TEST_BROWSER_VERSION || 'ANY')
    // },

    browserArgs: function () {
        let args = ['disable-infobars'];

        if(CommonUtils.isRemoteMachine())
            args = args.concat(['headless', 'disable-gpu', 'window-size=1024,768']);

        return args;
    },

    // Default http port to host the web server
    webServerDefaultPort: webServerDefaultPort,

    // Protractor interactive tests
    interactiveTestPort: 6969,

    // A base URL for your application under test.
    // baseUrl:
    // 'http://' + (process.env.HTTP_HOST || 'localhost') +
    // ':' + (process.env.HTTP_PORT || webServerDefaultPort)

};