import patterns from "./patterns.js";

// DOM Elements
const playerTurnElement = document.querySelector(".player-turn");
const cells = document.querySelectorAll(".cell");
const messgaeDialogueElement = document.querySelector(".message-dialogue");
const textMessageElement = document.querySelector(".message");
const okayButtonElement = document.getElementById("okay");

// Arrays to store positions
const firstPerson = [];
const secondPerson = [];

// Check player movements
let totalMovements = 0;
const MAX_MOVEMENT = 9;

/**
 * Add event listner for each cell
 * @method
 * @param {Element} cell - Element with the class name 'cell'
 * @param {Number} index - Index number of the cells array
 * @returns Nothing
 */
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (totalMovements < MAX_MOVEMENT) {
            // Increase the movement after each move
            ++totalMovements;

            // Check who is playing
            if (totalMovements % 2 === 0) {
                playerTurnElement.innerText = "First Person Turn";
                secondPerson.push(index);
                cell.innerText = "O";
            } else {
                playerTurnElement.innerText = "Second Person Turn";
                firstPerson.push(index);
                cell.innerText = "X";
            }

            // Calling the function to check the winner
            checkTheWinner();

            if (totalMovements === 9) {
                // The match is draw if no one wins in 9 movements
                messgaeDialogueElement.style.display = "flex";
                textMessageElement.innerText = "Match Draw";
            }
        }
    });
});

// Event listner for okay button, it can only be triggered when the match ends
okayButtonElement.addEventListener("click", () => {
    // Reset arrays and movements
    firstPerson.length = 0;
    secondPerson.length = 0;
    totalMovements = 0;

    // Reset all the marks from the board
    cells.forEach((cell) => {
        cell.innerText = "";
    });

    // Reset player turn
    messgaeDialogueElement.style.display = "none";
    playerTurnElement.innerText = "First Player Turn";
});

/**
 * Winner checker method
 * @method
 * @returns Nothing
 */
const checkTheWinner = () => {
    // Sort both arrays
    firstPerson.sort((a, b) => a - b);
    secondPerson.sort((a, b) => a - b);

    // Store the result of matching with patterns
    const result = {
        hasFirstPersonWon: false,
        hasSecondPersonWon: false,
    };

    // Match with patterns only if first person has given 3 or more moves
    if (firstPerson.length >= 3) {
        result.hasFirstPersonWon = matchPattern(firstPerson);
    }

    // Match with patterns only if seond person has given 3 or more moves
    if (secondPerson.length >= 3) {
        result.hasSecondPersonWon = matchPattern(secondPerson);
    }

    // Return the result depending on which person has own the game
    if (result.hasFirstPersonWon) {
        messgaeDialogueElement.style.display = "flex";
        textMessageElement.innerText = "First Player Wins";
    } else if (result.hasSecondPersonWon) {
        messgaeDialogueElement.style.display = "flex";
        textMessageElement.innerText = "Second Player Wins";
    }
};

/**
 * Matches all the patterns with the player
 * In this function snake case variable naming is used for better readability
 * @method
 * @param {Array} arr - First or Second Person Array
 * @returns True or False
 */
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
