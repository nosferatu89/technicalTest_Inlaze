const { Builder, By, Key } = require('selenium-webdriver');
require('chromedriver');
const { LoginUser } = require('../pages/login');
const { varUSer, enviromentUrl } = require('../properties');

async function LoginSuccess() {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        await driver.get(enviromentUrl.qaUrl);

        let loginUser = new LoginUser(driver);
        
        await loginUser.enterUsername(varUSer.user);
        await loginUser.enterPassword(varUSer.pass);
        await loginUser.clickSubmit();
        
        // Pausa para observar el navegador antes de cerrar
        await new Promise(resolve => setTimeout(resolve, 10000));
    } finally {
        await driver.quit(); // Asegúrate de cerrar el navegador incluso si hay errores
    }
}

LoginSuccess();
