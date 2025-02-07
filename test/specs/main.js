const page = require("./page");

/*describe("Testing", () => {
    it("should compute", async () => {
        await browser.url("/");
        await expect(browser).toHaveUrl("https://www.target.com/");
    });

    it('should pull from page.js', async () =>{
        const ten = 10;
        const total = await page.four + ten;
        await console.log(total);


    });
});
*/

//import { Key } from 'webdriverio'
//Change to target instead of Amazon bc of constant captcha
// WebDRIVER IO CRASH COURSE, TO DO:  move to its own project COMPLETE

describe("Target", () => {
    /*
    //runs before each It block
    beforeEach(async () => { 
        await browser.url("/"); 
        await browser.execute(() => { 
            localStorage.clear(); 
            sessionStorage.clear(); 
        }); 
    }); 
        
       //Runs after each it block
        afterEach(async () => { 
        await browser.deleteCookies(); 
        await browser.refresh(); 
    });
    */

    it("Check browser URL and Title", async () => {
        await browser.url("/");
        await expect(browser).toHaveUrl("https://www.target.com/");
        //await expect(browser).toHaveTitleContaining('Amazon.com');
    });

    it("Search Content and Verify Text", async () => {
        await browser.url("/");
        await browser.refresh();
        await page.keywordSearch();
        const searchText = await $(page.searchText);
        await browser.pause(2000);
        await searchText.waitForDisplayed();
        const confirmSearchText = await searchText.getText();

        console.log(confirmSearchText);

        await expect(confirmSearchText).toContain("macbook");
    });

    //Auto Suggestion Practice

    it("should check autosuggest", async () => {
        await browser.url("/");
        const searchBox = await $(page.searchBox);

        await searchBox.click();
        const autoSuggestBox = await $(page.autoSuggestBox);
        await autoSuggestBox.waitForDisplayed();

        await browser.keys("ArrowDown");

        await browser.keys("ArrowDown");
        const matcher = await $$(".jDJjQX")[1].getText();
        await console.log(matcher);

        await browser.keys("Enter");

        //const afterSearchBox = await $('.gDYAEt"]');
        // await afterSearchBox.waitForDisplayed();

        const searchText = await $(page.searchText);
        await searchText.waitForDisplayed();
        const confirmSearchText = await searchText.getText();

        await expect(confirmSearchText).toContain(matcher);
        //Be sure to try alternative methods to grab text in variables.
    });
});

//Verify the Add Cart Flow
// Before Hooks
//And hidden elements
/* 
Flow:
1. Enter Web Site
2. Search Macbook
3. Select First item
4. Get Price
5. Add to Cart
6. Verify Add to Cart text or Page
7. Verify Cart Subtotal


*/

describe("Add to Cart Flow", () => {
    // Why should we add a before block here instead of just using it in it block? does it run before every it block if there were multiple?
    beforeEach(async () => {
        await browser.url("/");
    });

    it("Add to Cart", async () => {
        //find container to work with multiple nodes
        // await $$('dafadsfa'); to select all nodes
        //await $$('dafadsfa')[0]; an array to select the first node
        //await $('dafadsfa'); just one dollar sign also selects the first item
        await page.keywordSearch();
        //Banner Keeps messing up test. Figure out workaround.
        await browser.pause(8000);
        const productListGrid = await $('div[data-module-type="ProductListGrid"]');
        await productListGrid.click();

        await page.addToCart();

        const itemPrice = await $$('span[data-test="product-price"]')[0].getText();
        console.log("item price:" + itemPrice);
        //const addToCartButton = await $$('button=Add to cart]')[0];
        //await addToCartButton.click();
        const addCartModal = await $(".ReactModal__Content");
        await addCartModal.waitForExist();
        const addToCartConfirm = await $('span[class="h-text-lg"]').getText();
        await expect(addToCartConfirm).toContain("Added to cart");
        const viewCartAndCheckoutButton = await $(page.viewCartAndCheckoutButton);
        await viewCartAndCheckoutButton.click();
        const orderSummaryButton = await $(page.orderSummaryButton);
        await orderSummaryButton.click();
        const targetSubtotal = await $$(".styles_ndsCol__MIQSp > p")[2];
        await targetSubtotal.waitForDisplayed();
        const subtotal = await targetSubtotal.getText();
        console.log(subtotal);
        await expect(subtotal).toContain(itemPrice);
    });

    //Update Cart and Verify Amount
    //Negative Assertions
    /*
Flow
1. Go to cart
2. Change quantity to 2
3. Check subtotal is updated, no need to verify text

*/

    it("Update Cart and Verify", async () => {
        await page.keywordSearch();

        await page.addToCart();
        await browser.pause(2000);
        const closeButton = await $('button[aria-label="close"]');
        await closeButton.click();
        const cartButton = await $('a[data-test="@web/CartLink"]');
        await cartButton.click();
        const orderSummaryButton = await $(page.orderSummaryButton);
        await orderSummaryButton.click();
        await browser.pause(1000);
        const originalTotal = await $('//div[@data-test="cart-summary-total"]').getText();
        console.log(originalTotal);

        const quantityButton = await $('//select[@data-test="cartItem-qty"]');
        await quantityButton.click();

        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await browser.pause(2000);

        //const updatedTotal = await $("div.sc-5da3fdcc-0>div.sc-f82024d1-0.fMpNwo>p.h-text-bs");
        const updatedTotal = await $('//div[@data-test="cart-summary-total"]').getText();
        console.log(updatedTotal);
        expect(originalTotal).not.toBe(updatedTotal);
    });
});
