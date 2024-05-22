//* var enter word
let input = document.querySelector("input");
let go = document.querySelector("#go");

//* var to guess the word
let div_guess = document.querySelector("#guess");
let div_btns = document.querySelector("#divBtns");
let div_tries = document.querySelector(".tries");
let div_pics = document.querySelector(".div_pics").children;
let essai = 7;
let found = 0; // increase each time he finds a letter

//^ to reset the clicks on the element
const removeClickHandlers = (element) => {
    const clonedDivGame = element.cloneNode(true);
    element.parentNode.replaceChild(clonedDivGame, element);
    element = clonedDivGame;
};

//! Function to validate if a character enterd is a letter
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
};

//! Event listener for key presses in the input field
input.addEventListener('keypress', function (event) {
    const key = event.key;
    if (!isLetter(key)) {
        event.preventDefault(); // Prevent entering non-letter characters
    }
});

//^ game concept
const guessWord = (word) => {
    //? creer un carre pour chaque lettre, selon nombre des lettres du mot entree
    word = word.toUpperCase();
    for (let index = 0; index < word.length; index++) {
        let char = word[index];
        div_guess.insertAdjacentHTML(`beforeend`, `
        <div class="guessChar textSamebgColor d-flex justify-content-center align-items-center fs-3">
         ${char}</div>
        `);
    }
    //? selectioner les divChar cree
    let getdivChar = document.querySelectorAll(".guessChar"); //& div created => la case de char
    div_tries.textContent = `you have ${essai} essais`;

    for (let b = 0; b < div_btns.children.length; b++) {
        let element = div_btns.children[b];

        element.addEventListener("click", () => {
            removeClickHandlers(element);
            //& if he click on a wrong char
            if (word.includes(element.textContent) == false) {
                essai--;
                div_tries.textContent = `you have ${essai} essais`;
                switch (essai) {
                    case 6:
                        div_pics[0].classList.add("d-none");
                        div_pics[1].classList.remove("d-none");
                        break;
                    case 5:
                        div_pics[1].classList.add("d-none");
                        div_pics[2].classList.remove("d-none");
                        break;
                    case 4:
                        div_pics[2].classList.add("d-none");
                        div_pics[3].classList.remove("d-none");
                        break;
                    case 3:
                        div_pics[3].classList.add("d-none");
                        div_pics[4].classList.remove("d-none");
                        break;
                    case 2:
                        div_pics[4].classList.add("d-none");
                        div_pics[5].classList.remove("d-none");
                        break;
                    case 1:
                        div_pics[5].classList.add("d-none");
                        div_pics[6].classList.remove("d-none");
                        break;
                    case 0:
                        div_pics[6].classList.add("d-none");
                        div_pics[7].classList.remove("d-none");
                        setTimeout(() => {
                            alert("YOU ARE DEAD");
                            location.reload();
                        }, 700);
                        break;

                }
            } else if (word.includes(element.textContent)) { //& he get it right
                for (let f = 0; f < getdivChar.length; f++) {
                    let lettre = getdivChar[f].textContent.trim();
                    if (lettre == element.textContent) {
                        getdivChar[f].classList.remove("textSamebgColor");
                        found++;
                    }
                }
            }
            if (found == getdivChar.length) {
                setTimeout(() => {
                    alert("WINNER");
                    location.reload();
                }, 300);
            }
        });
    }
}

//* get the word, then start the game

go.addEventListener("click", () => {
    input.classList.add("d-none");
    go.classList.add("d-none");
    div_btns.classList.remove("d-none");
    div_btns.classList.add("d-flex");
    input.value = input.value.trim();
    guessWord(input.value);
    input.value = "";

});

input.addEventListener("keyup", (event) => {
    if (event.key == "Enter") {
        input.classList.add("d-none");
        go.classList.add("d-none");
        div_btns.classList.remove("d-none");
        div_btns.classList.add("d-flex");
        input.value = input.value.trim();
        guessWord(input.value);
        input.value = "";
    }
});

