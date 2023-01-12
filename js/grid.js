class Grid {
    constructor() {
        this.main = document.querySelector("main");
        this.grid = document.createElement("div"); 
        this.grid.id = "grid"; 
        this.listOfRows = [];
    }
    //pravljenje i dodavanje kvadrata u listu
    createGrid(rowNumber, columnNumber) {
        this.grid.style.gridTemplateColumns = "repeat(" + String(columnNumber) + ", 1fr)";

        let tempList = [];
        for (let i=0; i < (rowNumber * columnNumber); i++ ) {
            const square = document.createElement("div");
            square.classList.add("cell", "regularbox");

            const letterSquare = document.createElement("div");
            letterSquare.classList.add("letter-square");
            this.grid.append(square);
            square.append(letterSquare);

            tempList.push(square);
            if (tempList.length >= columnNumber) {
                this.listOfRows.push(tempList);
                tempList = [];
            }
        }
        this.main.append(this.grid);
    }
    //obnavljanje teksta u gridu
    updateGridText(string, currentRowNumber, columnNumber) {
        for (let i=0; i < columnNumber; i++) {
            if (i < string.length) {
                const child = this.listOfRows[currentRowNumber][i].querySelector(".letter-square");
                child.innerText = string[i];
            } else {
                const child = this.listOfRows[currentRowNumber][i].querySelector(".letter-square");
                child.innerText = "";
            }
        }
    }

    //bojanje grida
    changeGridColors(colorClass, currentRowNumber, i) {
        this.listOfRows[currentRowNumber][i].classList.remove("regularbox");
        this.listOfRows[currentRowNumber][i].classList.remove("greenbox");
        this.listOfRows[currentRowNumber][i].classList.remove("orangebox");
        this.listOfRows[currentRowNumber][i].classList.remove("darkgreybox");
        
        this.listOfRows[currentRowNumber][i].classList.add(colorClass);
    }

}
