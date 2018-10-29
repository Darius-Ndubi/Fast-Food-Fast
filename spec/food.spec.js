const puppeteer = require('puppeteer')

const menuUrl = "file:///home/dario/Documents/prac/Fast-Food-Fast/UI/add_food.html";

const mealData =[{
    title:"",
    description:"",
    price:"",
    type:""
},
{
    title:"Omena",
    description:"Does not have enough soup to revive it",
    price:"150",
    type:"meal"
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
        await page.goto(menuUrl);
        const title = await page.title();
        expect(title).toBe("Add Food Item");
    });
});

describe("Menu item creation form", () =>{
    test("Test on user create menu item empty form", async () =>{
        await page.goto(menuUrl);
        await page.waitForSelector(".form_content");
        await page.click("#title");
        await page.type("#title", mealData[0].title);
        await page.click("#descri");
        await page.type("#descri", mealData[0].description);
        await page.click("#price");
        await page.type("#price", mealData[0].price);
        await page.click("#type");
        await page.type("#type", mealData[0].type);
        await page.click(".add_food");
        await page.waitFor(10000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },20000);

    test("Test on user create menu successfully", async () =>{
        await page.goto(menuUrl);
        await page.waitForSelector(".form_content");
        await page.click("#title");
        await page.type("#title", mealData[1].title);
        await page.click("#descri");
        await page.type("#descri", mealData[1].description);
        await page.click("#price");
        await page.type("#price", mealData[1].price);
        await page.click("#type");
        await page.type("#type", mealData[1].type);
        await page.click(".add_food");
        await page.waitFor(10000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },20000);
});