const faker = require('faker')
const puppeteer = require('puppeteer')

const userProfUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/user_profile.html";


const userData = {
    email:"ndubidarius@gmail.com",
    upassword:"masese"
};

let page;
let browser;
const width = 1058;
const height = 600;

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
        await page.goto(userProfUrl);
        const title = await page.title();
        expect(title).toBe("Your Profile");
    });
});


describe("Testing user history table filling", () => {

    test("Check if your orders title exists befoore history table", async () => {
        await page.goto(userProfUrl);
        await page.waitFor(20000);
        const h2_content = await page.evaluate(() => document.querySelector('#titling').textContent);
        expect(h2_content).toBe("Your Orders");
    },30000);
    
    test("Check existance of create order button", async () => {
        await page.goto(userProfUrl);
        const h2_content = await page.evaluate(() => document.querySelector('.button_create').textContent);
        expect(h2_content).toBe("ORDER MORE");
    },16000);

    test("Check that users history is correctly loaded", async () => {
        await page.goto(userProfUrl);
        await page.click("#leave");
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData.email);
        await page.click("#psswd");
        await page.type("#psswd", userData.upassword);
        await page.click(".signin");
        await page.waitFor(10000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
        await page.goto(userProfUrl);
        await page.waitFor(20000);
        const userHisoryTable = await page.evaluate(() => {
            const tableItems = Array.from(document.querySelectorAll('table #tbody tr td'))
            return tableItems.map(td => td.innerHTML)
        });
        //console.log(userHisoryTable)
        expect(userHisoryTable[7]).toEqual("dario")
    },50000);
})
