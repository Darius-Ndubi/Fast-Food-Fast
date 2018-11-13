const puppeteer = require('puppeteer')

const signinUrl = "file:///Users/ke-c02sgb80fvh3/Documents/FinishUp/Fast-Food-Fast/UI/signin.html";
const userProfUrl = "file:///Users/ke-c02sgb80fvh3/Documents/FinishUp/Fast-Food-Fast/UI/user_profile.html";


const userData = [{
    email:"ndubidarius@gmail.com",
    upassword:"masese"
},
{
    email:"",
    upassword:""
},
{
    email:"fast@food.com",
    upassword:"admin123"
},
{
    email:"ndubiiodarius@gmail.com",
    upassword:"Yagamii@12"
}
]

let page;
let browser;
const width = 375;
const height = 584;

beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50,
      args: [`--window-size=${width},${height}`]
    });
    page = await browser.newPage();
    await page.setViewport({ width, height });
    
  });
afterAll(() => {
    browser.close();
});

describe("Testing the page outlook", () => {
    test("Check that title is correct", async () => {
        await page.goto(signinUrl);
        const title = await page.title();
        expect(title).toBe("Join Us | Sign In");
    });

    test("Check that signin button exists", async () => {
        await page.goto(signinUrl);
        const button_login = await page.evaluate(() => document.querySelector('.signin').textContent);
        expect(button_login).toBe("Sign In");
    });
});

describe("User login form", () =>{
    test("Test on user login with unregistred credentials", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[3].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[3].upassword);
        await page.click(".signin");
        await page.waitFor(70000);

        // check the message given back to the user
        const divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual('Sign in request failed, user not signed up!')
    },90000);

    test("Test on user login with empty fields", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[1].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[1].upassword);
        await page.click(".signin");
        await page.waitFor(10000);

        // check the message given back to the user
        const divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual('Email is not well formatted (Must have @ and .com) and not contain spaces or #,$,%,^,&,*,!,(,) and :')
    },50000);

    test("Test on user login with correct data", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);
        await page.click(".signin");
        await page.waitFor(5000);

        // accept user alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },40000);

    test("Test on user login with correct data and redirect to their profile", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);
        
        // login the user
        await page.click(".signin");
        await page.waitFor(5000);

        //accept the prompt
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        // load user profile page
        await page.waitFor(8000);
        await page.goto(userProfUrl);
        await page.waitFor(9000);

        //check the title of user profile page
        const title = await page.title();
        expect(title).toBe("Your Profile");
        await page.waitFor(10000);

        //check the tilte of the table
        const h2_content = await page.evaluate(() => document.querySelector('#titling').textContent);
        expect(h2_content).toBe("Your Orders");
    },70000);


    test("Check existance of create order button", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);

        //login the user
        await page.click(".signin");
        await page.waitFor(5000);

        //accept the alert pop up
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        // load user profile page
        await page.waitFor(8000);
        await page.goto(userProfUrl);
        await page.waitFor(9000);

        // check that user create order button existß
        const h2_content = await page.evaluate(() => document.querySelector('.button_create').textContent);
        expect(h2_content).toBe("ORDER MORE");
    },70000);

    test("Check that users history is correctly loaded", async () => {
        await page.goto(userProfUrl);
        await page.waitFor(2000);

        //accept the dialog
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
        await page.waitFor(5000);
        await page.goto(signinUrl);

        //enter your credentials
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);
        await page.click(".signin");
        await page.waitFor(8000);

        //accept the alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        // //load user profile
        await page.waitFor(9000);
        await page.goto(userProfUrl);
        await page.waitFor(10000);

        //check user history data
        const userHisoryTable = await page.evaluate(() => {
            const tableItems = Array.from(document.querySelectorAll('table #tbody tr td'))
            return tableItems.map(td => td.innerHTML)
        });

        //console.log(userHisoryTable)
        expect(userHisoryTable[7]).toEqual("dario")
    },70000);

    test("Check user view on menu page", async() => {
        await page.goto(userProfUrl);
        await page.waitFor(2000);

        //accept the dialog
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
        await page.waitFor(5000);
        await page.goto(signinUrl);

        //enter your credentials
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);
        await page.click(".signin");
        await page.waitFor(8000);

        //accept the alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        // //load user profile
        await page.waitFor(9000);
        await page.goto(userProfUrl);
        await page.waitFor(11000);

        // click on order button
        await page.waitForSelector(".button_create")
        await page.click(".button_create");
        await page.waitFor(12000);

        //check that the correct page is loaded
        const title =  await page.title();
        expect(title).toBe("Foods");

        //check that correct menu item loaded
        const menu_table = await page.evaluate(() => {
            const menu_items = Array.from(document.querySelectorAll('table #tbody tr td'))
        return menu_items.map(td => td.innerHTML)
        });
        //first item should be Burger
        expect(menu_table[1]).toEqual("Grilled_chicken")

        //check if menu has an input box
        const order_quantity = await page.evaluate(() => document.querySelector('.order_quantity').textContent);
        expect(order_quantity).toBe("");

        //chechi if menu has order button, with text Order
        const order_button = await page.evaluate(() => document.querySelector('.button_create').textContent);
        expect(order_button).toBe("Order");

    },70000);
});

describe("Testing the page redirections", () => {

    test("Test load reset password page", async () => {
        await page.goto(signinUrl);

        // select the link to reset password page
        await page.waitForSelector(".more_link");
        await page.click(".more_link");
        await page.waitFor(5000);

        // check the title conforms
        const title = await page.title();
        expect(title).toBe("Reset Password");
    },15000);

    test("Test redirect to signup  password page", async () => {
        await page.goto(signinUrl);

        // select link to signup page
        //await page.waitForSelector(".more_link");
        await page.click(".signup");
        await page.waitFor(5000);

        //check that the correct page is loaded through its title
        const title = await page.title();
        expect(title).toBe("Join Us | Sign Up");
    },15000);

});