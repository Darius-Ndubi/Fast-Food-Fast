const faker = require('faker')
const puppeteer = require('puppeteer')

const signupUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/signup.html";

const fakeUser = {
    email: faker.internet.email(),
    uname: faker.internet.userName(),
    upassword: faker.internet.password(),
    confirm_password: faker.internet.password()
};

const userData = [{
    email:"",
    uname:"",
    upassword:"",
    confirm_password:""
},
{
    email:"ndubiodariusgmail.com",
    uname:"yagami",
    upassword:"Yagami@12",
    confirm_password:"Yagami@12"
},
{
    email:"ndubiodarius@gmail.com",
    uname:"yagami",
    upassword:"Yagami@12",
    confirm_password:"Yagami@12"
},
{
    email:"ndubiodarius@gmail.com",
    uname:"yagami",
    upassword:"Yagami@123",
    confirm_password:"Yagami@12"
}]


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
        await page.goto(signupUrl);
        const title = await page.title();
        expect(title).toBe("Join Us | Sign Up");
    });
  });

describe("User Sign Up Form", () => {
    test("Test on user signup with empty form ", async () => {
        await page.goto(signupUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[0].email);
        await page.click("#uname");
        await page.type("#uname", userData[0].uname);
        await page.click("#psswd");
        await page.type("#psswd", userData[0].upassword);
        await page.click("#cpsswd");
        await page.type("#cpsswd", userData[0].confirm_password);
        await page.click(".signup");
        await page.waitFor(10000);
        const divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual('Email is not well formatted (Must have @ and .com) and not contain spaces or #,$,%,^,&,*,!,(,) and :')
      }, 50000);

    test("Test on user signup with random data ", async () => {
      await page.goto(signupUrl);
      await page.waitForSelector(".form_content");
      await page.click("#email");
      await page.type("#email", fakeUser.email);
      await page.click("#uname");
      await page.type("#uname", fakeUser.uname);
      await page.click("#psswd");
      await page.type("#psswd", fakeUser.upassword);
      await page.click("#cpsswd");
      await page.type("#cpsswd", fakeUser.confirm_password);
      await page.click(".signup");
      //await page.waitForSelector("alert");
      await page.on("alert",(dialog) =>{
        dialog.accept();
        });
    }, 50000);

    test("Test on user signup with incorrect email", async () => {
        await page.goto(signupUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[1].email);
        await page.click("#uname");
        await page.type("#uname", userData[1].uname);
        await page.click("#psswd");
        await page.type("#psswd", userData[1].upassword);
        await page.click("#cpsswd");
        await page.type("#cpsswd", userData[1].confirm_password);
        await page.click(".signup");
        //await page.waitForSelector("alert");
        // await page.on("alert",(dialog) =>{
        //     delay(1000);
        //     dialog.accept();
        //     delay(1000);
        // });
        await page.waitFor(10000);
        const divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual("Email is not well formatted (Must have @ and .com) and not contain spaces or #,$,%,^,&,*,!,(,) and :")
      }, 50000);

      test("Test on user signup with non matching password", async () => {
        await page.goto(signupUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[3].email);
        await page.click("#uname");
        await page.type("#uname", userData[3].uname);
        await page.click("#psswd");
        await page.type("#psswd", userData[3].upassword);
        await page.click("#cpsswd");
        await page.type("#cpsswd", userData[3].confirm_password);
        await page.click(".signup");
        await page.waitFor(10000);
        const divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual("Password and confirm password don't match")
      }, 50000);

      test("Test on user signup with correct data ", async () => {
        await page.goto(signupUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData[2].email);
        await page.click("#uname");
        await page.type("#uname", userData[2].uname);
        await page.click("#psswd");
        await page.type("#psswd", userData[2].upassword);
        await page.click("#cpsswd");
        await page.type("#cpsswd", userData[2].confirm_password);
        await page.click(".signup");
        await page.waitFor(10000);
        const divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual("Sign up request for could not be completed due to existance of same email")
      }, 50000);
  });


describe("User redirect to login page",() =>{
    test("Test user load login page successfully", async () => {
        await page.goto(signupUrl);
        await page.waitForSelector(".more_link");
        await page.click(".more_link");
        await page.waitFor(20000);
        const title = await page.title();
        expect(title).toBe("Join Us | Sign In");
    },30000);
})