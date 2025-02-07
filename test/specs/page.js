module.exports = {
    four: 4,
    //Inputs
    searchBox: 'input[type="search"]',

    //Buttons
    searchButton: 'button[type="submit"]',

    searchText: '//div[@data-test="lp-resultsCount"]',
    viewCartAndCheckoutButton: '//a[contains(text(), "View cart & check out")]',
    orderSummaryButton: '//button[contains(@aria-label, "Order Summary")]',
    //Modals
    autoSuggestBox: "#typeahead",

    firstItem: ".sc-e0eaa558-0",

    //Functions

    addToCart: async function () {
        const firstItem = await $$(".sc-e0eaa558-0")[0];
        await firstItem.waitForDisplayed();
        await firstItem.waitForClickable();

        await firstItem.click();
        console.log("Afterclick");
        const addToCartButton = await $$('div.sc-529a2ea7-0 button[type="button"]')[1];
        await addToCartButton.click();
        const addCartModal = await $(".ReactModal__Content");
        await addCartModal.waitForExist();
    },

    //logoutPage:
    //Search with keyword

    keywordSearch: async function () {
        const searchBox = await $(this.searchBox);
        await searchBox.addValue("macbook");
        const searchButton = await $(this.searchButton);
        await searchButton.click();
    },
};
