const { Builder, By, Key } = require('selenium-webdriver');
require('chromedriver');
const { LoginUser } = require('../pages/login');
const {Logout} = require('../pages/home')
const { varUSer, enviromentUrl } = require('../properties');
const { printLogo } = require ('../logo')

const logo = new printLogo();
logo.print();

async function LoginSuccess() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log('🚨[TIT]        TestCase - LoginSuccess & LogOut')
    try {

        await driver.get(enviromentUrl.qaUrl);
        console.log('👣[INF]     Ingresando a ' + enviromentUrl.qaUrl)

        let loginUser = new LoginUser(driver);
        
        console.log(await loginUser.ButtonEnabled());
        console.log('👣[INF]      Se inicial proceos de Login')
        await loginUser.enterUsername(varUSer.user);
        console.log('👣[INF]     Email: ' + varUSer.user)
        console.log(await loginUser.ButtonEnabled());
        await loginUser.enterPassword(varUSer.pass);
        console.log('👣[INF]     Pass: ' + varUSer.pass)
        console.log(await loginUser.ButtonEnabled());
        await loginUser.clickSubmit();

        let logoutUser = new Logout(driver);
        await logoutUser.getUserName()
        await logoutUser.logoutSesion()
                
        await new Promise(resolve => setTimeout(resolve, 5000));
    } finally {
        await driver.quit(); 
        console.log('🛑[END]      Se finaliza proceso de Login')
    }
}
LoginSuccess();
