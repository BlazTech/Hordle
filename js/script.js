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

        console.log(Object.values(this.specialChars));
        
        console.log(typeof key);
        console.log(key);

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