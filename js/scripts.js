///////// Back End /////////
///////// Pizza /////////
function Pizza(pizzaSize, pizzaSauce, pizzaToppings, premiumToppings) {
  this.size = pizzaSize,
  this.sauce = pizzaSauce,
  this.toppings = pizzaToppings,
  this.premium = premiumToppings,
  this.costBreakDown = [0,0,0,0]
  this.cost = 0
}

Pizza.prototype.addSizeCost = function(){
  var size = this.size;
  if(size === 10){
    this.costBreakDown[0] = 2;
  } else if (size === 18){
    this.costBreakDown[0] = 3;
  } else {
    this.costBreakDown[0] = 5;
  }
}

Pizza.prototype.addSauceCost = function(){
  var sauce = this.sauce;
  if(sauce === "none"){
    this.costBreakDown[1] = 0;
  } else if (sauce.includes("xtra")){
    this.costBreakDown[1] = 2;
  } else {
    this.costBreakDown[1] = 1;
  }
}

Pizza.prototype.addToppingCost = function(){
  var toppingsCount = this.toppings.length;
  if(toppingsCount < 5){
    this.costBreakDown[2] = toppingsCount*0.5;
  } else if(toppingsCount < 9){
    this.costBreakDown[2] = toppingsCount*0.75;
  } else {
    this.costBreakDown[2] = (8*0.75) + (toppingsCount-8);
  }
}

Pizza.prototype.addPremiumCost = function(){
  var premToppingsCount = this.premium.length;
  this.costBreakDown[3] = premToppingsCount;
}

///////// Order /////////
function Order(){
  this.order = [],
  this.currentId = 0,
  this.total = 0
}

Order.prototype.assignId = function(){
  this.currentId++;
  return this.currentId;
}

Order.prototype.addPizza = function(pizza){
  pizza.id = this.assignId();
  this.order.push(pizza);
}

Order.prototype.removePizza = function(id){
  for(var i = 0; i < this.order.length; i++){
    if(this.order[i].id === id){
      var index = this.order.indexOf(this.order[i]);
      this.order.splice(index, 1);
    }
  }
}
