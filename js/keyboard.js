class Keyboard {
    constructor() {
        this.main = document.querySelector("main");
        this.keyboard = document.createElement("div");
        this.keyboard.id = "keyboard";
        this.listOfSquareDivs = [];
        this.keyboardLanguages = {
            "croatian": [
                "e r t z u i o p š đ",
                "ž a s d f g h j k l č ⌫",
                "ć c v b n m lj=* nj=& dž=% ↩"
            ]
        } 
    }
    //pravljenje tastature
    createKeyboard(language) {
        this.keyboardLanguages[language].forEach(line => {
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