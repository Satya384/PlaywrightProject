const{test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    // login with wrong creds
    await userName.fill("wewe");
    await password.fill('learning');
    await signInBtn.click();
    // grabbing incorrect creds message
    console.log(await page.locator("[style='display: none;']").textContent());
    await expect(page.locator("[style='display: none;']")).toContainText("Incorrect");
    // re login with valid creds
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("learning");
    await signInBtn.click();
    // grabbing the 1st phone name
    console.log(await page.locator(".card-title a").first().textContent());
    console.log(await page.locator(".card-title a").nth(2).textContent());


}
);

test("Page Playwright Test", async ({page})=>{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
    await page.locator("[role='combobox']").fill("Oranges");
    await page.locator("[data-entityname='Orange']").click();
    console.log(await page.title());
    await expect(page.locator(".QVRyCf")).toContainText("sweet, round");
});

test.only(
    "Basic UI Actions Test", async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        // handling dropdowns
        await page.locator("select.form-control").selectOption("Consultant");
        await page.locator(".checkmark").last().click();
        // radio button
        await page.locator("#okayBtn").click();
        await expect(page.locator(".checkmark").last()).toBeChecked();
        // check box handling
        await page.locator("#terms").click();
        await expect(page.locator("#terms")).toBeChecked();
        // to uncheck and assertion
        await page.locator("#terms").uncheck();
        expect(await page.locator("#terms").isChecked()).toBeFalsy();
        // valida te an attribute value of an element
        const link = page.locator("[href*='documents']");
        await expect(link).toHaveAttribute("class","blinkingText");
        // await page.pause();
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            link.click(),
        ])
        const txt = await newPage.locator(".red").textContent();
        console.log(txt);
    }
);