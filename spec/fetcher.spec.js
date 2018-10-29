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

describe("Test on Getting all menu items", () => {

    test("Check if after loading menu items order button is added", async () => {
        await page.goto(menu);
        await page.waitFor(20000);
        const order_button = await page.evaluate(() => document.querySelector('.button_create').textContent);
        expect(order_button).toBe("Order");
    },30000);

    test("Check if after loading menu items an input box exists in the table", async () => {
        await page.goto(menu);
        await page.waitFor(20000);
        const order_quantity = await page.evaluate(() => document.querySelector('.order_quantity').textContent);
        expect(order_quantity).toBe("");
    },30000);

    test("Check title of the first menu item", async () => {
        await page.goto(menu);
        await page.waitFor(20000);
        const menu_table = await page.evaluate(() => {
            const menu_items = Array.from(document.querySelectorAll('table #tbody tr td'))
        return menu_items.map(td => td.innerHTML)
        });
        //show data from server through console log
        //console.log (menu_table)
        // Equate that the first menu item is indeed burger
        expect(menu_table[1]).toEqual("Burger")
    },30000);
    
},40000);