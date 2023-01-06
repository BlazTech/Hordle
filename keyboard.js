const keyboardDiv = document.getElementById("keyboard");
let listOfKeyDivs = [];

const keyboards = {
    "croatian": [
        "e r t z u i o p š đ",
        "ž a s d f g h j k l č ⌫",
        "ć c v b n m lj nj dž ↩",
    ]
} 


function testCheckingInputs(letter) {
    console.log(letter);
}

function createKeyboard(language) {
    keyboards[language].forEach(line => {
        const keyboardRowDiv = document.createElement("div");
        keyboardRowDiv.style.display = "flex";
        keyboardRowDiv.className = "keyboard-row";
        keyboardDiv.append(keyboardRowDiv);

        line.split(" ").forEach(letter => {
            const keyboardLetterDiv = document.createElement("div");
            keyboardLetterDiv.innerHTML = letter.toUpperCase();
            keyboardLetterDiv.style.textAlign = "center";
            keyboardLetterDiv.style.minWidth = "63px";
            keyboardLetterDiv.style.height = "63px";
            keyboardLetterDiv.style.background = gray;
            keyboardLetterDiv.style.border = "1px solid black";
            keyboardLetterDiv.style.cursor = "pointer";
            keyboardRowDiv.append(keyboardLetterDiv);
            listOfKeyDivs.push(keyboardLetterDiv);   
        })
    });
}

createKeyboard("croatian");