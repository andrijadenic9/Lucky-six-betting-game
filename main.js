// * //////////////////////////////////////////////////////////////////////////////////////
// * ////////////////////////////////// ANDRIJA DENIC - LUCKY SIX /////////////////////////
// * //////////////////////////////////////////////////////////////////////////////////////
// ? ///////////////////////////////////////////////////////////
// ? /////////////////// PRAVIM LOPTICE PUTEM JS-a /////////////
// ? ///////////////////////////////////////////////////////////
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

// * SELEKTUJEMO I PRAVIMO VARIJABLE
let ball = document.getElementsByClassName("ball");
let pickedBallsArea = document.querySelector(".picked-balls");
let pickedBallsArea2 = document.querySelector(".picked-balls2");
let bet = document.querySelector('[data-id="bet"]');
let submit = document.querySelector('[data-id="submit"]');
let betTable = document.querySelector(".bet-table");
let pullOutTable = document.querySelector(".pullout-table");
let answer = document.querySelector(".answer");
let myBackground;
let myBorder;
let ballCounter = 0;
let allPickedBalls = [];
let clickedAtSameBall = [];
let allWinnerBalls = [];
let allBalls = [...redBalls, ...greenBalls, ...blueBalls, ...purpleBalls, ...brownBalls, ...yellowBalls, ...orangeBalls, ...silverBalls];
// ! /////////////// CHOOSE HOW MANY BALLS YOU WANT AND HOW LONG IT TOOK TO GET ALL BALLS ///////////////
// ! /////////////// BIRAJ SA KOLIKO LOPTICA ZELIS DA SE KLADIS I KOLIKO JE VREMENA POTREBNO DA SE SVE LOPTICE IZVUKU ///////////////
let pickBallsMin = 2;
let pickBallsMax = 10;
let ballDrawingTime = 20; // * // Izrazeno u milisekundama

// ? ADD EVENT ON ALL BALLS
for (let i = 0; i < ball.length; i++) {
	ball[i].addEventListener("click", chooseBalls);
}

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
	addBallToPickedArea.style.background = myBackground;
	addBallToPickedArea.style.border = myBorder;
	addBallToPickedArea.innerHTML = this.innerHTML;
	addBallToPickedArea.className = "ball " + "ball-look";
	pickedBallsArea.appendChild(addBallToPickedArea);

	// * dodajemo odabrane loptice na front (druga strana)
	let addBallToPickedArea2 = document.createElement("div");
	addBallToPickedArea2.style.background = myBackground;
	addBallToPickedArea2.style.border = myBorder;
	addBallToPickedArea2.innerHTML = this.innerHTML;
	addBallToPickedArea2.className = "ball " + "ball-look";
	pickedBallsArea2.appendChild(addBallToPickedArea2);

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

	// TODO ------------- poporaviti ovo
	// * proverevam duzinu loptica kako bih podesio layout prikaza izabranih loptica
	if (allPickedBalls.length > 5) {
		pickedBallsArea.style.width = '370px';
		pickedBallsArea2.style.width = '355px';
		pickedBallsArea.style.flexWrap = 'wrap';
		pickedBallsArea2.style.flexWrap = 'wrap';
		pickedBallsArea.style.marginBottom = '100px';
		pullOutTable.style.height = 'auto';
	} else {
		pickedBallsArea.style.width = 'fit-content';
		// pickedBallsArea2.style.width = 'fit-content';
		pickedBallsArea.style.flexWrap = 'nowrap';
		pickedBallsArea2.style.flexWrap = 'nowrap';
		pickedBallsArea.style.marginBottom = '20px';
		pullOutTable.style.height = '100vh';
	}

	// * /////// NA ODREDJENI BROJ LOPTICA BRISEMO KLIKTANJE I DOZVOLJAVAMO KLADJENJE ////////////
	if (allPickedBalls.length >= pickBallsMin) {
		letMeStart();
		if (allPickedBalls.length === pickBallsMax) {
			// TODO - REMOVE EVENT TREBA DA SE DESI SAMO NA LOPTICE KOJE NISU ODABRANE
			for (let i = 0; i < ball.length; i++) {
				ball[i].removeEventListener("click", chooseBalls);
			}
		}
	} else if (allPickedBalls.length < pickBallsMin) {
		doNotLetMeStart();
	}
}
// TODO - OVDE SAM STAO

// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ? ///////////////////////// START BOWL - POKRECEMO "KUGLU", PRAVIMO POLJA GDE IZLAZE LOPTICE /////////////////////////////
// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let emptyBalls = document.querySelectorAll(".empty-ball"); // HTML COLLECTION
function startBowl() {

	// * vracamo sve loptice allBalls areju jer smo prethodno na radnom izvlacenje izbacivali iz areja
	allBalls = [...redBalls, ...greenBalls, ...blueBalls, ...purpleBalls, ...brownBalls, ...yellowBalls, ...orangeBalls, ...silverBalls];

	betTable.style.display = "none";
	pullOutTable.style.display = "block";

	let randomLuckyNumber1 = Math.floor(Math.random() * emptyBalls.length);
	let randomLuckyNumber2 = Math.floor(Math.random() * emptyBalls.length);

	// * // DAJEMO "detelinu" ODNOSNO DUPLIRAMO VREDNOST DOBITKA UKOLIKO IZABRANI BROJ IZADJE NA RANDOM SRECNOM MESTU //
	emptyBalls[randomLuckyNumber1].style.outline = "dashed";
	emptyBalls[randomLuckyNumber1].style.outlineOffset = "5px";
	emptyBalls[randomLuckyNumber2].style.outline = "dashed";
	emptyBalls[randomLuckyNumber2].style.outlineOffset = "5px";

	// // * // PRETVARAMO IZABRANE LOPTICE U BROJEVE //
	// for (let i = 0; i < allPickedBalls.length; i++) {
	// 	// ? // PRETVARAMO SVE ODABRANE LOPTICE KOJE SU STRING U NUMBER KAKO BISMO UPOREDILI DA LI U IZBUCENIM LOPTICAMA POSTOJE SVE NASE ODABRANE LOPTICE //
	// 	// ! // OVO SMO MOGLI DA IZBEGNEMO TAKO STO BISMO GORE TO URADILI RANIJE - POGLEDATI PROSLI CRVENI KOMENTAR SA ZNAKOM UZVIKA //
	// 	// allPickedBallsNumbers = allPickedBalls.map(Number);
	// 	allPickedBallsNumbers.push(parseInt(allPickedBalls[i].innerHTML));
	// }

	// * /////////// RANDOM BIRAMO LOPTICE I DOBIJENE LOPTICE BOJIMO ONAKO KAKO SU ODABRANE /////////////
	startGoodLuck();
}

// ! ///////////////////////////////////////////////////////////////////////////
let loop;
function startGoodLuck() {
	loop = setInterval(goodLuck, ballDrawingTime); // ! // NE UMEM DA ZAUSTAVIM LOOP //
	// return loop;
}
// ! ///////////////////////////////////////////////////////////////////////////

// ? /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ? ///////////////////////// GOOD LUCK - IZVLACIMO 35 LOPTICA, BOJIMO IH I OZNACAVAMO DOBIJENE LOPTICE /////////////////////////////
// ? /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function goodLuck() {
	// * ////////// SVE POBEDNICKE LOPTICE KOJE SU RANDOM ODABRANE /////////
	let randomNumber = Math.floor(Math.random() * allBalls.length);
	allWinnerBalls.push(allBalls[randomNumber]);

	for (let i = 0; i < allPickedBalls.length; i++) {
		if (allWinnerBalls.indexOf(allPickedBalls[i]) != -1) {
			// * //////// OZNACAVAMO SAMO DOBITNICKE LOPTICE ///////////////////
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.boxShadow = "#000000eb 0px 0px 17px 4px";
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.fontSize = "25px";
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.fontWeight = "bold";
			emptyBalls[allWinnerBalls.indexOf(allPickedBalls[i])].style.transform = "scale(1.2)";

			// * //////// PRECRTAVAMO DOBITNICKE LOPTICE ///////////////////
			pickedBallsArea2.children[i].style.backgroundImage = "url(redline.png)";
			pickedBallsArea2.children[i].style.backgroundPosition = "center";
			pickedBallsArea2.children[i].style.backgroundRepeat = "no-repeat";
			pickedBallsArea2.children[i].style.backgroundSize = "cover";
		}
	}

	// * /////////// RANDOM BIRAMO LOPTICE I DOBIJENE LOPTICE BOJIMO ONAKO KAKO SU ODABRANE /////////////
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

	// * //////// IZBACUJEMO LOPTICE KOJE SU ODABRANE KAKO SE NE BI PONAVLJALE ISTE LOPTICE ///////////
	allBalls.splice(randomNumber, 1);
	ballCounter++;

	// * ////// KADA SE RANDOM ODABERU SVE LOPTICE PROVERAVAMO DA LI IMAMO DOBITAK ILI NE ///////////
	checkIfHaveWinner();
}

// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ? ///////////////////////// CHECK IF HAVE WINNER - PROVERAVAMO DA LI SU IZASLE ODABRANE LOPTICE //////////////////////
// ? ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function checkIfHaveWinner() {
	if (ballCounter === 35) {
		// * ZAUSTAVLJAMO IZVLACENJE LOPTICA
		clearInterval(loop);

		let positionGain = [];
		let maxKvota;
		let betVal = parseInt(bet.value); // * // PRETVORILI SMO UPLATU IZ STRINGA U NUMBER //
		for (let i = 0; i < allPickedBalls.length; i++) {
			console.log(typeof allWinnerBalls.indexOf(allPickedBalls[i]), 'OVDE');
			positionGain.push(allWinnerBalls.indexOf(allPickedBalls[i]));
			console.log(positionGain, 'positionGain');

			maxKvota = Math.max(...positionGain); // * // U maxKvota SACUVAM NAJVECI BROJ ODNOSNI POZICIJU NA KOJOJ SMO DOBILI POSLEDNJU LOPTICU //
			console.log(maxKvota, 'KVOTA');

			if (positionGain.indexOf(-1) === -1) {
				// * // PROVERAVAMO KOJA JE KVOTA NA KOJU JE STALA POSLEDNJA DOBITNA LOPTICA I DOBIJAMO KONACAN IZNOS
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
				answer.style.background = "green";
				// * // PROVERAVAMO DA LI DOBIJENA KOMBINACIJA I DOBIJENA LOPTICA SE POKLAPA SA DUPLIOM SRECON "detelinom" //
				for (let i = 0; i < ball.length; i++) {
					if (ball[i].style.transform == "scale(1.2)" && ball[i].style.outline == "dashed") {
						answer.innerHTML = "Cestitamo sreca je na Vasoj strani, duplirali ste svoj dobitak. Osvojili ste " + bet * 2 + " dinara";
					} else if (ball[i].style.transform == "scale(1.2)" && ball[i].style.outline != "dashed") {
						answer.innerHTML = "Cestitamo osvojili ste " + bet + " dinara";
					}
				}
			} else {
				answer.style.display = "block";
				answer.innerHTML = "Niste pogodili sve izabrane loptice, pokusajte ponovo.";
				answer.style.background = "tomato";
			}
		}
		// ? // OVO OTKOMENTARISI KAKO BI U CONSOLE VIDEO ODREDJENE BROJEVE VEZANE ZA ODABIR LOPTICA //
		// console.log(allPickedBalls + " Izabrani brojevi");
		// console.log(positionGain); // ? // najveci broj odasvde daj
		// console.log(maxKvota + " kvota");
		// console.log(bet + " bet - Konacni dobitak");
	}
}
