class PaymentPage{
    constructor(page, expect){
        this.page = page;
        this.expect = expect;
        this.checkoutBtn = page.locator("[type='button']");
        this.itemName = page.locator(".item__title");
        this.userEmail = page.locator("label[type='text']");
        this.countryInputBox = page.locator("[placeholder='Select Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.cvvBox = page.locator("[type='text']");
        this.applyCoupenBox = page.locator("[name='coupon']");
        this.submitCoupenBox = page.locator("button[type='submit']");
        this.placeOrderBtn = page.locator("text=Place Order ");
    }

    async gotoCheckoutPage(){
        await this.checkoutBtn.nth(1).click();
    }

    async validateOrderDetails(itemName, email){
        await this.expect(this.itemName.nth(0)).toContainText(itemName);
        await this.expect(this.userEmail).toContainText(email);
    }

    async fillDetails(desiredCountry){
        await this.countryInputBox.pressSequentially("indi",{delay:150});
        await this.countryDropdown.waitFor();
        const n = await this.countryDropdown.locator("button").count();
    
        for(let i=0; i<n; ++i){
            const currentCountry = await this.countryDropdown.locator("button").nth(i).textContent();
            if(currentCountry===desiredCountry){
            console.log("India");
            await this.countryDropdown.locator("button").nth(i).click();
            break;
            }
        }

        // enter cvv
        await this.cvvBox.nth(1).fill("548");
        // apply coupen
        await this.applyCoupenBox.fill("rahulshettyacademy");
        await this.submitCoupenBox.click();
    }

    async placeOrder(){
        await this.placeOrderBtn.click();
    }



}
module.exports={PaymentPage};