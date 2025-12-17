class HistoryPage{
    constructor(page, expect){
        this.expect = expect;
        this.page = page;
        this.histryBtn = page.locator("label[routerLink='/dashboard/myorders']");
        this.allOrders = page.locator("tr.ng-star-inserted");
    }

    async verifyOrderIdInOrderHistory(orderId){
        await this.histryBtn.click();
        await this.allOrders.first().waitFor();
        const orC = await this.allOrders.count();
        console.log(orC);
        let found = false;
        for(let i=0; i<orC;++i){
                let currentOrdId = await this.allOrders.locator("[scope='row']").nth(i).textContent();
                if(currentOrdId===orderId){
                    console.log("order ID matched");
                    found = true;
                    this.expect(found).toBeTruthy();
                    await this.allOrders.nth(i).locator("button").first().click();
                    break;
                }
            }
        this.expect(this.page.locator("text= order summary ").isVisible).toBeTruthy();
    }
}
module.exports={HistoryPage};