let lista_redova = [];
let string = "";
let brojReda = 0;
const abc = "abcčćdđefghijklmnoprsštuvzžABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";

let win;

//random broj od 0 do max
function randomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

let glavnaRijec = rijeci[randomInt(rijeci.length - 1)];

//dodavanje kvadrata u listu
let temp_lista = [];
for (let i=0; i < 30; i++ ) {
    let kvadrat = document.querySelector("#c" + String(i));
    temp_lista.push(kvadrat);

    if (temp_lista.length >= 5) {
        lista_redova.push(temp_lista);
        temp_lista = [];
    }
}

//pregledavanje inputa
function pregledInputa(event) {
    let znak = event.key;
    if (abc.includes(znak)) {
        if (string.length < 5) {
            string += znak.toLowerCase();
            updateDisplay();
        }
    } else if (znak == "Backspace") {
        string = string.slice(0, string.length - 1);
        updateDisplay();
    } else if (znak == "Enter") {
        if (string.length == 5) {
            checkWord();
        }
    }
}

//funkcija za obnavljanje ekrana
function updateDisplay() {
    for (let i=0; i < 5; i++) {
        if (i < string.length) {
            lista_redova[brojReda][i].innerText = string[i].toUpperCase();
        } else {
            lista_redova[brojReda][i].innerText = "";
        }
    }
}

//alert funkcije
function alertWin() {
    alert("POBJEDA!" + "\nREFRESH ZA NOVU RIJEČ");
}
function alertLose() {
    alert("IZGUBIO SI, GLAVNA RIJEČ JE " + glavnaRijec.toUpperCase() + "!" + "\nREFRESH ZA NOVU RIJEČ");
}

//provjera rijeci
function checkWord() {
    let slovaStringRijeci = string.split("");
    let slovaGlavneRijeci = glavnaRijec.split("");

    if (rijeci.includes(string)) {
        for (let i=0; i < string.length; i++) {
            if (glavnaRijec.includes(string[i])) {
                if (glavnaRijec[i] == string[i]) {

                    slovaStringRijeci[i] = "0";
                    slovaGlavneRijeci[i] = "1";

                    lista_redova[brojReda][i].style.background = "#1eb042";
                } 
            } else {
                lista_redova[brojReda][i].style.background = "#707070";
            }
        }

        //console.log(slovaStringRijeci, slovaGlavneRijeci);

        for (let i=0; i < slovaStringRijeci.length; i++) {
            if (slovaGlavneRijeci.includes(slovaStringRijeci[i])) {
                slovaGlavneRijeci[slovaGlavneRijeci.indexOf(slovaStringRijeci[i])] = "1";
                lista_redova[brojReda][i].style.background = "#deaa1b";
            } else if (slovaStringRijeci[i] !== "0"){
                lista_redova[brojReda][i].style.background = "#707070";
            }
        }

        brojReda += 1;
        if (string == glavnaRijec) {
            win = true;
        } else if (brojReda > 5) {
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

document.addEventListener("keydown", pregledInputa);