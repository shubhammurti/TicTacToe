console.log("Welcome to Tic Tac Toe");
const music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;
let moveCount = 0; 
const resetButton = document.getElementById("reset")

const changeTurn = () => {
    return turn === "X" ? "O" : "X"; // Fix: Change '0' to 'O'
}

// Encapsulated win-checking logic
const isWinningCombination = (boxtext, e) => {
  const firstTwoBoxesMatch = boxtext[e[0]].innerText === boxtext[e[1]].innerText;
  const lastTwoBoxesMatch = boxtext[e[2]].innerText === boxtext[e[1]].innerText;
  const firstBoxNotEmpty = boxtext[e[0]].innerText !== "";
  return firstTwoBoxesMatch && lastTwoBoxesMatch && firstBoxNotEmpty;
}

const checkWin = (event) => {
    let boxtext = document.getElementsByClassName("boxtext")
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ]

    wins.forEach(e => {
        if (isWinningCombination(boxtext, e)) {
            document.querySelector(".info").innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "56px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw"
        }
    })
}

// Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector(".boxtext");
    element.addEventListener("click", () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            moveCount++;
            if (moveCount === 9 && !isgameover) {
                document.querySelector(".info").innerText = "It's a Tie!";
                isgameover = true;
            } else if (!isgameover) {
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });

});
const clickEventHandler = () => {
    let boxtexts = document.querySelectorAll(".boxtext");
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0vw"
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
}
resetButton.addEventListener("click", clickEventHandler)


