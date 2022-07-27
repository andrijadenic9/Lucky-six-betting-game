// ? /////////////////////////////////////////////////////////////////////////////////////
// ? /////////////////// SELECT RANDOM BALLS - BIRAMO RANDOM LOPTICE /////////////////////
// ? /////////////////////////////////////////////////////////////////////////////////////
let randomBallsBtn = document.querySelector('[data-id="random-balls"]');
let allPickedBallsObjects = [];

randomBallsBtn.addEventListener("click", getRandomBalls);

function getRandomBalls() {
    resetBallSelection();

    // * make array copy from HTML collection
    let ballCopy = [...ball];
    // * obezbedjujemo da se sve random loptice biraju i resetujemo podesavanja loptica na pocetak
    allBalls = [...redBalls, ...greenBalls, ...blueBalls, ...purpleBalls, ...brownBalls, ...yellowBalls, ...orangeBalls, ...silverBalls];
    allPickedBalls.length = 0;
    allPickedBallsObjects.length = 0;

    // * PUSUJEM U AREJ 6 RANDOM BROJA
    for (var iterable = 0; iterable < 6; iterable++) {
        let rand = Math.floor(Math.random() * allBalls.length);
        allPickedBalls.push(allBalls[rand]);

        // * PRAVIM AREJA SA OBJEKTIMA KOJI CE BITI ONI OBJEKTI KOJI SU U AREJU RANDOM BROJEVA
        for (let j = 0; j < allBalls.length; j++) {
            if (allBalls[j] === allPickedBalls[iterable]) {
                allPickedBallsObjects.push(ballCopy[rand]);
            }
        }
        ballCopy.splice(rand, 1);
        allBalls.splice(rand, 1);
    }

    // * postavljamo odgovarajuci izgled random lopticama i ubacujemo ih na front
    for (let i = 0; i < allPickedBalls.length; i++) {
        let randomBallToPickedArea = document.createElement("div");
        let randomBallToPickedArea2 = document.createElement("div");

        if (
            allPickedBalls[i] == 1 ||
            allPickedBalls[i] == 9 ||
            allPickedBalls[i] == 17 ||
            allPickedBalls[i] == 25 ||
            allPickedBalls[i] == 33 ||
            allPickedBalls[i] == 41
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'redFull', i);
        } else if (
            allPickedBalls[i] == 2 ||
            allPickedBalls[i] == 10 ||
            allPickedBalls[i] == 18 ||
            allPickedBalls[i] == 26 ||
            allPickedBalls[i] == 34 ||
            allPickedBalls[i] == 42
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'greenFull', i);
        } else if (
            allPickedBalls[i] == 3 ||
            allPickedBalls[i] == 11 ||
            allPickedBalls[i] == 19 ||
            allPickedBalls[i] == 27 ||
            allPickedBalls[i] == 35 ||
            allPickedBalls[i] == 43
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'blueFull', i);
        } else if (
            allPickedBalls[i] == 4 ||
            allPickedBalls[i] == 12 ||
            allPickedBalls[i] == 20 ||
            allPickedBalls[i] == 28 ||
            allPickedBalls[i] == 36 ||
            allPickedBalls[i] == 44
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'purpleFull', i);
        } else if (
            allPickedBalls[i] == 5 ||
            allPickedBalls[i] == 13 ||
            allPickedBalls[i] == 21 ||
            allPickedBalls[i] == 29 ||
            allPickedBalls[i] == 37 ||
            allPickedBalls[i] == 45
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'brownFull', i);
        } else if (
            allPickedBalls[i] == 6 ||
            allPickedBalls[i] == 14 ||
            allPickedBalls[i] == 22 ||
            allPickedBalls[i] == 30 ||
            allPickedBalls[i] == 38 ||
            allPickedBalls[i] == 46
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'yellowFull', i);
        } else if (
            allPickedBalls[i] == 7 ||
            allPickedBalls[i] == 15 ||
            allPickedBalls[i] == 23 ||
            allPickedBalls[i] == 31 ||
            allPickedBalls[i] == 39 ||
            allPickedBalls[i] == 47
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'orangeFull', i);
        } else if (
            allPickedBalls[i] == 8 ||
            allPickedBalls[i] == 16 ||
            allPickedBalls[i] == 24 ||
            allPickedBalls[i] == 32 ||
            allPickedBalls[i] == 40 ||
            allPickedBalls[i] == 48
        ) {
            addColor(randomBallToPickedArea, randomBallToPickedArea2, 'silverFull', i);
        }

        // * postavljamo loptice na front
        pickedBallsArea.appendChild(randomBallToPickedArea);
        pickedBallsArea2.appendChild(randomBallToPickedArea2);
    }
    letMeStart();
}