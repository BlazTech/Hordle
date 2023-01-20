class Hordle {
    constructor(grid, keyboard) {
        this.grid = grid;
        this.keyboard = keyboard;
        this.addEventListener = false;

        this.language = "croatian";
        this.abc = "abcčćdđefghijklmnoprsštuvzžABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";
        this.mainWord = undefined;
        this.string = "";
        this.state = "playing";

        this.rowNumber = 6;
        this.columnNumber = 5;
        this.currentRowNumber = 0;
    }

    //pozivanje funkcije za pravljenje kvadrata u gridu
    createGrid() {
        this.grid.createGrid(this.rowNumber, this.columnNumber);
    }

    //pozivanje funkcije za obnavljanje teksta u gridu
    updateGridText() {
        this.grid.updateGridText(this.string, this.currentRowNumber, this.columnNumber);
    }
    //pravljenje tastature
    createKeyboard() {
        this.keyboard.createKeyboard(this.language);
    }
    //provjera inputa s html tastature
    addKeyboardClickCheck() {
        this.keyboard.listOfSquareDivs.forEach(square => {
            const key = square.firstElementChild;
            square.addEventListener("click", () => {
                this.inputCheck(false, key.innerText);
            });
        });
    }

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
            } else if (this.currentRowNumber > 5) {
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
    inputCheck(event, keyboardKey="") {
        if (keyboardKey == "") {
            var key = event.key;
        } else {
            var key = keyboardKey;
        }
        if (this.abc.includes(key)) {
            if (this.string.length < this.columnNumber) {
                this.string += key.toLowerCase();
                this.updateGridText();
            }
        } else if (key == "Backspace" || key == "⌫") {
            this.string = this.string.slice(0, this.string.length - 1);
            this.updateGridText();
        } else if (key == "Enter" || key == "↩") {
            if (this.string.length == this.columnNumber) {
                this.checkWord();
            }
        }
    }
    //resetiranje igre
    startNewGame() {
        function chooseMainWord() {
            function randomInt(max) {
                return Math.floor(Math.random() * (max + 1));
            }
            const mainWord = listOfWords[randomInt(listOfWords.length - 1)];
            return mainWord;
        }

        this.language = "croatian";
        this.abc = "abcčćdđefghijklmnoprsštuvzžABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";
        this.mainWord = chooseMainWord();
        this.string = "";
        this.state = "playing";
        
        this.rowNumber = 6;
        this.columnNumber = 5;
        this.currentRowNumber = 0;

        this.grid.deleteSelf();
        this.keyboard.deleteSelf();

        this.grid.createGrid(this.rowNumber, this.columnNumber);
        this.keyboard.createKeyboard(this.language);
        this.addKeyboardClickCheck();

        if (this.addEventListener == false) {
            document.addEventListener("keydown", event => {
                this.inputCheck(event);
            });
            this.addEventListener = true;
        }
    }
}

const grid = new Grid();
const keyboard = new Keyboard();
const hordle = new Hordle(grid, keyboard);

hordle.startNewGame()