// * RESET PREVIOUS CHOICES
function resetBallSelection() {
    if (allPickedBalls.length) {
        removeBallsFromDom()
        for (let i = 0; i < ball.length; i++) {
            ball[i].classList.remove('redFull');
            ball[i].classList.remove('greenFull');
            ball[i].classList.remove('blueFull');
            ball[i].classList.remove('purpleFull');
            ball[i].classList.remove('brownFull');
            ball[i].classList.remove('yellowFull');
            ball[i].classList.remove('orangeFull');
            ball[i].classList.remove('silverFull');
        }
    }
    resetAllColorSelection()
    allPickedBalls.length = 0;
    allPickedBallsObjects.length = 0;
    doNotLetMeStart();
    console.log(allPickedBalls, 'resetAll');
}


// * VRATI BACKGROUND IZABRANA KOLONE NA TRANSPARENT
function resetAllColorSelection() {
    let allColors = [allRed, allBlue, allGreen, allPurple, allBrown, allYellow, allOrange, allSilver];
    for (let i = 0; i < allColors.length; i++) {
        allColors[i].style.background = "transparent";
    }
}


// * REMOVE COLORS TO BALLS AND ADD EVENTS TO ALL BALLS
function deColorizeBalls(fromNum, untilNum, colorFull, allColor) {
    for (let i = fromNum; i < untilNum; i++) {
        ball[i].classList.remove(colorFull);
        removeBallsFromDom();
    }
    allColor.style.background = "transparent";
    allPickedBalls.length = 0;
    doNotLetMeStart();
    console.log(allPickedBalls, 'deColorized');
}


// * ADD COLORS TO BALLS AND REMOVE EVENTS TO OTHER BALLS
function colorizeBalls(fromNum, untilNum, colorFull, allColor, color) {
    let counter = 0;
    resetBallSelection();
    for (var i = fromNum; i < untilNum; i++) {
        ball[i].className = "col-1 " + "ball " + "ball-look " + colorFull + ' ' + color;
        allColor.style.background = color;
        allPickedBalls.push(parseInt(ball[i].innerHTML));
        let oneColorBallsToPickedArea = document.createElement("div");
        let oneColorBallsToPickedArea2 = document.createElement("div");
        oneColorBallsToPickedArea.className = "ball " + "ball-look " + colorFull;
        oneColorBallsToPickedArea.innerHTML = allPickedBalls[counter];
        oneColorBallsToPickedArea2.className = "ball " + "ball-look " + colorFull;
        oneColorBallsToPickedArea2.innerHTML = allPickedBalls[counter];
        pickedBallsArea.appendChild(oneColorBallsToPickedArea);
        pickedBallsArea2.appendChild(oneColorBallsToPickedArea2);
        counter++;
    }
    letMeStart();
    console.log(allPickedBalls, 'colorized');
}


// * UKLONI SVE LOPTICE IZ DOMA (NodeList)
function removeBallsFromDom() {
    while (pickedBallsArea.firstChild && pickedBallsArea2.firstChild) {
        pickedBallsArea.removeChild(pickedBallsArea.firstChild);
        pickedBallsArea2.removeChild(pickedBallsArea2.firstChild);
    }
}


// * PROVERI DA LI JE KOLONA BOJA VEC CEKIRANA ILI NIJE I ODRADI LOGIKU
function checkToSelectOrDelete(self, fromNum, untilNum, colorFull, allColor, color) {
    myBackground = window.getComputedStyle(self).getPropertyValue("background");
    if (myBackground === 'rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box') {
        colorizeBalls(fromNum, untilNum, colorFull, allColor, color);
    } else {
        deColorizeBalls(fromNum, untilNum, colorFull, allColor);
    }
}


// * HANDLING COLORS ON RANDOM BUTTON
function addColor(randomBallToPickedArea, randomBallToPickedArea2, colorFull, counter) {
    allPickedBallsObjects[counter].classList.add(colorFull);
    randomBallToPickedArea.className = "ball " + "ball-look " + colorFull;
    randomBallToPickedArea.innerHTML = allPickedBalls[counter];
    randomBallToPickedArea2.className = "ball " + "ball-look " + colorFull;
    randomBallToPickedArea2.innerHTML = allPickedBalls[counter];
}


// * ENABLE BETTING
function letMeStart() {
    bet.focus();
    submit.style.background = "green";
    submit.style.color = "#fff";
    submit.addEventListener("click", startBowl);
}


// * DISABLE BETTING
function doNotLetMeStart() {
    submit.style.background = "#F0F0F0";
    submit.style.color = "#000";
    submit.removeEventListener("click", startBowl);
}


// * DISPLAY BALLS ON PICKED FRONT AREAS
function displayBallOnFront(self, childDivDOM, parentDivDOM, background, myBorder) {
    childDivDOM.style.background = background;
    childDivDOM.style.border = myBorder;
    childDivDOM.innerHTML = self.innerHTML;
    childDivDOM.className = "ball " + "ball-look";
    parentDivDOM.appendChild(childDivDOM);
}