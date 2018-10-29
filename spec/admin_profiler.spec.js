const faker = require('faker')
const puppeteer = require('puppeteer')

const userProfUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/admin_profile.html";
const userUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/user_profile.html";


const userAdminData = {
    email:"fast@food.com",
    upassword:"admin123"
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
        expect(title).toBe("Admin Profile");
    });
});

describe("Testing order history table filling", () => {

    test("Check if your orders title exists before history table", async () => {
        await page.goto(userProfUrl);
        await page.waitFor(10000);
        const h2_content = await page.evaluate(() => document.querySelector('#titling').textContent);
        expect(h2_content).toBe("Customer Orders");
    },30000);

    test("Check existance of add food button", async () => {
        await page.goto(userProfUrl);
        const links = await page.evaluate(() => document.querySelector('.button_create').textContent);
        expect(links).toBe("Add Food");
    },16000);

    test("Check existance of edit food button", async () => {
        await page.goto(userProfUrl);
        const links = await page.evaluate(() => document.querySelector('.edit').textContent);
        expect(links).toBe("Edit Menu");
    },16000);

    test("Check existance of view food menu button", async () => {
        await page.goto(userProfUrl);
        const links = await page.evaluate(() => document.querySelector('.menu').textContent);
        expect(links).toBe("View Food List");
    },16000);
})
