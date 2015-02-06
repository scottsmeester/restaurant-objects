
// Part 1

var Fooditem = function(name, calories, vegan, glutenFree, citusFree){
  this.name = name;
  this.calories = calories;
  this.vegan = vegan;
  this.glutenFree = glutenFree;
  this.citusFree = citusFree;
};

Fooditem.prototype.toString = function(){
  // console.log('name:', this.name, 'calories:', this.calories, 'vegan:', this.vegan, 'glutenFree:', this.glutenFree, 'citusFree:', this.citusFree);
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
  this.id = _.uniqueId('item-');
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
  this.order = [];
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

// Drink.prototype.toString = function(){
//   console.log(this.name, this.description, this.price, this.ingredients);
// };

Drink.prototype.render = function(){
  this.$el = $('#drink-template')
  .clone().attr('id', '').attr('data-id', this.id);

  this.$el.find('.itemName').text(this.name);
  this.$el.find('.itemDesc').text(this.description);
  this.$el.find('.itemPrice').text(this.price);
  this.$el.find('.itemIngredients').text(this.ingredients);

  return this.$el;
};

// Inherit the prototype from the Vehicle class
Plate.prototype = new ServingItem();

// Reset the constructor property back to the right class
Plate.prototype.constructor = Plate;

Plate.prototype.render = function(){
  this.$el =  $('#plate-template')
  .clone().attr('id', '').attr('data-id', this.id);

  this.$el.find('.itemName').text(this.name);
  this.$el.find('.itemDesc').text(this.description);
  this.$el.find('.itemPrice').text(this.price);
  this.$el.find('.itemIngredients').text(this.ingredients);
  this.$el.find('.dietaryInfo').text('Vegan? ' + this.isVegan
   + " Gluten free? " + this.isGlutenFree 
   + " Citrus free? " + this.isCitrusFree);
  this.$el.data('plate', this);
  return this.$el;
};

// method for rendering menu
Menu.prototype.render = function(){

// console.log(this);

  // this.Menu.map(function()
  this.$el =  $('#menu-template')
  .clone().attr('id', '');

  this.$el.find('.restName').text(newRest.name);
  this.$el.find('.restDesc').text(newRest.description);

  // this.$el.find('.itemName').text(this.name);
    this.$el.append(this.plates.map(function(plate){
      return plate.render();
    }));
    // console.log(myObj.constructor.name);
  return this.$el;
};


Order.prototype.render = function(){
  
  // console.log(this);
  this.$el =  $('#orderDetails')
  .clone().attr('id', '');

  this.order = this.order.concat([].slice.call(arguments));

  this.$el.append(this.order.map(function(item){
    // console.log(item.price);
    return item.render();
  }));

  return this.$el;
};
/**
 * add up total of plates ordered
 * @return {string} something I can use to display 
 */
Order.prototype.orderTotal = function(){


};

var water = new Drink('Water', 'so refreshing', 0, 'H2O');
var beer = new Drink('IPA', 'will get you loaded', 5.5, 'barley, hops, water');
var tamales = new Plate('Tamales', 'corn and steamed', 8.25, 'corn, tomatoes, cheese, pork', true, false, true);
var quacemole = new Plate('Guac Salad', 'chips and guac as you like', 6, 'corn chips, avocados, salt, salsa', false, true, false);
var order1 = new Order([]);
var menu1 = new Menu([water, beer, tamales, quacemole]);
var newRest = new Restaurant('La Ciesta', 'Great food and better people', menu1);

$(document).on('ready', function(){
 $('#menu-template').append(menu1.render());
 $('button').click(function(){
    // console.log($(this).closest('.menuItem').attr('data-id'));
    // $('#orderDetails h2').css('display', 'block');
    var thisID = $(this).closest('.menuItem').attr('data-id');
    var item = _.find(menu1.plates, function(i){
    return i.id === thisID;
  });
  console.log(item.price);
  $('#orderDetails').empty().append(order1.render(item));
  // $('.yourOrder').css('display', 'block');
  // $('.yourOrder').empty().append(order1.orderTotal(item.price));
 });
});
