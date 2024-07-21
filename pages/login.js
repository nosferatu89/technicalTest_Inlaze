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

    async isSubmitButtonEnabled() {
        const element = await this.btnLogin;
        const isEnabled = await element.isEnabled();
        return isEnabled;
    }

    async clickSubmit() {
        const isEnabled = await this.isSubmitButtonEnabled();
        if (isEnabled) {
            await this.btnLogin.click();
        } else {
            throw new Error('Submit button is not enabled');
        }
    }
}

module.exports = { LoginUser };


module.exports = { LoginUser };
