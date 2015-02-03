
// Part 1

var Fooditem = function(name, calories, vegan, glutenFree, citusFree){
  this.name = name;
  this.calories = calories;
  this.vegan = vegan;
  this.glutenFree = glutenFree;
  this.citusFree = citusFree;
};

Fooditem.prototype.toString = function(){
  console.log('name:', this.name, 'calories:', this.calories, 'vegan:', this.vegan, 'glutenFree:', this.glutenFree, 'citusFree:', this.citusFree);
};

var burrito = new Fooditem('Supreme', '800', 'false', 'false', 'false');
var burger = new Fooditem('Bacon cheese', '1500', 'false', 'false', 'false');
var sushi = new Fooditem('California roll', '600', 'true', 'true', 'true');

burrito.toString();
burger.toString();
sushi.toString();


// Part 2

var ServingItem = function(name, description, price, ingredients){
  this.name = name;
  this.description = description;
  this.price = price;
  this.ingredients = ingredients;
};

var Drink = function(name, description, price, ingredients){
  ServingItem.call(this, name, description, price, ingredients);
};

var Plate = function(name, description, price, ingredients, isVegan, isGlutenFree, isCitrusFree){
  ServingItem.call(this, name, description, price, ingredients);
  this.isVegan = isVegan;
  this.isGlutenFree = isGlutenFree;
  this.isCitrusFree = isCitrusFree;
};

var Order = function(plates){
  this.plates = plates;
};

var Menu = function(plates){
  this.plates = plates;
};

var Restaurant = function(name, description, menu){
  this.name = name;
  this.description = description;
  this.menu = menu;
};

var Customer = function(dietaryPreference){
  this.dietaryPreference = dietaryPreference;
};

// Inherit the prototype from the Vehicle class
Drink.prototype = new ServingItem();

// Reset the constructor property back to the right class
Drink.prototype.constructor = Drink;


// Inherit the prototype from the Vehicle class
Plate.prototype = new ServingItem();

// Reset the constructor property back to the right class
Plate.prototype.constructor = Plate;


Drink.prototype.toString = function(){
  console.log(this.name, this.description, this.price, this.ingredients);
};

Plate.prototype.toString = function(){
  console.log(this.name, this.description, this.price, this.ingredients);
};

Order.prototype.toString = function(){
  console.log(this.plates);
};

Menu.prototype.toString = function(){
  console.log(this.plates);
};

Restaurant.prototype.toString = function(){
  console.log(this.name, this.description, this.menu);
};

var water = new Drink('water', 'so refreshing', 0, 'H2O');
var beer = new Drink('IPA', 'will get you loaded', 5.5, 'barley, hops, water');
var tamales = new Plate('Tamales', 'corn and steamed', 8.25, 'corn, tomatoes, cheese, pork', true, false, true);
var quacemole = new Plate('Guac Salad', 'chips and guac as you like', 6, 'corn chips, avocados, salt, salsa', false, true, false);
var order1 = new Order([water, tamales]);
var menu1 = new Menu([water, beer, tamales, quacemole]);
var newRest = new Restaurant('La Ciesta', 'just great food and better people', menu1);

water.toString();
tamales.toString();
order1.toString();
menu1.toString();
newRest.toString();