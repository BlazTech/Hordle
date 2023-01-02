const keyboardElement = document.getElementById("keyboard");

const keyboards = {
    "croatian": [
        "e r t z u i o p š đ",
        "ž a s d f g h j k l č ⌫",
        "ć c v b n m lj nj dž ↩",
    ]
} 

function checkingInputs(letter) {
    console.log(letter);
}

function createKeyboard(language) {
    keyboards[language].forEach(function(line){
        line.split(" ").forEach(function(letter){
            let div = document.createElement("div");
            div.onclick = "checkingInputs(\"letter\")";
            div.innerHTML = letter.toUpperCase();
            div.style.minWidth = "63px";
            div.style.height = "63px";
            div.style.background = "steelblue";
            div.style.border = "1px solid black";
            div.style.cursor = "pointer";

            keyboardElement.append(div);
        })
    });
}

createKeyboard("croatian");