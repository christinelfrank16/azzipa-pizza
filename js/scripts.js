///////// Back End /////////
///////// Pizza /////////
function Pizza(pizzaSize, pizzaSauce, useXtraSauce, pizzaToppings, premiumToppings) {
  this.size = pizzaSize,
  this.sauce = pizzaSauce,
  this.xtraSauce = useXtraSauce,
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
  if(sauce === "None"){
    this.costBreakDown[1] = 0;
  } else {
    this.costBreakDown[1] = 1;
    if (this.xtraSauce){
      this.costBreakDown[1] = 2;
    }
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

Pizza.prototype.calcTotalCost = function(){
  this.addSizeCost();
  this.addSauceCost();
  this.addToppingCost();
  this.addPremiumCost();

  var cost = 0;
  this.costBreakDown.forEach(function(itemCost){
    cost += itemCost;
  })
  this.cost = cost;
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

Order.prototype.updateTotal = function(){
  var total = 0;
  this.order.forEach(function(pizza){
    total += pizza.cost;
  });
  this.total = total.toFixed(2);
  return this.total;
}


///////// Front End /////////
var count = 0;
var currentPercent=0;

$(document).ready(function(){
  var order = new Order();

  attachPizzaRemoveListeners(order);
  $("#price").text(order.total);

  $("#ordinary").click(function(){
    $(".for-the-ordinary").show();
    $("#weird").show();
  });

  $("#weird").click(function(){
    $(".for-the-ordinary").hide();
    $("#weird").hide();
  });

  $("#show-options").click(function(){
    $("#select-pizza").modal("show");
  });

  $("#submit-order").click(function(){
    updateStatusModal(order);
    $("#status").modal("show");
  });

  $("#selections").submit(function(event){
    event.preventDefault();

    var selections = getFormVals();
    var newPizza = makePizza(selections);
    order.addPizza(newPizza);
    $("#select-pizza").modal("hide");
    order.updateTotal();
    displayOrder(order);
  });

  $("#select-pizza").on("hidden.bs.modal", function () {
    $(".for-the-ordinary").hide();
    $("#weird").hide();
    if($('#selections')[0]){
      $('#selections')[0].reset();
    }
  });


  $("#tester").click(function(){

    // return setInterval(function() { drawArc(testCanvas, currentPercent, percent, count);}, 30);
    window.requestAnimationFrame(drawArc);
    //drawArc(testCanvas, currentPercent, percent, count);

    console.log("After function: " + currentPercent);

  });

});

function updateStatusModal(order){
  var modalBody = $("#status .modal-body");
  var statusHtml = ""
  if(!order.order.length){
    statusHtml = "<h5>Your order is empty</h5><h6>May we suggest a medium pizza with anchovy sauce, goat cheese and eggplant?</h6>";
  } else {
    statusHtml = "<div id=\"status-bar\">Test</div>";
  }
  modalBody.html(statusHtml);
}

function attachPizzaRemoveListeners(order){
  $("#pizzas").on("click", ".remove", function(event){
    order.removePizza(parseInt(event.target.closest(".card").id));
    order.updateTotal();
    displayOrder(order);
  });
}

function displayOrder(order){
  var pizzaOrder = $("#pizzas");
  var htmlPizzasToDisplay = "";
  if(order.order.length){
    order.order.forEach(function(pizza){
      htmlPizzasToDisplay += buildPizzaDisplay(pizza);
    });
  } else {
    htmlPizzasToDisplay = buildEmptyDisplay();
  }
  pizzaOrder.html(htmlPizzasToDisplay);
  $("#price").text(order.total);
}

function buildEmptyDisplay(){
  var html = `
    <div id="no-order" class="card">
      <div class="card-body">
        <div class="card-text"><strong>Click on Make a Pizza!</strong></div>
      </div>
    </div>
  `;
  return html;
}

function buildPizzaDisplay(pizzaItem){
  var markup = `
    <div id="$ID$" class="card">
      <div class="card-body">
        <button class="remove" type="button">X</button>
        <div class="row">
          <div class="col">
            <div class="card-text"><strong>Pizza Type</strong>:</div>
            <div class="card-text">$SIZE$</div>
            <div class="card-text">$SAUCE$</div>
            <div class="card-text">$XTRA$</div>
          </div>
          <div class="col">
            <div class="card-text"><strong>Toppings</strong>:</div>
            <ul>
              <li>TOPPINGS</li>
            </ul>
            <div class="card-text"><strong>Premiums</strong>:</div>
            <ul>
            <li>PREMIUM</li>
            </ul>
          </div>
        </div>
        <div class="card-text"><strong>Cost</strong>: $$COST$</div>
      </div>
    </div>
  `;

  markup = markup.replace("$ID$", pizzaItem.id);
  markup = markup.replace("$SIZE$", pizzaSizeToDisplay(pizzaItem.size));
  if(pizzaItem.sauce === "None"){
    markup = markup.replace("$SAUCE$", "No Sauce");
    markup = markup.replace("<div class=\"card-text\">$XTRA$</div>", "");
  } else {
    markup = markup.replace("$SAUCE$", pizzaItem.sauce);
    if(pizzaItem.xtraSauce){
      markup = markup.replace("$XTRA$", "Add Extra Sauce");
    } else {
      markup = markup.replace("<div class=\"card-text\">$XTRA$</div>", "");
    }
  }

  markup = markup.replace("<li>TOPPINGS</li>", makeToppingList(pizzaItem.toppings));
  markup = markup.replace("<li>PREMIUM</li>", makeToppingList(pizzaItem.premium));
  markup = markup.replace("$COST$", pizzaItem.cost.toFixed(2));

  return markup;
}

function pizzaSizeToDisplay(size){
  var sizeText = $("input:radio[value=" + size + "]")[0].nextSibling.textContent;
  return sizeText;
}

function makeToppingList(propArray){
  var listString = "";
  propArray.forEach(function(toppingItem){
    listString += "<li>" + toppingItem + "</li>";
  });
  if(!listString){
    listString = "None Selected";
  }
  return listString;
}


function makePizza(selections){
  //selections[0] -> size
  //selections[1] -> sauce
  //selections[2] -> xtra sauce
  //selections[3] -> toppings array
  //selections[4] -> premium array
  var pizza = new Pizza(selections[0], selections[1], selections[2], selections[3], selections[4]);
  pizza.calcTotalCost();

  return pizza;
}

function getFormVals(){
  var selections = [];

  var size = parseInt($("input:radio[name=size]:checked").val());
  var sauce = $("input:radio[name=sauce]:checked").val();
  var xtra = $("input:checkbox[name=sauce]").prop("checked");
  var toppings = getSelectionValues($("input:checkbox[name=topping]:checked").toArray());
  var premium = getSelectionValues($("input:checkbox[name=premium]:checked").toArray());

  selections.push(size);
  selections.push(sauce);
  selections.push(xtra);
  selections.push(toppings);
  selections.push(premium);

  return selections;
}

function getSelectionValues(groupArray){
  var selectionVals = groupArray.map(function(selection){
    var regexAll = /[A-Za-zéñ]/;
    var regexUpper = /[A-Z]/;
    var value = $(selection)[0].nextSibling.textContent;
    var cleanVal = "";
    for(var i=0; i<value.length;i++){
      if(regexUpper.test(value[i]) && i !== 0){
        cleanVal += " " + value[i];
      } else if(regexAll.test(value[i])){
        cleanVal += value[i];
      }
    }
    return cleanVal;
  });
  return selectionVals;
}

///// Referenced from https://instructobit.com/tutorial/16/Creating-an-animated-arc-in-Javascript ////////
function drawArc(){
  var testCanvas = $("#canvas1")[0].getContext("2d");
  testCanvas.fillStyle = "red";
  testCanvas.height=450;
  testCanvas.width=450;
  console.log("Entered arc");
  console.log("current percent: " + currentPercent);
  var percent=99.999999;
  x=225;
  y=225;
  radius=225;
  count++;

  testCanvas.beginPath();
  testCanvas.arc(x, y, radius, 0, 2*Math.PI, false);



  testCanvas.globalCompositeOperation = 'destination-out';

  if(currentPercent<percent){
    console.log("I did it again! " + count);
    currentPercent+=percent/20;
    console.log("increased percent: " + currentPercent);
    testCanvas.clearRect(0, 0, 150,150);
    testCanvas.beginPath();
    testCanvas.moveTo(x, y);
    testCanvas.arc(x, y, radius, 270*(Math.PI/180),(360* currentPercent /100 -90)*(Math.PI/180));
    testCanvas.fill();
    window.requestAnimationFrame(drawArc);
  }
}
