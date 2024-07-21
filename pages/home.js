const { By, until } = require('selenium-webdriver'); // Asegúrate de importar 'until'
require('chromedriver');

class Logout {
    constructor(driver) {
        this.driver = driver;
        this.userName= By.css('app-navbar h2')
        this.avatar = By.css('label.btn.avatar img');
        this.logoutlink = By.css('li:nth-child(3) > a');
    }

    async getUserName(){
        const userNameElement = await this.driver.findElement(this.userName);
        const userNameText = await userNameElement.getText();
        console.log('👣[INF]      Usuario registrado: ' + userNameText)
        return userNameText;
    }

    async logoutSesion() {
        console.log('👣[INF]      Este es el logout');
        
        try {
            
            const avatarElement = await this.driver.findElement(this.avatar);
            await this.driver.wait(until.elementIsVisible(avatarElement), 10000);
            console.log('👣[INF]      Avatar visible');
            
            await avatarElement.click();
            console.log('👣[INF]      Avatar clickeado');
            const logoutLinkElement = await this.driver.findElement(this.logoutlink);
            await this.driver.wait(until.elementIsVisible(logoutLinkElement), 10000);
            await logoutLinkElement.click();
        } catch (error) {
            console.error('☠︎[ERR]Error durante el logout:', error);
        }
    }
}

module.exports = { Logout };