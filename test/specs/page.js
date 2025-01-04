module.exports = {

four: 4,
//Inputs
flashAlert: ".success",
usernameField: "#username",
passwordField: "#password",

//Buttons
loginButton: 'button[type="submit"]',
addElementButton: "button=Add Element",
deleteButton: ".added-manually",

//Functions

loginApp: async function (username, password) {
    await browser.url("/login");
    const usernameField = await $(this.usernameField);
    await usernameField.setValue("tomsmith");
    const passwordField = await $(this.passwordField);
    await passwordField.setValue("SuperSecretPassword!");
    const loginButton = await $(this.loginButton);
    await loginButton.click();
},

addElement: async function () {
    await browser.url("/add_remove_elements/");
    const addElementButton = await $(this.addElementButton);
    await addElementButton.click();
},

deleteElement: async function () {
    await $(this.deleteButton).click();
},

addToCart: async function () {
    const firstItem = await $$(".sc-e0eaa558-0")[0];
    await firstItem.click();
    const addToCartButton = await $$('div.sc-529a2ea7-0 button[type="button"]')[1];
    await addToCartButton.click();
    const addCartModal = await $(".ReactModal__Content");
    await addCartModal.waitForExist();
},

//logoutPage:












};
