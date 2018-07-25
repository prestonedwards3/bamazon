var mysql = require("mysql");
var inquirer = require("inquirer");
// var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

var itemToBuy = "";
var quantity = "";
var subtotal;
var totalArr = []; 
var total = 0; 

function displayCatalog() {
  connection.query(`SELECT * FROM products`, (err, res) => {
    if (err) throw err;
  
    console.log(res);
  })
}

//ask a user if they would like to shop
function shop() {
  inquirer.prompt([
{
  type: "confirm",
  name: "shop",
  message: "Would you like to look at our catelog?"
}
]).then(answers => {
  if(answers.shop){
    //create a new table with the users purchases that will later be used to find how much they owe the store
    //connection.query(`CREATE`)
    //if yes provide them with the catelog
    purchaseProduct();
     
  } else {
    //if they are done shoping thank them for coming 
    console.log(`Thanks for coming! Your total is $0`)
  }
});
}


function purchaseProduct() {
  
  inquirer.prompt([ 
   
    {
      type: "input",
      name: "productId",
      message: "What is the item ID of the product you would like to buy?"

    },
    {
      type: "input",
      name: "quantity",
      message: "How many units would you like to buy?"
    } 
  ]).then(answers => {

    itemToBuy = answers.productId;
    quantity = answers.quantity;
    
    function checkStock() {

      connection.query(`SELECT * FROM products WHERE item_id = ?`, [itemToBuy] , (err, res) =>{
        if (err) throw err;
        if(res[0].stock_quantity > quantity){
          var subtotal = res[0].price * quantity;
          //var subtotal = parseInt(subtotal);
          totalArr.push(subtotal);
          //for (var i = 0; i < totalArr.length; i++){
            //total += totalArr;
            //console.log(totalArr);

          //}
          console.log(`Thank you for purchasing: ${res[0].product_name} Your total is ${subtotal}`)
          connection.query(`UPDATE products SET ? WHERE ?`, [
            {
              stock_quantity: res[0].stock_quantity - quantity,
              product_sales: quantity * res[0].price
            } , { 
              item_id: itemToBuy
            }
          ],  (err, res) => {
            
            //console.log(res);
            //as a user if they would like to continue shopping
          function continueShopping() {
            inquirer.prompt([
          {
            type: "confirm",
            name: "continue",
            message: "Would you like to continue shopping?"
          }
          ]).then(answers => {
            if(answers.continue){
              
              //if yes provide them with the catelog
              purchaseProduct();
            } else {
              //if they are done shoping thank them for coming and then provide them with their reciept
              console.log(`Thanks for coming!`)
            }
          });
          }
            continueShopping()
          })
        } else {
          console.log(`Sorry we're sold out of ${res[0].product_name}`)
        }
        
      })
    }
    checkStock();
  });
  displayCatalog()
  
}
shop();