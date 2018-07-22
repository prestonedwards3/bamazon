var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


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


inquirer.prompt([
    {
      type: "list",
      name: "menuOptions",
      message: "What would you like to do?",
      choices: [`1. View Products for Sale`, `2. View Low Inventory`, `3. Add to Inventory`, `4. Add New Product`]
    }
    ]).then(answers => {
     //console.log(answers.menuOptions[0]);
     if(answers.menuOptions[0] == 1){
        //show all products in stock
        connection.query(`SELECT * FROM products`, (err, res) => {
            if (err) throw err;
            console.log(res);
        })
        
      } else if (answers.menuOptions[0] === '2') {
        //select all products with inventory less than 5
        connection.query(`SELECT * FROM products HAVING stock_quantity < 6`, (err, res) => {
            if (err) throw err;
            console.log(res); 
        })


      } else if (answers.menuOptions[0] === '3') {
        connection.query(`SELECT * FROM products`, (err, res) =>{
            console.log(res); 
        })
          //update products table 
          inquirer.prompt([
            {
              type: "input",
              name: "updateInventory",
              message: "What is the Item Id of the product you would like to add more of?",
            },
            {
                type: "input",
                name: "quantity",
                message: "How many units would you like to add?"
              } 
            ]).then(answers => {
                
                let id = answers.updateInventory;
                let quantity = answers.updateInventory;
                connection.query(`UPDATE products SET ? WHERE ?`, [
                {
                stock_quantity: quantity
                }, 
                {
                item_id: id
                 }
                ], (err, res) =>{
                    console.log(res)
                })
            });
      } else if (answers.menuOptions[0] === '4') {
          
          //Insert a new product into the products table
          inquirer.prompt([
            {
              type: "input",
              name: "addProduct_name",
              message: "What is the name of the product you would like to add?",
             
            },
            {
                type: "input",
                name: "addProduct_department",
                message: "What department do you want to add this product to?", 
              },
              {
                type: "input",
                name: "addProduct_price",
                message: "What is the price of this product?", 
              },
              {
                type: "input",
                name: "addProduct_stock",
                message: "How many do you want to put in stock?", 
              },
            ]).then(answers => {
                let productName = answers.addProduct_name;
                let department = answers.addProduct_department;
                let price = answers.addProduct_price;
                let stock = answers.addProduct_stock;

                connection.query(`INSERT INTO products SET ?`, [{
                    product_name: productName,
                    department_name: department,
                    price: price,
                    stock_quantity: stock
                }], (err, res) => {
                    connection.query(`SELECT * FROM products`, (err, res) =>{
                        console.log(res); 
                    }) ;
                })

            });
      
      
        }
        
      });