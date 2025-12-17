const{test, expect} = require('@playwright/test')

test.only("Practice Test Case", async ({page})=>{
    const email = "sathyakrishna384@gmail.com";

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Satya@0384");
    await page.locator("#login").click();
    // await page.locator("text=Automation").waitFor();
    // console.log(await page.locator("[style = 'text-transform: uppercase;'] b").first().textContent());
    // await page.waitForLoadState('networkidle');
    // console.log(await page.locator("[style = 'text-transform: uppercase;'] b").allTextContents());

    // Add item to cart
    const itemName = "ZARA COAT 3";
    await page.locator("#products").first().waitFor();
    const allProducts = await page.locator(".card-body");
    const c = await allProducts.count();
    for(let i=0; i<c; ++i){
        if(await allProducts.nth(i).locator("b").textContent()===itemName){
            await allProducts.nth(i).locator("button").last().click();
        }
    }
    // open cart
    await page.locator("[routerLink='/dashboard/cart']").click();
    await page.locator("[type='button']").nth(1).click();
    await expect(page.locator(".item__title").nth(0)).toContainText(itemName);
    // verify email
    await expect(page.locator("label[type='text']")).toContainText(email);
    // enter country
    await page.locator("[placeholder='Select Country']").pressSequentially("indi",{delay:150});
    // get dropdown options
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const n = await dropdown.locator("button").count();
    const desiredCountry = " India";
    for(let i=0; i<n; ++i){
        const currentCountry = await dropdown.locator("button").nth(i).textContent();
        if(currentCountry===" India"){
            console.log("India");
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    // enter cvv
    await page.locator("input[type='text']").nth(1).fill("548");
    // apply coupen
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator("button[type='submit']").click();
    // place order
    await page.locator("text=Place Order ").click();
    // verify thank you text
    await expect(page.locator(".hero-primary")).toContainText("Thankyou for the order.");
    // // verify order name
    await page.locator("div.title").nth(0).textContent(itemName);
    // store order id
    const ordId = await page.locator("label.ng-star-inserted").textContent();
    // goto order history
    const arr = ordId.split(" ");
    const orgOrdId = arr[2];
    console.log(orgOrdId);
    // click order history
    await page.locator("label[routerLink='/dashboard/myorders']").click();

    await page.locator("tr.ng-star-inserted").first().waitFor();
    const allOrders = await page.locator("tr.ng-star-inserted");
    const orC = await allOrders.count();
    console.log(orC);
    let found = false;
    for(let i=0; i<orC;++i){
        let currentOrdId = await allOrders.locator("[scope='row']").nth(i).textContent();
        if(currentOrdId===orgOrdId){
            console.log("order ID matched");
            found = true;
            expect(found).toBeTruthy();
            await allOrders.nth(i).locator("button").first().click();

            break;
        }
    }
    expect(page.locator("text= order summary ").isVisible).toBeTruthy();

}   
);