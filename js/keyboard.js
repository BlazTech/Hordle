class Keyboard {
    constructor() {
        this.keyboard = document.querySelector("#keyboard");
        this.listOfSquareDivs = [];
        this.keyboardLanguages = {
            "croatian": [
                "e r t z u i o p š đ",
                "ž a s d f g h j k l č ⌫",
                "ć c v b n m lj nj dž ↩"
            ]
        } 
    }
    createKeyboard(language) {
        this.keyboardLanguages[language].forEach(line => {
            const rowDiv = document.createElement("div");
            rowDiv.className = "keyboard-row";
            this.keyboard.append(rowDiv);
    
            line.split(" ").forEach(letter => {
                const square = document.createElement("div");
                square.classList.add("cell", "regularbox");
                const letterSquare = document.createElement("div");
                letterSquare.className = "letter-square";
                letterSquare.innerText = letter.toUpperCase();
                square.append(letterSquare);
                rowDiv.append(square);
                this.listOfSquareDivs.push(square);
            });
        });
    }
    changeKeyColor(colorClass, letter) {
        this.listOfSquareDivs.forEach(square => {
            const key = square.firstElementChild;
            if (key.innerText.toLowerCase() == letter) {
                square.classList.remove("regularbox");
                square.classList.remove("greenbox");
                square.classList.remove("orangebox");
                square.classList.remove("darkgreybox");
                
                square.classList.add(colorClass);
            }
        });
    }
}