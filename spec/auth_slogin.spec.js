const faker = require('faker')
const puppeteer = require('puppeteer')

const signinUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/signin.html";

const fakeUser = {
    email: faker.internet.email(),
    upassword: faker.internet.password()
};

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
});

describe("User login form", () =>{
    test("Test on user login with unregistred credentials", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", fakeUser.email);
        await page.click("#psswd");
        await page.type("#psswd", fakeUser.upassword);
        await page.click(".signin");
        //await page.waitForSelector("alert");
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },10000);

    test("Test on user login with empty fields", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[1].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[1].upassword);
        await page.click(".signin");
        //await page.waitForSelector("alert");
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },10000);

    test("Test on user login with correct data", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);
        await page.click(".signin");
        //await page.waitForSelector("alert");
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },10000);

    test("Test on admin login with correct data", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[2].email);
        await page.click("#psswd");
        await page.type("#psswd", userData[2].upassword);
        await page.click(".signin");
        //await page.waitForSelector("alert");
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },10000);

    test("Test load reset password page", async () => {
        await page.goto(signinUrl);
        await page.waitForSelector(".more_link");
        await page.click(".more_link");
    },16000);

    test("Test redirect to signup  password page", async () => {
        await page.goto(signinUrl);
        await page.waitForSelector(".more_link");
        await page.click(".signup");
    },16000);
});