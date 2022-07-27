// ? /////////////////////////////////////////////////////////////////////////////////////
// ? /////////////// SELECT ALL COLORS OF THE SAME COLOR FROM COLUMN /////////////////////
// ? /////////////////////////////////////////////////////////////////////////////////////
let allRed = document.querySelector(".allRed");
let allGreen = document.querySelector(".allGreen");
let allBlue = document.querySelector(".allBlue");
let allPurple = document.querySelector(".allPurple");
let allBrown = document.querySelector(".allBrown");
let allYellow = document.querySelector(".allYellow");
let allOrange = document.querySelector(".allOrange");
let allSilver = document.querySelector(".allSilver");
let iClickedYou = 0;

// * ADD EVENTS ON ALL COLORS FUNCITON
addEventForColorSelected();

// * RED COLORS
function allRedSelected() {
    checkToSelectOrDelete(this, 0, 6, 'redFull', allRed, 'red');
}

// * GREEN COLORS
function allGreenSelected() {
    checkToSelectOrDelete(this, 6, 12, 'greenFull', allGreen, 'green');
}

// * BLUE COLORS
function allBlueSelected() {
    checkToSelectOrDelete(this, 12, 18, 'blueFull', allBlue, 'blue');
}

// * PURPLE COLORS
function allPurpleSelected() {
    checkToSelectOrDelete(this, 18, 24, 'purpleFull', allPurple, 'purple');
}

// * BROWN COLORS
function allBrownSelected() {
    checkToSelectOrDelete(this, 24, 30, 'brownFull', allBrown, 'brown');
}

// * YELLOW COLORS
function allYellowSelected() {
    checkToSelectOrDelete(this, 30, 36, 'yellowFull', allYellow, 'yellow');
}

// * ORANGE COLORS
function allOrangeSelected() {
    checkToSelectOrDelete(this, 36, 42, 'orangeFull', allOrange, 'orange');
}

// * SILVER COLORS
function allSilverSelected() {
    checkToSelectOrDelete(this, 42, 48, 'silverFull', allSilver, 'silver');
}

// * ADD EVENT ON CLICK FOR ALL COLUMNS THE SAME COLOR
function addEventForColorSelected() {
    allRed.addEventListener("click", allRedSelected);
    allGreen.addEventListener("click", allGreenSelected);
    allBlue.addEventListener("click", allBlueSelected);
    allPurple.addEventListener("click", allPurpleSelected);
    allBrown.addEventListener("click", allBrownSelected);
    allYellow.addEventListener("click", allYellowSelected);
    allOrange.addEventListener("click", allOrangeSelected);
    allSilver.addEventListener("click", allSilverSelected);
}