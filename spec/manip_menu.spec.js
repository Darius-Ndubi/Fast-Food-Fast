const puppeteer = require('puppeteer')

const editMenu = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/manipulate_menu.html";

const mealData =[{
    title:"",
    description:"",
    price:"",
    type:""
}]

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
        await page.goto(editMenu);
        const title = await page.title();
        expect(title).toBe("Edit Food Menu");
    });
});

describe("Test on Getting all menu items", () => {

    test("Check title of the first menu item", async () => {
        await page.goto(editMenu);
        await page.waitFor(20000);
        const menu_table = await page.evaluate(() => {
            const menu_items = Array.from(document.querySelectorAll('table #tbody tr td'))
        return menu_items.map(td => td.innerHTML)
        });
        expect(menu_table[1]).toEqual("Burger")
    },30000);
    

    test("Check if after loading menu items edit button is added", async () => {
        await page.goto(editMenu);
        await page.waitFor(30000);
        const order_button = await page.evaluate(() => document.querySelector('.button_edit').textContent);
        expect(order_button).toBe("Edit");
    },40000);

    test("Check if after loading menu items delete button is added", async () => {
        await page.goto(editMenu);
        await page.waitFor(30000);
        const order_button = await page.evaluate(() => document.querySelector('.button_delete').textContent);
        expect(order_button).toBe("Delete");
    },40000);

    test("Check if after loading menu items delete button is added", async () => {
        await page.goto(editMenu);
        await page.waitFor(30000);
        const order_button = await page.evaluate(() => document.querySelector('.button_delete').textContent);
        expect(order_button).toBe("Delete");
    },40000);
    

},60000);

describe("Testing the page redirections", () => {

    test("Test loading edit menu item page", async () => {
        await page.goto(editMenu);
        await page.waitForSelector(".button_edit");
        await page.click(".button_edit");
        await page.waitFor(30000);
        const title = await page.title();
        expect(title).toBe("Edit Food Item");
    },40000);

    test("Test editing menu item with empty data", async () => {
        await page.goto(editMenu);
        await page.waitForSelector(".button_edit");
        await page.click(".button_edit");
        await page.waitFor(20000);
        await page.waitForSelector(".form_content");
        await page.click("#title");
        await page.type("#title", mealData[0].title);
        await page.click("#descri");
        await page.type("#descri", mealData[0].description);
        await page.click("#price");
        await page.type("#price", mealData[0].price);
        await page.click("#type");
        await page.type("#type", mealData[0].type);
        await page.click(".button_create");
        await page.waitFor(30000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },70000);

    test("Test delete menu item without login", async () => {
        await page.goto(editMenu);
        await page.waitForSelector(".button_delete");
        await page.click(".button_delete");
        await page.waitFor(50000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },70000);
});