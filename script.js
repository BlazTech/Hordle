class Grid {
    constructor(mainWord) {
        this.grid = document.getElementById("grid");
        this.mainWord = mainWord;
        this.string = "";
        this.listOfRows = [];
        this.rowNumber = 0;
        this.abc = "abcčćdđefghijklmnoprsštuvzžABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";
        this.state = "playing";
    }
    //pravljenje i dodavanje kvadrata u listu
    createSquareObjects() {
        let tempList = [];
        for (let i=0; i < 30; i++ ) {
            const square = document.createElement("div");
            square.id = "#s" + String(i);
            square.classList.add("cell", "regularbox");
            const letterSquare = document.createElement("div");
            letterSquare.id = "#l" + String(i);
            letterSquare.className = "letter-square";
            square.append(letterSquare);
            this.grid.append(square);
            tempList.push(square);
        
            if (tempList.length >= 5) {
                this.listOfRows.push(tempList);
                tempList = [];
            }
        }        
    }
    //obnavljanje teksta u gridu
    updateGridText() {
        for (let i=0; i < 5; i++) {
            if (i < this.string.length) {
                const child = this.listOfRows[this.rowNumber][i].querySelector(".letter-square");
                child.innerText = this.string[i].toUpperCase();
            } else {
                const child = this.listOfRows[this.rowNumber][i].querySelector(".letter-square");
                child.innerText = "";
            }
        }
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
            for (let i=0; i < 5; i++) {
                if (this.mainWord.includes(this.string[i])) {
                    if (this.mainWord[i] == this.string[i]) {
                        stringLetters[i] = "0";
                        mainWordLetters[i] = "1";
                        this.listOfRows[this.rowNumber][i].style.background = "#1eb042";
                    } 
                } else {
                    this.listOfRows[this.rowNumber][i].style.background = "#707070";
                }
            }
            //provjera slova koja su prisutna, ali na različitom mjestu
            for (let i=0; i < 5; i++) {
                if (mainWordLetters.includes(stringLetters[i])) {
                    mainWordLetters[mainWordLetters.indexOf(stringLetters[i])] = "1";
                    this.listOfRows[this.rowNumber][i].style.background = "#deaa1b";
                } else if (stringLetters[i] !== "0"){
                    this.listOfRows[this.rowNumber][i].style.background = "#707070";
                }
            }
            //provjera pobjede, gubitka
            this.rowNumber += 1;
            if (this.string == this.mainWord) {
                this.state = "win";
            } else if (this.rowNumber > 5) {
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
    inputCheck(event) {
        let key = event.key;
        if (this.abc.includes(key)) {
            if (this.string.length < 5) {
                this.string += key.toLowerCase();
                this.updateGridText();
            }
        } else if (key == "Backspace") {
            this.string = this.string.slice(0, this.string.length - 1);
            this.updateGridText();
        } else if (key == "Enter") {
            if (this.string.length == 5) {
                this.checkWord();
            }
        }
    }
}

function chooseMainWord() {
    function randomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }
    const mainWord = listOfWords[randomInt(listOfWords.length - 1)];
    return mainWord;
}

const grid = new Grid(chooseMainWord());
grid.createSquareObjects();

document.addEventListener("keydown", event => {
    grid.inputCheck(event);
})

console.log(grid.mainWord);