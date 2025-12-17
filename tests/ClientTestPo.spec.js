const{test, expect} = require('@playwright/test');
const{POManager} = require('../PageObjectModel/POManager');
const testData = JSON.parse(JSON.stringify(require("../utils/testData.json")));

test.only("Practice Test Case", async ({page})=>{
    let orderId;

    const poManager = new POManager(page, expect);
    await poManager.getLoginPage().goto();
    await poManager.getLoginPage().login(testData.email, testData.pass);
    await poManager.getDashboardPage().addToCart(testData.itemName);
    await poManager.getPaymentPage().gotoCheckoutPage();
    await poManager.getPaymentPage().validateOrderDetails(testData.itemName, testData.email);
    await poManager.getPaymentPage().fillDetails(testData.desiredCountry);
    await poManager.getPaymentPage().placeOrder();
    await poManager.getOrderSummarypage().verifyOrderDetailsInSummary(testData.itemName);
    orderId = await poManager.getOrderSummarypage().collectOrdId();
    await poManager.getHistoryPage().verifyOrderIdInOrderHistory(orderId);
}   
);