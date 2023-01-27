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