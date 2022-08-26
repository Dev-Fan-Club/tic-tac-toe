import patterns from "./patterns.js";

const playerTurnElement = document.querySelector(".player-turn");
const cells = document.querySelectorAll(".cell");
const messgaeDialogueElement = document.querySelector(".message-dialogue");
const textMessageElement = document.querySelector(".message");
const okayButtonElement = document.getElementById("okay");

const firstPerson = [];
const secondPerson = [];

let totalMovement = 0;
const MAX_MOVEMENT = 9;

playerTurnElement.innerText = totalMovement % 2 === 0 ? "First Player Turn" : "Second Player Turn";

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (totalMovement < MAX_MOVEMENT) {
            ++totalMovement;
            if (totalMovement % 2 === 0) {
                playerTurnElement.innerText = "First Person Turn";
                secondPerson.push(index);
                cell.innerText = "O";
            } else {
                playerTurnElement.innerText = "Second Person Turn";
                firstPerson.push(index);
                cell.innerText = "X";
            }
            checkTheWinner();
        } else {
            console.log("Draw");
        }
    });
});

okayButtonElement.addEventListener("click", () => {
    firstPerson.length = 0;
    secondPerson.length = 0;

    cells.forEach((cell) => {
        cell.innerText = "";
    });

    messgaeDialogueElement.style.display = "none";
    playerTurnElement.innerText = "First Player Turn";
});

const checkTheWinner = () => {
    firstPerson.sort((a, b) => a - b);
    secondPerson.sort((a, b) => a - b);
    console.log(firstPerson, secondPerson);
    const result = {
        hasFirstPersonWon: false,
        hasSecondPersonWon: false,
    };

    if (firstPerson.length >= 3) {
        result.hasFirstPersonWon = matchPattern(firstPerson);
    }

    if (secondPerson.length >= 3) {
        result.hasSecondPersonWon = matchPattern(secondPerson);
    }

    if (result.hasFirstPersonWon) {
        messgaeDialogueElement.style.display = "flex";
        textMessageElement.innerText = "First Player Wins";
    } else if (result.hasSecondPersonWon) {
        messgaeDialogueElement.style.display = "flex";
        textMessageElement.innerText = "Second Player Wins";
    }
};

const matchPattern = (arr) => {
    let flag = false;
    patterns.forEach((pattern) => {
        let mathced_numbers = null;
        let total_values_matched_in_a_pattern = 0;

        pattern.forEach((patternNumber) => {
            mathced_numbers = arr.find((number) => number === patternNumber);
            if (mathced_numbers === undefined) return;
            ++total_values_matched_in_a_pattern;
        });

        // Check if the pattern matched
        if (total_values_matched_in_a_pattern === 3) {
            flag = true;
            return;
        }
    });
    return flag;
};
