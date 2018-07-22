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
      choices: [`1. View Product Sales by Department`, `2. Create New Department`]
    }
    ]).then(answers => {
     //console.log(answers.menuOptions[0]);
     if(answers.menuOptions[0] == 1){
        //view product sales by department
        connection.query(`SELECT * FROM products`, (err, res) => {
            if (err) throw err;
            console.log(res);
        })
    } else if (answers.menuOptions[0] == 2){
        //create a new department
    }
    });