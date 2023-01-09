class Grid {
    constructor() {
        this.grid = document.querySelector("#grid");
        this.listOfRows = [];
    }
    //pravljenje i dodavanje kvadrata u listu
    createGrid(rowNumber, columnNumber) {
        this.grid.style.gridTemplateColumns = "repeat(" + String(columnNumber) + ", 1fr)";

        let tempList = [];
        for (let i=0; i < (rowNumber * columnNumber); i++ ) {
            const square = document.createElement("div");
            square.id = "#s" + String(i);
            square.classList.add("cell", "regularbox");
            const letterSquare = document.createElement("div");
            letterSquare.id = "#l" + String(i);
            letterSquare.className = "letter-square";
            square.append(letterSquare);
            this.grid.append(square);
            tempList.push(square);
        
            if (tempList.length >= columnNumber) {
                this.listOfRows.push(tempList);
                tempList = [];
            }
        }        
    }
    //obnavljanje teksta u gridu
    updateGridText(string, currentRowNumber, columnNumber) {
        for (let i=0; i < columnNumber; i++) {
            if (i < string.length) {
                const child = this.listOfRows[currentRowNumber][i].querySelector(".letter-square");
                child.innerText = string[i].toUpperCase();
            } else {
                const child = this.listOfRows[currentRowNumber][i].querySelector(".letter-square");
                child.innerText = "";
            }
        }
    }

    //bojanje grida
    changeGridColors(color, currentRowNumber, i) {
        this.listOfRows[currentRowNumber][i].classList.remove("regularbox");
        this.listOfRows[currentRowNumber][i].classList.add(color);
    }

}
