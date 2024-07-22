const { By, until } = require('selenium-webdriver');

class Register {
    constructor(driver) {
        this.driver = driver;
        this.inputName = driver.findElement(By.css('app-sign-up-form #full-name'));
        this.email = driver.findElement(By.css('app-sign-up-form #email'));
        this.pass1 = driver.findElement(By.css('app-sign-up-form .w-full > #password'));
        this.pass2 = driver.findElement(By.css('app-sign-up-form .w-full > #confirm-password'));
        this.messageValidate = By.css('app-root app-sign-up main section:nth-of-type(2) app-sign-up-form form div:nth-of-type(4) label:nth-of-type(2) span');
        this.btnSignIn = driver.findElement(By.css('app-sign-up-form button[type="submit"]'));
    }

    async typeUserName(username) {
        await this.inputName.sendKeys(username);
        const enteredText = await this.inputName.getAttribute('value');
        if (enteredText !== username) {
            console.error(`👣[INF]      Error: Username not entered correctly. Expected: ${username}, Found: ${enteredText}`);
        } else {
            console.log(`👣[INF]        Username entered correctly: ${enteredText}`);
        }
    }
    
    async typeEmail(email) {
        await this.email.sendKeys(email);
        const enteredText = await this.email.getAttribute('value');
        if (enteredText !== email) {
            console.error(`👣[INF]      Error: Email not entered correctly. Expected: ${email}, Found: ${enteredText}`);
        } else {
            console.log(`👣[INF]        Email entered correctly: ${enteredText}`);
        }
    }

    async typePass1(pass) {
        await this.pass1.sendKeys(pass);
        const enteredText = await this.pass1.getAttribute('value');
        if (enteredText !== pass) {
            console.error(`👣[INF]      Error: Password not entered correctly. Expected: ${pass}, Found: ${enteredText}`);
        } else {
            console.log(`👣[INF]        Password entered correctly: ${enteredText}`);
        }
    }

    async typePass2(pass) {
        await this.pass2.sendKeys(pass);
        const enteredText = await this.pass2.getAttribute('value');
        if (enteredText !== pass) {
            console.error(`👣[INF]      Error: Confirm password not entered correctly. Expected: ${pass}, Found: ${enteredText}`);
        } else {
            console.log(`👣[INF]        Confirm password entered correctly: ${enteredText}`);
        }
    }

    async clickSubmit() {
        await this.btnSignIn.click();
        await new Promise(resolve => setTimeout(resolve, 3000));
        console.log('👣[INF]      Esperado 5 segundos después del clic');
    }

    async validatePasswordErrorMessage(expectedMessage) {
        await this.driver.wait(until.elementLocated(this.messageValidate), 10000);
        const errorMessage = await this.driver.findElement(this.messageValidate).getText();
        if (errorMessage === expectedMessage) {
            console.log(`👣[INF]        Validation message is correct: ${errorMessage}`);
        } else {
            console.error(`👣[INF]      Validation message is incorrect. Expected: ${expectedMessage}, Found: ${errorMessage}`);
        }
    }
}

module.exports = { Register };