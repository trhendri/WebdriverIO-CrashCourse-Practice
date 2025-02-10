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

    //! Costco

    //Data
    searchTerm: "macbook",

    //Functions

    search: async function (searchTerm) {
        const searchBar = await $('//input[@aria-describedby ="typeahead-search-field-description"]');
        await searchBar.setValue(searchTerm);
        const searchBarText = await searchBar.getValue();
        await expect(searchBarText).toBe("macbook");
        const searchButton = await $('//button[@data-testid="SearchButton"]');
        await searchButton.click();
    },

    addFirstItemToCart: async function() {
       
        const firstItem = await $$('.product-img-holder')[0];
        await firstItem.click();
        await browser.pause(2000);
        
        const addToCartButton = await $('div#add-to-cart');
        await addToCartButton.waitForStable();
        
        await addToCartButton.click();
        const itemPrice =  await $('span.value').getText();
        const modalBody = await $('.modal-body');
        await modalBody.waitForDisplayed({ timeout: 12000 });
        const addToCartModalTitle = await $('h2.modal-title').getText();
        
        console.log(addToCartModalTitle);
        console.log(itemPrice);

        const checkoutButton= await $('//a[contains(text(), "View Cart")]');
        await checkoutButton.click();
        await browser.pause(2000);
        const cartSubtotal = await $('//div[@automation-id = "totalPriceOutput_1"]').getText();
        console.log(cartSubtotal);
        

    }
};
