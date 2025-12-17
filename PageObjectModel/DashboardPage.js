class DashboardPage{
    constructor(page){
        this.page = page;
        this.allProducts = page.locator(".card-body");
        this.openCart = page.locator("[routerLink='/dashboard/cart']");
    }

    async addToCart(itemName){
        const c = await this.allProducts.count();
        for(let i=0; i<c; ++i){
            if(await this.allProducts.nth(i).locator("b").textContent()===itemName){
                await this.allProducts.nth(i).locator("button").last().click();
            }
        }
        // open cart
        await this.openCart.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports={DashboardPage};