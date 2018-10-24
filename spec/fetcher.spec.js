const puppeteer = require('puppeteer')

const menu = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/view_foods.html";

let page;
let browser;
const width = 1058;
const height = 600;

beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 150,
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
        await page.goto(menu);
        const title = await page.title();
        expect(title).toBe("Foods");
    });
});

// describe("Test on Getting all menu items", () => {
//     test("Check if after loading menu item order button is added", async () => {
//         await page.goto(menu);
//         await page.waitFor(2000000);
//         await page.waitForSelector("#tbody");
//         await page.click(".order_quantity");
//         await page.type(".order_quantity",2);
//         await page.click(".button_create");
//     });
// },40000);