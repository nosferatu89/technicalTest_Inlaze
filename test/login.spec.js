const { Builder, By, Key } = require('selenium-webdriver');
require('chromedriver');
const { LoginUser } = require('../pages/login');
const { varUSer, enviromentUrl } = require('../properties');

async function LoginSuccess() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {

        await driver.get(enviromentUrl.qaUrl);
        console.log('[INF]     Ingresando a ' + enviromentUrl.qaUrl)

        let loginUser = new LoginUser(driver);
        
        console.log(await loginUser.ButtonEnabled());
        await loginUser.enterUsername(varUSer.user);
        console.log('[INF]     Usuario: ' + varUSer.user)
        console.log(await loginUser.ButtonEnabled());
        await loginUser.enterPassword(varUSer.pass);
        console.log('[INF]     Usuario: ' + varUSer.pass)
        console.log(await loginUser.ButtonEnabled());
        await loginUser.clickSubmit();
        
        // Pausa para observar el navegador antes de cerrar
        await new Promise(resolve => setTimeout(resolve, 10000));
    } finally {
        await driver.quit(); // Asegúrate de cerrar el navegador incluso si hay errores
        console.log('[END]:     Se finaliza proceso de Login')
    }
}

LoginSuccess();
