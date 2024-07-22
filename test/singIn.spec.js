const { faker } = require('@faker-js/faker');
const { Builder, By, Key } = require('selenium-webdriver');
require('chromedriver');
const { Register } = require('../pages/signIn');
const { enviromentUrl } = require('../properties');
const { printLogo } = require('../logo');

const logo = new printLogo();
logo.print();

// Función para generar una contraseña con la estructura correcta
function generatePassword() {
    const upperCase = faker.string.fromCharacters('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    const lowerCase = faker.string.fromCharacters('abcdefghijklmnopqrstuvwxyz');
    const number = faker.string.numeric();
    const specialChar = faker.string.fromCharacters('!@#$%^&*()_+');
    const randomChars = faker.string.alphanumeric(8);
    return upperCase + lowerCase + number + specialChar + randomChars;
}

async function RegisterUsers() {
    let driver = await new Builder().forBrowser('chrome').build();
    console.log('🚨[TIT]        TestCase - Register User');

    try {
        await driver.get(enviromentUrl.qaRegister);
        console.log('👣[INF]     Ingresando a ' + enviromentUrl.qaRegister);
        await new Promise(resolve => setTimeout(resolve, 5000));

        let signIn = new Register(driver);

        // Crear nombre usuario
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const fullName = `${firstName} ${lastName}`;
        console.log(`👣[INF]      Se genero un el FULLNAME: ${fullName}`);

        // Crear correo
        const email = faker.internet.email(firstName, lastName);
        console.log(`👣[INF]        email: ${email}`);

        // Crear contraseña
        const password = generatePassword();
        const mismatchedPassword = generatePassword();
        console.log(`👣[INF]        password 1: ${password}`);
        console.log(`👣[INF]        password 2: ${mismatchedPassword}`);

        // Llenar los campos con los datos generados
        await signIn.typeUserName(fullName);
        await signIn.typeEmail(email);
        await signIn.typePass1(password);
        await signIn.typePass2(password);
        await signIn.clickSubmit()
        // Validar el mensaje de error de la contraseña
        //const expectedErrorMessage = "⚠️[INF]   Los password no son iguales.";
        //await signIn.validatePasswordErrorMessage(expectedErrorMessage);
          

        // Ingresar la contraseña correcta en el campo de confirmación
        //await signIn.typePass2(password);

        // Finalizar el flujo de registro
        //await signIn.clickSubmit();

        console.log('👣[INF]      Registro de usuario completado con éxito');

        await new Promise(resolve => setTimeout(resolve, 5000));
    } finally {
        await driver.quit();
        console.log('🛑[END]      Se finaliza proceso de registro de usuario');
    }
}

RegisterUsers();