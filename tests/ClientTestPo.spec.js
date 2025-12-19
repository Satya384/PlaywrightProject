const{test, expect} = require('@playwright/test');
const{POManager} = require('../PageObjectModel/POManager');
const testData = JSON.parse(JSON.stringify(require("../utils/testData.json")));

for(const data of testData){
    test.only("Practice Test Case"+data.itemName, async ({page})=>{
        let orderId;

        const poManager = new POManager(page, expect);
        await poManager.getLoginPage().goto();
        await poManager.getLoginPage().login(data.email, data.password);
        await poManager.getDashboardPage().addToCart(data.itemName);
        await poManager.getPaymentPage().gotoCheckoutPage();
        await poManager.getPaymentPage().validateOrderDetails(data.itemName, data.email);
        await poManager.getPaymentPage().fillDetails(data.desiredCountry);
        await poManager.getPaymentPage().placeOrder();
        await poManager.getOrderSummarypage().verifyOrderDetailsInSummary(data.itemName);
        orderId = await poManager.getOrderSummarypage().collectOrdId();
        await poManager.getHistoryPage().verifyOrderIdInOrderHistory(orderId);
    });
}