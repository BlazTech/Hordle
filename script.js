class Grid {
    constructor() {
        this.main = document.querySelector("main");
        this.grid = document.createElement("div"); 
        this.grid.id = "grid"; 
        this.listOfRows = [];
    }
    //pravljenje i dodavanje kvadrata u listu
    createGrid(rowNumber, columnNumber) {
        this.grid.style.gridTemplateColumns = "repeat(" + String(columnNumber) + ", 1fr)";

        let tempList = [];
        for (let i=0; i < (rowNumber * columnNumber); i++ ) {
            const square = document.createElement("div");
            square.classList.add("cell", "regularbox");
            const letterSquare = document.createElement("div");
            letterSquare.classList.add("letter-square");

            this.grid.append(square);
            square.append(letterSquare);

            tempList.push(square);
            if (tempList.length >= columnNumber) {
                this.listOfRows.push(tempList);
                tempList = [];
            }
        }
        this.main.append(this.grid);
    }
    //brisanje
    deleteSelf() {
        this.grid.innerHTML = "";
        this.listOfRows = [];
    }
    //obnavljanje teksta u gridu
    updateGridText(string, specialChars, currentRowNumber, columnNumber) {
        for (let i=0; i < columnNumber; i++) {
            if (i < string.length) {
                const child = this.listOfRows[currentRowNumber][i].querySelector(".letter-square");
                //prikaz specijalnog znaka
                if (Object.values(specialChars).includes(string[i])) {
                    child.innerText = Object.keys(specialChars).find(key => specialChars[key] === string[i]);
                } else {
                    child.innerText = string[i];
                }
            } else {
                const child = this.listOfRows[currentRowNumber][i].querySelector(".letter-square");
                child.innerText = "";
            }
        }
    }
    //bojanje grida
    changeGridColors(colorClass, currentRowNumber, i) {
        this.listOfRows[currentRowNumber][i].classList.remove("regularbox");
        this.listOfRows[currentRowNumber][i].classList.remove("greenbox");
        this.listOfRows[currentRowNumber][i].classList.remove("orangebox");
        this.listOfRows[currentRowNumber][i].classList.remove("darkgreybox");
        
        this.listOfRows[currentRowNumber][i].classList.add(colorClass);
    }
}

class Keyboard {
    constructor() {
        this.main = document.querySelector("main");
        this.keyboard = document.createElement("div");
        this.keyboard.id = "keyboard";
        this.listOfSquareDivs = [];

    }
    //pravljenje tastature
    createKeyboard(keyboardLanguages, language) {
        keyboardLanguages[language]["keyboard"].forEach(line => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "keyboard-row";
            this.keyboard.append(rowDiv);
    
            line.split(" ").forEach(letter => {
                const square = document.createElement("div");
                square.classList.add("cell", "click", "regularbox");
                const letterSquare = document.createElement("div");
                letterSquare.className = "letter-square";
                letterSquare.innerText = letter;

                rowDiv.append(square);
                square.append(letterSquare);
                this.listOfSquareDivs.push(square);
            });
        });
        this.main.append(this.keyboard);
    }
    //brisanje
    deleteSelf() {
        this.keyboard.innerHTML = "";
        this.listOfSquareDivs = [];
    }
    //promjena boje tipki
    changeKeyColor(colorClass, letter) {
        this.listOfSquareDivs.forEach(square => {
            const key = square.firstElementChild;
            if (key.innerText.toLowerCase() == letter) {
                if ((square.classList.contains("regularbox") || square.classList.contains("orangebox")) 
                && (square.classList.contains("orangebox") && colorClass == "darkgreybox") == false) {

                    square.classList.remove("regularbox");
                    square.classList.remove("greenbox");
                    square.classList.remove("orangebox");
                    square.classList.remove("darkgreybox");
                    
                    square.classList.add(colorClass);
                }
            }
        });
    }
}

class Hordle {
    constructor(grid, keyboard) {
        this.grid = grid;
        this.keyboard = keyboard;
        this.addEventListener = false;
        this.keyboardLanguages = {
            "croatian": {
                "keyboard": 
                [
                "e r t z u i o p š đ",
                "ž a s d f g h j k l č ⌫",
                "ć c v b n m lj nj dž ↩"
                ],
                "specialChars": {"lj": "*", "nj": "?", "dž": "!"}
            }
        }         
        //deklariranje varijabli
        this.language;
        this.keyboardStringRows;
        this.abc;
        this.specialChars;
        this.mainWord;
        this.string;
        this.state;
        this.rowNumber;
        this.columnNumber;
        this.currentRowNumber;
    }

    //pozivanje funkcije za obnavljanje teksta u gridu
    updateGridText() {
        this.grid.updateGridText(this.string, this.specialChars, this.currentRowNumber, this.columnNumber);
    }
    //provjera inputa s html tastature
    addKeyboardClickCheck() {
        this.keyboard.listOfSquareDivs.forEach(square => {
            const key = square.firstElementChild;
            square.addEventListener("click", () => {
                this.inputCheck(key.innerText, true);
            });
        });
    }

    //upozorenja na gubitak, pobjedu
    alertWin() {
        alert("POBJEDA!\n" + "REFRESH ZA NOVU RIJEČ");
    }
    alertLose() {
        alert("IZGUBIO SI, GLAVNA RIJEČ JE " + this.mainWord.toUpperCase() + "!\n" + "REFRESH ZA NOVU RIJEČ");
    }

    //provjera riječi i bojanje grida
    checkWord() {
        let stringLetters = this.string.split("");
        let mainWordLetters = this.mainWord.split("");
        
        if (listOfWords.includes(this.string)) {
            //provjera slova na istom mjestu i slova koja nedostaju
            for (let i=0; i < this.columnNumber; i++) {
                if (this.mainWord.includes(this.string[i])) {
                    if (this.mainWord[i] == this.string[i]) {
                        stringLetters[i] = "0";
                        mainWordLetters[i] = "1";
                        this.grid.changeGridColors("greenbox", this.currentRowNumber, i);
                        this.keyboard.changeKeyColor("greenbox",this.string[i]);
                    }   
                } else {
                    this.grid.changeGridColors("darkgreybox", this.currentRowNumber, i);
                    this.keyboard.changeKeyColor("darkgreybox",this.string[i]);
                }
            } 
            //provjera slova koja su prisutna, ali na različitom mjestu
            for (let i=0; i < this.columnNumber; i++) {
                if (mainWordLetters.includes(stringLetters[i])) {
                    mainWordLetters[mainWordLetters.indexOf(stringLetters[i])] = "1";
                    this.grid.changeGridColors("orangebox", this.currentRowNumber, i);
                    this.keyboard.changeKeyColor("orangebox",this.string[i]);
                } else if (stringLetters[i] !== "0") {
                    this.grid.changeGridColors("darkgreybox", this.currentRowNumber, i);
                    this.keyboard.changeKeyColor("darkgreybox",this.string[i]);
                }
            }
            //provjera pobjede, gubitka
            this.currentRowNumber += 1;
            if (this.string == this.mainWord) {
                this.state = "win";
            } else if (this.currentRowNumber > this.rowNumber - 1) {
                this.state = "lose";
            }
            //slanje poruka za pobjedu, gubitak
            if (this.state == "win") {
                let that = this;
                setTimeout(() => {that.alertWin()} , 300);
            } else if (this.state == "lose") {
                let that = this;
                setTimeout(() => {that.alertLose()} , 300);
            }
            
            this.string = "";
        } else {
            alert("RIJEČ NIJE PRONAĐENA!");
        }
    }
    //provjera inputa
    inputCheck(event, keyboard=false) {
        if (keyboard) {
            var key = event.toLowerCase();
        } else {
            var key = event.key.toLowerCase();
        }

        if (key in this.specialChars) {
            key = this.specialChars[key];
        }

        if (this.abc.split(" ").includes(key) || Object.values(this.specialChars).includes(key)) {
            if (this.string.length < this.columnNumber) {
                this.string += key.toLowerCase();
                this.updateGridText();
            }
        } else if (key == "backspace" || key == "⌫") {
            this.string = this.string.slice(0, this.string.length - 1);
            this.updateGridText();
        } else if (key == "enter" || key == "↩") {
            if (this.string.length == this.columnNumber) {
                this.checkWord();
            }
        }
    }
    //resetiranje igre
    startNewGame(row=6, column=5) {
        function chooseMainWord() {
            function randomInt(max) {
                return Math.floor(Math.random() * (max + 1));
            }
            const mainWord = listOfWords[randomInt(listOfWords.length - 1)];
            return mainWord;
        }
        //varijable
        this.language = "croatian";

        this.keyboardStringRows = this.keyboardLanguages[this.language]["keyboard"];
        this.abc = "";
        this.specialChars = this.keyboardLanguages[this.language]["specialChars"];
        for (let i=0; i < this.keyboardStringRows.length; i++) {
            if (i != 0) {
                this.abc += " ";
            }
            this.abc += this.keyboardStringRows[i];
        }
        this.abc = this.abc.replace(" ⌫", "");
        this.abc = this.abc.replace(" ↩", "");


        this.mainWord = chooseMainWord();
        this.string = "";
        this.state = "playing";
        
        this.rowNumber = row;
        this.columnNumber = column;
        this.currentRowNumber = 0;
        //kraj varijabli

        //obnavljanje tipkovnice i grida
        this.grid.deleteSelf();
        this.keyboard.deleteSelf();

        this.grid.createGrid(this.rowNumber, this.columnNumber);
        this.keyboard.createKeyboard(this.keyboardLanguages, this.language);
        this.addKeyboardClickCheck();

        if (this.addEventListener == false) {
            document.addEventListener("keydown", event => {
                this.inputCheck(event);
            });
            this.addEventListener = true;
        }
    }
}

//pravljenje objekata
const grid = new Grid();
const keyboard = new Keyboard();
const hordle = new Hordle(grid, keyboard);

hordle.startNewGame()