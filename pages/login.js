const { By, until } = require('selenium-webdriver');

class LoginUser {
    constructor(driver) {
        this.driver = driver;
        this.inputEmail = driver.findElement(By.id('email'));
        this.inputPass = driver.findElement(By.css('.w-full > #password'));
        this.btnLogin = driver.findElement(By.css('button[type="submit"]'));
    }

    async enterUsername(username) {
        await this.inputEmail.sendKeys(username);

    }

    async enterPassword(password) {
        await this.inputPass.sendKeys(password);
    }

    async ButtonEnabled() {
        const element = await this.btnLogin;
        const isEnabled = await element.isEnabled();
        const message = isEnabled ? '👣[INF]      * El botón de envío está habilitado' : '🟡[INF]      * El botón de envío está deshabilitado';
        return message;
      }

    async clickSubmit() {
        const isEnabled = await this.ButtonEnabled();
        if (isEnabled) {
            await this.btnLogin.click();
        } else {
            throw new Error('☠︎[ERR]Submit button is not enabled');
        }
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('👣[INF]      Esperado 5 segundos después del clic');
    }
}

module.exports = { LoginUser };