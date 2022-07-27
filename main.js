// ? /////////////////////////////////////////////////////////////////////////////////////
// ? //////////////// MAKE AND DISPLAY ALL BALLS THROUGH JAVASCRIPT //////////////////////
// ? /////////////////////////////////////////////////////////////////////////////////////
let redBalls = [1, 9, 17, 25, 33, 41];
let greenBalls = [2, 10, 18, 26, 34, 42];
let blueBalls = [3, 11, 19, 27, 35, 43];
let purpleBalls = [4, 12, 20, 28, 36, 44];
let brownBalls = [5, 13, 21, 29, 37, 45];
let yellowBalls = [6, 14, 22, 30, 38, 46];
let orangeBalls = [7, 15, 23, 31, 39, 47];
let silverBalls = [8, 16, 24, 32, 40, 48];

displayAllBalls('1', redBalls, 'allRed', 'red');
displayAllBalls('2', greenBalls, 'allGreen', 'green');
displayAllBalls('3', blueBalls, 'allBlue', 'blue');
displayAllBalls('4', purpleBalls, 'allPurple', 'purple');
displayAllBalls('5', brownBalls, 'allBrown', 'brown');
displayAllBalls('6', yellowBalls, 'allYellow', 'yellow');
displayAllBalls('7', orangeBalls, 'allOrange', 'orange');
displayAllBalls('8', silverBalls, 'allSilver', 'silver');

function displayAllBalls(columnNumber, ballsArray, allColors, color) {
	let string = "";
	let column = document.querySelector(`[data-id="column-${columnNumber}"]`);
	let selectAll = `<div class="row"><div class="${allColors}"></div></div>`;

	for (let i = 0; i < ballsArray.length; i++) {
		string += `<div class="col-1 ball ball-look ${color}">${ballsArray[i]}</div>`;
	}
	column.innerHTML = string + selectAll;
}

// * VARIABLES
let ball = document.getElementsByClassName("ball");
let pickedBallsArea = document.querySelector(".picked-balls");
let pickedBallsArea2 = document.querySelector(".picked-balls2");
let bet = document.querySelector('[data-id="bet"]');
let submit = document.querySelector('[data-id="submit"]');
let betTable = document.querySelector(".bet-table");
let pullOutTable = document.querySelector(".pullout-table");
let answer = document.querySelector(".answer");
let drawingLoop;
let myBackground;
let myBorder;
let ballCounter = 0;
let allPickedBalls = [];
let clickedAtSameBall = [];
let allWinnerBalls = [];
let allBalls = [...redBalls, ...greenBalls, ...blueBalls, ...purpleBalls, ...brownBalls, ...yellowBalls, ...orangeBalls, ...silverBalls];
let pickBallsMin = 2; // ! MINIMUM DOZVOLJENIH LOPTICA ZA KLADJENJE
let pickBallsMax = 10; // ! MAXIMUM DOZVOLJENIH LOPTICA ZA KLADJENJE
let ballDrawingTime = 800; // ! BROJ SEKUNDI ZA KOJE CE DA SE IZVUCE SVAKA OD LOPTICA (IZRAZENO U MILISEKUNDAMA)

// * daj event svim lopticama
addEventOnAllBalls();

// * BALL SELECTION FUNCTION
function chooseBalls() {
	let choosenBall = parseInt(this.innerHTML);

	// * uzimamo background i border loptice
	myBackground = window.getComputedStyle(this).getPropertyValue("background");
	myBorder = window.getComputedStyle(this).getPropertyValue("border");

	// * dodeljujemo loptici odgovarajuci izgled
	for (let i = 0; i < redBalls.length; i++) {
		if (choosenBall === redBalls[i]) {
			this.classList.add("redFull");
		} else if (choosenBall === greenBalls[i]) {
			this.classList.add("greenFull");
		} else if (choosenBall === blueBalls[i]) {
			this.classList.add("blueFull");
		} else if (choosenBall === purpleBalls[i]) {
			this.classList.add("purpleFull");
		} else if (choosenBall === brownBalls[i]) {
			this.classList.add("brownFull");
		} else if (choosenBall === yellowBalls[i]) {
			this.classList.add("yellowFull");
		} else if (choosenBall === orangeBalls[i]) {
			this.classList.add("orangeFull");
		} else if (choosenBall === silverBalls[i]) {
			this.classList.add("silverFull");
		}
	}

	// * dodajemo odabrane loptice na front (pocetna strana)
	let addBallToPickedArea = document.createElement("div");
	displayBallOnFront(this, addBallToPickedArea, pickedBallsArea, myBackground, myBorder);

	// * dodajemo odabrane loptice na front (druga strana)
	let addBallToPickedArea2 = document.createElement("div");
	displayBallOnFront(this, addBallToPickedArea2, pickedBallsArea2, myBackground, myBorder);

	// * ukoliko je loptica na koju kliknemo vec selektovana izbaci je iz areja
	if (allPickedBalls.indexOf(choosenBall) !== -1) {
		let sameBall = allPickedBalls.indexOf(choosenBall);
		allPickedBalls.splice(sameBall, 1);

		// * reset all color selection background
		if (!allPickedBalls.length) {
			resetAllColorSelection();
		}

		// * vracamo duploj loptici stari izgled
		for (let i = 0; i < redBalls.length; i++) {
			if (choosenBall === redBalls[i]) {
				this.classList.remove("redFull");
			} else if (choosenBall === greenBalls[i]) {
				this.classList.remove("greenFull");
			} else if (choosenBall === blueBalls[i]) {
				this.classList.remove("blueFull");
			} else if (choosenBall === purpleBalls[i]) {
				this.classList.remove("purpleFull");
			} else if (choosenBall === brownBalls[i]) {
				this.classList.remove("brownFull");
			} else if (choosenBall === yellowBalls[i]) {
				this.classList.remove("yellowFull");
			} else if (choosenBall === orangeBalls[i]) {
				this.classList.remove("orangeFull");
			} else if (choosenBall === silverBalls[i]) {
				this.classList.remove("silverFull");
			}
		}

		// * izbacujemo lopticu na koju smo 2 puta kliknuli sa fronta
		pickedBallsArea.removeChild(pickedBallsArea.childNodes[sameBall]);
		pickedBallsArea.removeChild(pickedBallsArea.lastChild);
		pickedBallsArea2.removeChild(pickedBallsArea2.childNodes[sameBall]);
		pickedBallsArea2.removeChild(pickedBallsArea2.lastChild);
	} else {

		// * arej loptica sa kojima se kladimo, ubacujemo lopticu u arej
		allPickedBalls.push(choosenBall);
	}

	// * proverevam duzinu loptica kako bih podesio layout prikaza izabranih loptica
	if (allPickedBalls.length > 6) {
		pickedBallsArea.style.width = '375px';
		pickedBallsArea2.style.width = '356px';
		pickedBallsArea.style.flexWrap = 'wrap';
		pickedBallsArea2.style.flexWrap = 'wrap';
		pullOutTable.style.height = 'auto';
	} else {
		pickedBallsArea.style.width = 'fit-content';
		pickedBallsArea2.style.width = 'fit-content';
		pickedBallsArea.style.flexWrap = 'nowrap';
		pickedBallsArea2.style.flexWrap = 'nowrap';
		pullOutTable.style.height = '100vh';
	}

	// * ako je broj izabranih loptica dozvoljeni minimum ili veci, dozvoli kladjenje
	if (allPickedBalls.length >= pickBallsMin) {
		if (allPickedBalls.length === pickBallsMax) {
			for (let i = 0; i < ball.length; i++) {

				// * kada je broj izabranih loptica dozvoljeni maksimum, obrisi evente ostalim lopticama koje nisu odabrane --->
				if (allPickedBalls.indexOf(parseInt(ball[i].innerHTML)) === -1) {
					ball[i].removeEventListener("click", chooseBalls);
				}
			}
		} else {

			// * <--- u suprtnom vrati evente svim lopticama
			addEventOnAllBalls();
		}
		letMeStart();

		// * ako je broj izabranih loptica manji od dozvoljenog minimuma, zabrani kladjenje
	} else if (allPickedBalls.length < pickBallsMin) {
		doNotLetMeStart();
	}
}


// ? SVE PRAZNE LOPTICE KOJE CEKAJU DA SE IZVUKU
let emptyBalls = document.querySelectorAll(".empty-ball");

// * FUNKCIJA KOJA POKRECE IZVLACENJE, POKRECE SE NA SUBMIT DUGME
function startBowl() {

	betTable.style.display = "none";
	pullOutTable.style.display = "block";

	// * vracamo sve loptice allBalls areju jer smo prethodno na radnom izvlacenje izbacivali iz areja
	allBalls = [...redBalls, ...greenBalls, ...blueBalls, ...purpleBalls, ...brownBalls, ...yellowBalls, ...orangeBalls, ...silverBalls];

	let randomLuckyNum1 = Math.floor(Math.random() * emptyBalls.length);
	let randomLuckyNum2 = Math.floor(Math.random() * emptyBalls.length);

	// * dajemo "detelinu" odnosno dupliramo vrednost dobitka ukoliko izabrani broj izadje na loptici koja ima "detelinu"
	emptyBalls[randomLuckyNum1].style.outline = "dashed";
	emptyBalls[randomLuckyNum1].style.outlineOffset = "5px";
	emptyBalls[randomLuckyNum2].style.outline = "dashed";
	emptyBalls[randomLuckyNum2].style.outlineOffset = "5px";

	// * loop koji za "ballDrawingTime" vreme izvlaci lopticu po lopticu
	drawingLoop = setInterval(goodLuck, ballDrawingTime);
}

// ? GOOD LUCK - IZVLACANJE 35 LOPTICA
function goodLuck() {

	// * izvlacimo random lopticu i ubacujemo je u arej pobednickih loptica
	let randomNumber = Math.floor(Math.random() * allBalls.length);
	allWinnerBalls.push(allBalls[randomNumber]);

	// * random lopticama dajemo izgled
	for (let i = 0; i < redBalls.length; i++) {
		if (allBalls[randomNumber] === redBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "redFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === greenBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "greenFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === blueBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "blueFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === purpleBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "purpleFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === brownBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "brownFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === yellowBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "yellowFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === orangeBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "orangeFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		} else if (allBalls[randomNumber] === silverBalls[i]) {
			emptyBalls[ballCounter].className = "ball " + "ball-look " + "silverFull";
			emptyBalls[ballCounter].innerHTML = allBalls[randomNumber];
		}
	}

	for (let i = 0; i < allPickedBalls.length; i++) {
		if (allWinnerBalls.indexOf(allPickedBalls[i]) != -1) {

			// * oznacavamo samo dobitnicke loptice
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.boxShadow = "#000000eb 0px 0px 17px 4px";
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.fontSize = "25px";
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.fontWeight = "bold";
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.transform = "scale(1.2)";

			// * precrtavamo dobitnicke loptice
			pickedBallsArea2.children[i].style.backgroundImage = "url(redline.png)";
			pickedBallsArea2.children[i].style.backgroundPosition = "center";
			pickedBallsArea2.children[i].style.backgroundRepeat = "no-repeat";
			pickedBallsArea2.children[i].style.backgroundSize = "cover";
		}
	}

	// * izbacujemo random lopticu kako se ne bi ponavila i zakazujemo sledece izvlacenje
	allBalls.splice(randomNumber, 1);
	ballCounter++;

	// * kada izvucemo random 35 loptica zaustavljamo izvlacenje i proveravamo da li imamo pobednika
	if (ballCounter === 35) {
		clearInterval(drawingLoop);
		checkIfHaveWinner();
	}
}

// * PROVERAVAMO DA LI IMAMO POBEDNIKA I IZBACUJEMO REZULTAT IZVLACENJA
function checkIfHaveWinner() {
	let positionGain = [];
	let maxKvota;

	if (bet.value) {
		var betVal = parseInt(bet.value); // ? pretvaramo uplatu iz stringa u number
	} else {
		var betVal = 0;
	}

	for (let i = 0; i < allPickedBalls.length; i++) {

		// ? sve nase loptice uporedjujemo sa pobednickim lopticama i pusujemo ih u novi are.
		// ? ako se neka od naslih loptica ne nalazi u pobednickom areju, u novom areju ce se pustvati vrednost "-1"
		positionGain.push(allWinnerBalls.indexOf(allPickedBalls[i]));

		// ? proveravamo da li se medju izvucenim lopticama nalaze sve nase odabrane loptice
		if (positionGain.indexOf(-1) === -1) {

			// ? cuvamo poziciju na kojoj se nalazi poslednje izvucena loptica
			maxKvota = Math.max(...positionGain);

			// ? trazimo na koju kvotu je izvbucena nasa poslednja pobednicka loptica i u odnosu na to izracunavamo dobitak
			if (maxKvota === 5) {
				bet = betVal * 100000;
			} else if (maxKvota === 6) {
				bet = betVal * 10000;
			} else if (maxKvota === 7) {
				bet = betVal * 5000;
			} else if (maxKvota === 8) {
				bet = betVal * 2500;
			} else if (maxKvota === 9) {
				bet = betVal * 1000;
			} else if (maxKvota === 10) {
				bet = betVal * 500;
			} else if (maxKvota === 11) {
				bet = betVal * 300;
			} else if (maxKvota === 12) {
				bet = betVal * 200;
			} else if (maxKvota === 13) {
				bet = betVal * 150;
			} else if (maxKvota === 14) {
				bet = betVal * 100;
			} else if (maxKvota === 15) {
				bet = betVal * 80;
			} else if (maxKvota === 16) {
				bet = betVal * 60;
			} else if (maxKvota === 17) {
				bet = betVal * 40;
			} else if (maxKvota === 18) {
				bet = betVal * 30;
			} else if (maxKvota === 19) {
				bet = betVal * 20;
			} else if (maxKvota === 20) {
				bet = betVal * 15;
			} else if (maxKvota === 21) {
				bet = betVal * 14;
			} else if (maxKvota === 22) {
				bet = betVal * 13;
			} else if (maxKvota === 23) {
				bet = betVal * 12;
			} else if (maxKvota === 24) {
				bet = betVal * 11;
			} else if (maxKvota === 25) {
				bet = betVal * 10;
			} else if (maxKvota === 26) {
				bet = betVal * 9;
			} else if (maxKvota === 27) {
				bet = betVal * 8;
			} else if (maxKvota === 28) {
				bet = betVal * 7;
			} else if (maxKvota === 29) {
				bet = betVal * 6;
			} else if (maxKvota === 30) {
				bet = betVal * 5;
			} else if (maxKvota === 31) {
				bet = betVal * 4;
			} else if (maxKvota === 32) {
				bet = betVal * 3;
			} else if (maxKvota === 33) {
				bet = betVal * 2;
			} else if (maxKvota === 34) {
				bet = betVal * 1;
			}

			answer.style.display = "block";

			// ? proveravamo da li je uplacena suma i u odnosu na to izbacujemo poruku
			if (betVal === 0) {
				answer.style.background = "#0275d8";
			} else {
				answer.style.background = "#5cb85c";
			}

			for (let i = 0; i < ball.length; i++) {

				// ? proveravamo da li je neka od nasih loptica izvucena na mestu "deteline" (dupla sreca)
				if (ball[i].style.transform === "scale(1.2)" && ball[i].style.outline === "dashed") {

					// ? proveravamo da li je uplacena suma i u odnosu na to izbacujemo poruku
					betVal === 0 ? answer.innerHTML = "Vase loptice su izvucene, cak ste izvukli duplu srecu! Na zalost, niste uplatili opkladu. Sledeci put ne budi cicija :)" : answer.innerHTML = "Cestitamo sreca je na Vasoj strani, duplirali ste svoj dobitak. Osvojili ste " + bet * 2 + " dinara";

					// ? ako su nase loptice izvucene ali ni jedna nije izvucena na mestu "deteline" (dupltu sreca)
				} else if (ball[i].style.transform === "scale(1.2)" && ball[i].style.outline !== "dashed") {

					// ? proveravamo da li je uplacena suma i u odnosu na to izbacujemo poruku
					betVal === 0 ? answer.innerHTML = "Vase loptice su izvucene! Na zalost, niste uplatili opkladu. Sledeci put ne budi cicija :)" : answer.innerHTML = "Cestitamo osvojili ste " + bet + " dinara";
				}
			}
		} else {

			// ? ako nisu izvucene sve nase izabrane loptice prikazi poruku
			answer.style.display = "block";
			answer.innerHTML = "Vase izabrane loptice nisu izvucene, pokusajte ponovo.";
			answer.style.background = "#d9534f";
		}
	}
}

// * ADD EVENT ON ALL BALLS
function addEventOnAllBalls() {
	for (let i = 0; i < ball.length; i++) {
		ball[i].addEventListener("click", chooseBalls);
	}
}
