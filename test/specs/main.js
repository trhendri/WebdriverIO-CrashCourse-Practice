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

    /* 
   it("Check Jest is working with no errors", async () => {
        const four = 4;
        const five = 5;
        await console.log(four + five);
        await expect(four + five).toBeLessThan(20);
    });
    */

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
        const matcher = await $$(".sc-bd5d6398-0.tsLvz")[1].getText();
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
    before(async () => {
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
        const addToCartButton = await $('button[aria-label="Add to cart for Unlimited Cellular HardShell Case for 13-inch MacBook Retina - Blue"]');
        await addToCartButton.click();
        const addCartModal = await $(".ReactModal__Content");
        await addCartModal.waitForExist();
        const addToCartConfirm = await $('span[class="h-text-lg"]').getText();
        await expect(addToCartConfirm).toContain("Added to cart");
        const viewCartButton = await $('div a[class="sc-ddc722c0-0 sc-3d5333d1-0 flfJAZ jaKlHa"]');
        await viewCartButton.click();
        const subtotal = await $(".sc-93ec7147-3.hNHMW").getText();
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
       
        await page.addToCart();
        await browser.pause(2000);
        const closeButton = await $('button[aria-label="close"]');
        await closeButton.click();
        const cartButton = await $('a[data-test="@web/CartLink"]');
        await cartButton.click();
        const originalTotal = await $("div.sc-5da3fdcc-0>div.sc-f82024d1-0.fMpNwo>p.h-text-bs");
        const originalTotalText = await originalTotal.getHTML();
        const quantityButton = await $(".sc-e78156cc-2.iwEujR");
        await quantityButton.click();
        await browser.keys("ArrowDown");
        await browser.keys("Enter");
        await browser.pause(2000);

        const updatedTotal = await $("div.sc-5da3fdcc-0>div.sc-f82024d1-0.fMpNwo>p.h-text-bs");
        const updatedTotalText = await updatedTotal.getHTML();
        await console.log(originalTotalText);
        await console.log(updatedTotalText);
        expect(originalTotalText).not.toBe(updatedTotalText);
    });
});
