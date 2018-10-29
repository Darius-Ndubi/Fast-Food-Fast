const puppeteer = require('puppeteer')

const signinUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/signin.html";

const userData = [{
    email:"ndubiodarius@gmail.com",
    upassword:"Yagami@12"
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
    email:"ndubiidarius@gmail.com",
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
        await page.waitFor(40000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },50000);

    // test("Test on admin login with correct data", async () =>{
    //     await page.goto(signinUrl);
    //     await page.waitForSelector(".form_content");
    //     await page.click("#email");
    //     await page.type("#email", userData[2].email);
    //     await page.click("#psswd");
    //     await page.type("#psswd", userData[2].upassword);
    //     await page.click(".signin");
    //     await page.waitFor(40000);
    //     await page.on("alert",(dialog) =>{
    //         dialog.accept();
    //     });
    // },50000);

});

describe("Testing the page redirections", () => {

    test("Test load reset password page", async () => {
        await page.goto(signinUrl);
        //await page.waitForSelector(".more_link");
        await page.click(".more_link");
        await page.waitFor(20000);
        const title = await page.title();
        expect(title).toBe("Reset Password");
    },30000);

    test("Test redirect to signup  password page", async () => {
        await page.goto(signinUrl);
        //await page.waitForSelector(".more_link");
        await page.click(".signup");
        await page.waitFor(20000);
        const title = await page.title();
        expect(title).toBe("Join Us | Sign Up");
    },30000);

});