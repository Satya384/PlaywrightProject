const { expect } = require("@playwright/test");

class OrderSummaryPage{
    constructor(page){
        this.page = page;
        this.thankyouMsg = page.locator(".hero-primary");
        this.ordName = page.locator("div.title");
        this.ordIdEle = page.locator("label.ng-star-inserted");
    }

    async verifyOrderDetailsInSummary(itemName){
        await expect(this.thankyouMsg).toContainText("Thankyou for the order.");
        await this.ordName.nth(0).textContent(itemName);
    }

    async collectOrdId(){
        const ordId = await this.ordIdEle.textContent();
        const arr = ordId.split(" ");
        return arr[2];
    }
}

module.exports={OrderSummaryPage};