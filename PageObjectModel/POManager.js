const { DashboardPage } = require("./DashboardPage");
const { LoginPage } = require("./LoginPage");
const { PaymentPage } = require("./PaymentPage");
const { OrderSummaryPage } = require("./OrderSummaryPage");
const { HistoryPage } = require("./HistoryPage");



class POManager{
    constructor(page, expect){
        this.page = page;
        this.expect = expect;
    }
    getLoginPage(){
        const loginPage = new LoginPage(this.page);
        return loginPage;
    }

    getDashboardPage(){
        const dashboardPage = new DashboardPage(this.page);
        return dashboardPage;
    }

    getPaymentPage(){
        const paymentPage = new PaymentPage(this.page,this.expect);
        return paymentPage;
    }

    getOrderSummarypage(){
        const orderSummaryPage = new OrderSummaryPage(this.page);
        return orderSummaryPage;
    }

    getHistoryPage(){
        const historyPage = new HistoryPage(this.page, this.expect);
        return historyPage;
    }
}

module.exports={POManager};