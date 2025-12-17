class LoginPage{

    constructor(page){
       this.page = page;
       this.userName = page.locator("#userEmail");
       this.password = page.locator("#userPassword");
       this.signInBtn = page.locator("#login");
    }

    async goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }

    async login(email, pass){
        await this.userName.fill(email);
        await this.password.fill(pass);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {LoginPage};