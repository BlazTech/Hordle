let listOfRows = [];
let rowNumber = 0;
const abc = "abcčćdđefghijklmnoprsštuvzžABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";
let string = "";
let win;

//random broj od 0 do max
function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

//odabir glavne riječi
let mainWord = listOfWords[randomInt(listOfWords.length - 1)];

//dodavanje redova objekata kvadrata u listOfRows
let tempList = [];
for (let i=0; i < 30; i++ ) {
    let square = document.querySelector("#c" + String(i));
    tempList.push(square);

    if (tempList.length >= 5) {
        listOfRows.push(tempList);
        tempList = [];
    }
}

//pregledavanje inputa, dodavanje slova u string i brisanje
function inputCheck(event) {
    let key = event.key;
    if (abc.includes(key)) {
        if (string.length < 5) {
            string += key.toLowerCase();
            updateDisplay();
        }
    } else if (key == "Backspace") {
        string = string.slice(0, string.length - 1);
        updateDisplay();
    } else if (key == "Enter") {
        if (string.length == 5) {
            checkWord();
        }
    }
}

//funkcija za obnavljanje slova u kvadratima
function updateDisplay() {
    for (let i=0; i < 5; i++) {
        if (i < string.length) {
            listOfRows[rowNumber][i].innerText = string[i].toUpperCase();
        } else {
            listOfRows[rowNumber][i].innerText = "";
        }
    }
}

//alert funkcije
function alertWin() {
    alert("POBJEDA!" + "\nREFRESH ZA NOVU RIJEČ");
}
function alertLose() {
    alert("IZGUBIO SI, GLAVNA RIJEČ JE " + mainWord.toUpperCase() + "!" + "\nREFRESH ZA NOVU RIJEČ");
}

//provjera rijeci, bojanje
function checkWord() {
    let stringLetters = string.split("");
    let mainWordLetters = mainWord.split("");

    if (listOfWords.includes(string)) {
        //provjera slova na istom mjestu i slova koja nedostaju
        for (let i=0; i < 5; i++) {
            if (mainWord.includes(string[i])) {
                if (mainWord[i] == string[i]) {
                    stringLetters[i] = "0";
                    mainWordLetters[i] = "1";
                    listOfRows[rowNumber][i].style.background = "#1eb042";
                } 
            } else {
                listOfRows[rowNumber][i].style.background = "#707070";
            }
        }
        //provjera slova koja su prisutna, ali na različitom mjestu
        for (let i=0; i < 5; i++) {
            if (mainWordLetters.includes(stringLetters[i])) {
                mainWordLetters[mainWordLetters.indexOf(stringLetters[i])] = "1";
                listOfRows[rowNumber][i].style.background = "#deaa1b";
            } else if (stringLetters[i] !== "0"){
                listOfRows[rowNumber][i].style.background = "#707070";
            }
        }

        rowNumber += 1;
        if (string == mainWord) {
            win = true;
        } else if (rowNumber > 5) {
            win = false;
        }

        if (win) {
            setTimeout(alertWin, 300);
        } else if (win == false) {
            setTimeout(alertLose, 300);
        }

        string = "";
    } else {
        alert("RIJEČ NIJE PRONAĐENA!");
    }
}

document.addEventListener("keydown", inputCheck);