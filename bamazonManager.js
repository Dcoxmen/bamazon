var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table2");

var connection = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "bamazon_db",
  port: 3306
});
connection.connect();

function displayProducts() {
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    console.log("");
    console.log("Complete Inventory List");
    console.log("");

    var table = new Table({
      head: ["Product id", "Product Desc", "Cost", "Stock"],
      colWidths: [12, 50, 8, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["blue"],
        compact: true
      }
    }); //end Table
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].id,
        results[i].product_name,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    console.log("");
  });
}
function saleProducts() {
  connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(
    error,
    results
  ) {
    if (error) throw error;
    console.log("");
    console.log("Bamazon Store Inventory");
    console.log("");

    var table = new Table({
      head: ["Product id", "Product Desc", "Cost", "Stock"],
      colWidths: [12, 50, 8, 8],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["blue"],
        compact: true
      }
    }); //end Table
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].id,
        results[i].product_name,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    console.log("");
    initialPrompt();
  });
} //end products for sale function
function lowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    error,
    results
  ) {
    if (error) throw error;
    console.log("");
    console.log("Low Inventory items");
    console.log("");
    var table = new Table({
      head: ["Product Id", "Product Description", "Cost", "Stock"],
      colWidths: [12, 50, 8, 8],
      colAligns: ["center", "left", "right", "center"],
      style: {
        head: ["blue"],
        compact: true
      }
    }); //end table
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].id,
        results[i].products_name,
        results[i].price,
        results[i].stock_quantity
      ]);
    }
    console.log(table.toString());
    console.log("");
    initialPrompt();
  });
}
// function addInventory() {}
// function addNewProduct() {}
function viewDepartments() {
  connection.query("SELECT * FROM departments", function(error, results) {
    if (error) throw error;
    console.log("");
    console.log("Departments List");
    console.log("");
    var table = new Table({
      head: ["Depart. Id", "Description", "OH Cost"],
      colWidths: [14, 45, 12],
      colAligns: ["center", "left", "right"],
      style: {
        head: ["blue"],
        compact: true
      }
    }); //end table
    for (var i = 0; i < results.length; i++) {
      table.push([
        results[i].id,
        results[i].department_name,
        results[i].over_head_costs
      ]);
    }
    console.log(table.toString());
    console.log("");
    initialPrompt();
  });
}
function initialPrompt() {
  inquirer
    .prompt({
      name: "selection",
      type: "rawlist",
      choices: [
        "View products for sale",
        "View low inventory",
        "View departments",
        "Exit"
      ],
      message: "Select one of the following: ",
      default: "Number"
    })
    .then(function(answer) {
      console.log("OK");
    });
}
initialPrompt();
