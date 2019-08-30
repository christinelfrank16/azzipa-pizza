# Azzip's Pizza Parlor

#### An application where one can order pizza from Azzip's Pizza Parlor, 30-Aug-2019

#### By Christine Frank

## Description

This application provides the user fields to create their own pizza by selecting size and pizza toppings. Throughout the order process, the order selections and cost are updated and shown to the user. Once the order is submitted, the user can then see their order status as the pizza is made by Azzip's Pizza Parlor and ready for virtual pick-up.

## Setup/Installation Requirements

#### View Hosted Site
* Go to: (N/A - to be updated)

#### View a local version of this Site
* Clone this repository
* At the local repository, copy the full path of the index.html file
* Open a new web browser
* Paste the copied path into the browser

## Known Bugs

* No known bugs at this time

## Support and contact details

* Email: christine.braun13@gmail.com
* LinkedIn: https://www.linkedin.com/in/christine-frank/

## Application Specifications

#### General

| Behavior | Input | Output|
|:-------|:------:|:------:|
| The application displays the submitted pizza order details when the user to adds a pizza to their order | Submit Pizza | Order displays committed pizza selections (size, sauce, toppings)|
| The application displays the pizza cost when the user to adds a pizza to their order | Submit Pizza | Order displays committed pizza selections and pizza cost|
| The application displays the order total when the user to adds a pizza to their order | Submit Pizza | Order displays pizza selections, pizza cost and order total|
| The application calculates pizza cost based on pizza size, topping type and count | Submit Pizza (small, 3 toppings and 1 premium topping) | Order displays cost based on pizza selections |
| The application displays subsequent pizza selections and pizza cost when the user adds additional pizzas to their order | Submit nth Pizza | Order displays all pizza selections, cost breakdown per pizza|
| The application updates the total order cost when the user adds additional pizzas to their order | Submit nth Pizza | Order displays updated order total, and all pizza selections and cost breakdown per pizza|
| The application displays order status when the user commits their order | Submit Order | Order status displays and updates over time |
| The application uses "Making Pizza", "Baking Pizza", "Packing Pizza", "Ready for Pickup" statuses, in that order, when displaying order status | Submit Order | Order status displays and updates over status values |

#### Details

| Behavior | Input | Output|
|:-------|:------:|:------:|
| The application displays pizza size and topping options to user at page load | Open Website | Order displays pizza options |
| The application defaults to a large pizza size selection, red sauce and cheese topping | Open Website | Pizza options displayed with default values selected |
| The application prevents multiple pizza size selections for a single pizza and updates to latest size selection | Select other pizza size | Selection from previous size removed and displays latest selection |
| The application prevents multiple pizza sauce selections for a single pizza and updates to latest size selection | Select other pizza sauce | Selection from previous sauce removed and displays latest selection |
| The application allows one pizza topping selection for a single pizza | Select topping | Topping selection displayed |
| The application allows multiple pizza topping selections for a single pizza | Select new topping | Previous topping selections maintained, latest selection displayed |



## Technologies Used

* JavaScript
  * jQuery

### License

*This application is licensed under the MIT license*

Copyright (c) 2016 **Christine Frank**
