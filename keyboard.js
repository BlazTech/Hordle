class Keyboard {
    constructor() {
        this.keyboard = document.getElementById("keyboard");
        this.listOfKeyDivs = [];
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
            });
        });
    }
}

const keyboard = new Keyboard();
keyboard.createKeyboard("croatian");