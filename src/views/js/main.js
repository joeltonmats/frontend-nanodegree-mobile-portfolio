/**
 * Useful article for this bug fix: https://www.html5rocks.com/en/tutorials/speed/animations/
 */


/*all mode and switch methods put in model.js*/

// Capitalizes first letter of each word
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
  var adjectives = getAdj(adj);
  var nouns = getNoun(noun);
  var randomAdjective = parseInt(Math.random() * adjectives.length);
  var randomNoun = parseInt(Math.random() * nouns.length);
  var name = "The " + adjectives[randomAdjective].capitalize() + " " + nouns[randomNoun].capitalize();
  return name;
}

// Chooses random adjective and random noun
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function () {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
};

var selectRandomNonMeat = function () {
  var randomNonMeat = pizzaIngredients.nonMeats[Math.floor((Math.random() * pizzaIngredients.nonMeats.length))];
  return randomNonMeat;
};

var selectRandomCheese = function () {
  var randomCheese = pizzaIngredients.cheeses[Math.floor((Math.random() * pizzaIngredients.cheeses.length))];
  return randomCheese;
};

var selectRandomSauce = function () {
  var randomSauce = pizzaIngredients.sauces[Math.floor((Math.random() * pizzaIngredients.sauces.length))];
  return randomSauce;
};

var selectRandomCrust = function () {
  var randomCrust = pizzaIngredients.crusts[Math.floor((Math.random() * pizzaIngredients.crusts.length))];
  return randomCrust;
};

var ingredientItemizer = function (string) {
  return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function () {
  var pizza = "";

  var numberOfMeats = Math.floor((Math.random() * 4));
  var numberOfNonMeats = Math.floor((Math.random() * 3));
  var numberOfCheeses = Math.floor((Math.random() * 2));

  for (var i = 0; i < numberOfMeats; i++) {
    pizza = pizza + ingredientItemizer(selectRandomMeat());
  }

  for (var j = 0; j < numberOfNonMeats; j++) {
    pizza = pizza + ingredientItemizer(selectRandomNonMeat());
  }

  for (var k = 0; k < numberOfCheeses; k++) {
    pizza = pizza + ingredientItemizer(selectRandomCheese());
  }

  pizza = pizza + ingredientItemizer(selectRandomSauce());
  pizza = pizza + ingredientItemizer(selectRandomCrust());

  return pizza;
};

// returns a DOM element for each pizza
var pizzaElementGenerator = function (i) {
  var pizzaContainer,             // contains pizza title, image and list of ingredients
    pizzaImageContainer,        // contains the pizza image
    pizzaImage,                 // the pizza image itself
    pizzaDescriptionContainer,  // contains the pizza title and list of ingredients
    pizzaName,                  // the pizza name itself
    ul;                         // the list of ingredients

  pizzaContainer = document.createElement("div");
  pizzaImageContainer = document.createElement("div");
  pizzaImage = document.createElement("img");
  pizzaDescriptionContainer = document.createElement("div");

  pizzaContainer.id = "pizza" + i;
  pizzaContainer.classList.add("randomPizzaContainer");

  pizzaImageContainer.classList.add("col-md-6");

  pizzaImage.src = "images/pizza.png";
  pizzaImage.classList.add("img-responsive");
  pizzaImage.classList.add("pizzaSize");
  pizzaImage.classList.add("pizzaMedium");
  pizzaImageContainer.appendChild(pizzaImage);
  pizzaContainer.appendChild(pizzaImageContainer);

  /*pizzaDescriptionContainer.style.width="65%";*/
  pizzaDescriptionContainer.classList.add("col-md-6");

  pizzaName = document.createElement("h4");
  pizzaName.innerHTML = randomName();
  pizzaDescriptionContainer.appendChild(pizzaName);

  ul = document.createElement("ul");
  ul.innerHTML = makeRandomPizza();
  pizzaDescriptionContainer.appendChild(ul);
  pizzaContainer.appendChild(pizzaDescriptionContainer);

  return pizzaContainer;
};

/***** CODE UPDATED FROM RESIZE *****/

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function (size) {
  window.performance.mark("mark_start_resize");   // User Timing API function

  var pizzaRandomDiv = document.getElementById("randomPizzas");
  var pizzaRandomImg = document.getElementsByClassName("pizzaSize");

  function defineRightImgClass(classString) {
    for (var i = 0; i < pizzaRandomImg.length; i++) {
      pizzaRandomImg[i].className = "img-responsive pizzaSize " + classString;
    }
  }

  // We are update the class of the pizza container
  // then using CSS classes to actually resize the pizzas themself with a #id.class .class {} selector
  switch (size) {
    case "1":
      document.getElementById("pizzaSize").innerHTML = "Small"; // Changed from querySelector to much faster getElementByID - http://jsperf.com/getelementbyid-vs-queryselector/137
      pizzaRandomDiv.className = "row smallPizzas"; // using instead of add and remove class for faster operations. Usually would add/remove classes.
      defineRightImgClass("pizzaSmall");
      break;
    case "2":
      document.getElementById("pizzaSize").innerHTML = "Medium";
      pizzaRandomDiv.className = "row mediumPizzas";
      defineRightImgClass("pizzaMedium");
      break;
    case "3":
      document.getElementById("pizzaSize").innerHTML = "Large";
      pizzaRandomDiv.className = "row largePizzas";
      defineRightImgClass("pizzaLarge");
      break;
    default:
      console.log("bug in changeSliderLabel");
  }

  // User Timing API is awesome
  window.performance.mark("mark_end_resize");
  window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
  var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
  console.log("Time to resize pizzas: " + timeToResize[timeToResize.length - 1].duration + "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
var pizzasDiv = document.getElementById("randomPizzas");
for (var i = 2; i < 100; i++) {
  pizzasDiv.appendChild(pizzaElementGenerator(i));
}

// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
  var numberOfEntries = times.length;
  var sum = 0;
  for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
    sum = sum + times[i].duration;
  }
  console.log("Average scripting time to generate last 10 frames: " + sum / 10 + "ms");
}

/***** CODE UPDATED FROM SCROLL *****/

// initialize for the latest scroll position and mark
var latestScrollY = 0;
var mark = false;
var mPizzas = document.getElementById("movingPizzas1");

// calls requestAnimationFrame
function requestMark() {
  if (!mark) {
    window.requestAnimationFrame(updatePositions);
  }
  mark = true;
}

// runs updatePositions on scroll
function onScroll() {
  latestScrollY = window.scrollY;
  requestMark();
};

window.addEventListener('scroll', onScroll, false);

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
  frame++;
  window.performance.mark("mark_start_frame");

  var phase = [];
  var scrollY = latestScrollY / 1250;

  for (var i = 0; i < 5; i++) {
    phase.push(Math.sin(scrollY + i) * 100);
  }

  for (var i = 0; i < window.items.length; i++) {
    window.items[i].style.transform = 'translateX(' + phase[i % 5] + 'px)';
  }

  window.mark = false;

  // User Timing API to the rescue again. Seriously, it's worth learning.
  // Super easy to create custom metrics.
  window.performance.mark("mark_end_frame");
  window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
  if (frame % 10 === 0) {
    var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
    logAverageFrame(timesToUpdatePosition);
  }
}

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function () {
  var cols = 8;
  var s = 256;
  var rows = screen.height / s;

  var totalPizzaBackground = Math.round(rows * cols);
  var elem;

  for (var i = 1; i <= totalPizzaBackground; i++) {
    elem = document.createElement('img');
    elem.className = 'mover';
    elem.src = "images/pizza.png";
    elem.style.height = "100px";
    elem.style.width = "73.333px";
    elem.style.left = (i % cols) * s + 'px';
    elem.style.top = (Math.floor(i / cols) * s) + 'px';
    mPizzas.appendChild(elem);
  }

  window.items = document.getElementsByClassName('mover');
  window.requestAnimationFrame(updatePositions);
});
