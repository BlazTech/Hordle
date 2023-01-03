class Grid {
    constructor(mainWord) {
        this.mainWord = mainWord;
        this.string = "";
        this.listOfRows = [];
        this.rowNumber = 0;
        this.abc = "abcčćdđefghijklmnoprsštuvzžABCČĆDĐEFGHIJKLMNOPRSŠTUVZŽ";
        this.state = "playing";
    }
    
    addSquareObjectsToList() {
        let tempList = [];
        for (let i=0; i < 30; i++ ) {
            let square = document.querySelector("#c" + String(i));
            tempList.push(square);
        
            if (tempList.length >= 5) {
                this.listOfRows.push(tempList);
                tempList = [];
            }
        }        
    }

    updateDisplay() {
        for (let i=0; i < 5; i++) {
            if (i < this.string.length) {
                this.listOfRows[this.rowNumber][i].innerText = this.string[i].toUpperCase();
            } else {
                this.listOfRows[this.rowNumber][i].innerText = "";
            }
        }
    }

    alertWin() {
        alert("POBJEDA!" + "\nREFRESH ZA NOVU RIJEČ");
    }
    alertLose() {
        alert("IZGUBIO SI, GLAVNA RIJEČ JE " + this.mainWord.toUpperCase() + "!" + "\nREFRESH ZA NOVU RIJEČ");
    }

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
            
            this.rowNumber += 1;
            if (this.string == this.mainWord) {
                this.state = "win";
            } else if (this.rowNumber > 5) {
                this.state = "lose";
            }
            
            if (this.state == "win") {
                var that = this;
                setTimeout(() => {that.alertWin()} , 300);
            } else if (this.state == "lose") {
                var that = this;
                setTimeout(() => {that.alertLose()} , 300);
            }
            
            this.string = "";
        } else {
            alert("RIJEČ NIJE PRONAĐENA!");
        }
    }

    inputCheck(event) {
        let key = event.key;
        if (this.abc.includes(key)) {
            if (this.string.length < 5) {
                this.string += key.toLowerCase();
                this.updateDisplay();
            }
        } else if (key == "Backspace") {
            this.string = this.string.slice(0, this.string.length - 1);
            this.updateDisplay();
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
grid.addSquareObjectsToList();

document.addEventListener("keydown", event => {
    grid.inputCheck(event);
})

console.log(grid.mainWord);