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

 
// instantiate
var table = new Table({
    head: ['Department ID', 'Department Name', 'Overhead Costs', 'Total Sales', 'Total Profit']
  , colWidths: [10, 18, 18, 18, 18]
});
 
// table is an Array, so you can `push`, `unshift`, `splice` and friends
table.push(
    ['1', 'Electronics', '1000', '2000']
  , ['2', 'sports and outdoors', '500', '1000']
  , ['3', 'home', '400', '300']
  , ['4', 'office supplies', '100', '60']
  , ['5', 'exercise equiptment', '300', '1000']
);
 


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
        console.log(table.toString());
    } else if (answers.menuOptions[0] == 2){
        //create a new department
    }
    });