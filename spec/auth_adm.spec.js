const puppeteer = require('puppeteer')

const userProfUrl = "file:///Users/ke-c02sgb80fvh3/Documents/FinishUp/Fast-Food-Fast/UI/admin_profile.html";
const signinUrl = "file:///Users/ke-c02sgb80fvh3/Documents/FinishUp/Fast-Food-Fast/UI/signin.html";

const userData = {
    email:"fast@food.com",
    upassword:"admin123"
}
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
},
{
    title:"Mokimo",
    description:"One is never enough",
    price:"300",
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

describe("Admin user tests", () =>{
    test("Test on admin login with correct data", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData.email);
        await page.click("#psswd");
        await page.type("#psswd", userData.upassword);
        await page.click(".signin");
        await page.waitFor(5000);

        //Accept the alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },10000);

    test("Test admin login and redirect to profile", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData.email);
        await page.click("#psswd");
        await page.type("#psswd", userData.upassword);
        await page.click(".signin");
        await page.waitFor(5000);

        //Accept the alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        //load admin page
        await page.waitFor(6000);
        await page.goto(userProfUrl);
        await page.waitFor(7000);

        //check that the correct page is loaded
        const title =  await page.title();
        expect(title).toBe("Admin Profile");
        
        //Check if your orders title exists before history table
        const h2_content = await page.evaluate(() => document.querySelector('#titling').textContent);
        expect(h2_content).toBe("Customer Orders");

        // Check existance of add food button
        let links = await page.evaluate(() => document.querySelector('.button_create').textContent);
        expect(links).toBe("Add Food");

        //check existance of edit menu button
        links = await page.evaluate(() => document.querySelector('.edit').textContent);
        expect(links).toBe("Edit Menu");

        //check existance of view food menu button
        links = await page.evaluate(() => document.querySelector('.menu').textContent);
        expect(links).toBe("View Food List");

    },70000);

    test("Test admin add food item", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData.email);
        await page.click("#psswd");
        await page.type("#psswd", userData.upassword);
        await page.click(".signin");
        await page.waitFor(5000);

        //Accept the alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        //load admin page
        await page.waitFor(6000);
        await page.goto(userProfUrl);
        await page.waitFor(7000);

        //click  add food button
        await page.waitForSelector(".button_create");
        await page.click(".button_create");
        await page.waitFor(8000);

        //check that correct page is loaded
        const title = await page.title();
        expect(title).toBe("Add Food Item");


        //Add menu item wrong detail
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
        let divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual("Title entered should have letter between a-z or A-Z or _")

        //admin create food item successfully
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

        await page.waitFor(11000);
        divcontent = await page.evaluate(() => document.querySelector('#message_error').textContent);
        expect(divcontent).toEqual("food item creation could not be completed due to existance of same item")

    },70000);

    test("Admin Edit memu", async () =>{
        await page.goto(signinUrl);
        await page.waitForSelector(".form_content");
        await page.click("#email");
        await page.type("#email", userData.email);
        await page.click("#psswd");
        await page.type("#psswd", userData.upassword);
        await page.click(".signin");
        await page.waitFor(5000);

        //Accept the alert
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });

        //load admin page
        await page.waitFor(6000);
        await page.goto(userProfUrl);
        await page.waitFor(7000);

        //click edit menu button
        await page.waitForSelector(".edit");
        await page.click(".edit");
        await page.waitFor(8000);

        //check that correct page is loaded
        const title = await page.title();
        expect(title).toBe("Edit Food Menu");


        // check menu item loading 
        const menu_table = await page.evaluate(() => {
            const menu_items = Array.from(document.querySelectorAll('table #tbody tr td'))
        return menu_items.map(td => td.innerHTML)
        });
        expect(menu_table[1]).toEqual("Grilled_chicken")

        //check for addition of edit button
        let order_button = await page.evaluate(() => document.querySelector('.button_edit').textContent);
        expect(order_button).toBe("Edit");

        //Check for addition of delete button
        order_button = await page.evaluate(() => document.querySelector('.button_delete').textContent);
        expect(order_button).toBe("Delete");

        //test admin edit menu item successfully
        await page.waitForSelector(".button_edit");
        await page.click(".button_edit");
        
        //load edit food template
        await page.waitFor(15000);
        await page.waitForSelector(".form_content");
        await page.click("#title");
        await page.type("#title", mealData[2].title);
        await page.click("#descri");
        await page.type("#descri", mealData[2].description);
        await page.click("#price");
        await page.type("#price", mealData[2].price);
        await page.click("#type");
        await page.type("#type", mealData[2].type);
        await page.click(".button_create");
        
        //accept the changes
        await page.waitFor(19000);
        await page.on("alert",(dialog) =>{
            dialog.accept();
        });
    },90000);

})
