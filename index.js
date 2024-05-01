let typing = document.querySelector(".typing-text p")
let input = document.querySelector(".input-field")
let time = document.querySelector(".time b")
let mistakes = document.querySelector(".mistake span")
let Wpm = document.querySelector(".wpm span")
let Cpm = document.querySelector(".cpm span")
let btn = document.querySelector(".try")

let timer;
let maxtime = 60
let timeleft = maxtime
let charindex = 0
let mistake = 0
let istyping = false

function loadParagraph() {
    const sentences = [
        "The quick brown fox jumps over the lazy dog.",
        "Pack my box with five dozen liquor jugs.",
        "How razorback-jumping frogs can level six piqued gymnasts!",
        "Sphinx of black quartz, judge my vow.",
        "The five boxing wizards jump quickly.",
        "Six big devils from Japan quickly forgot how to waltz.",
        "Crazy Frederick bought many very exquisite opal jewels.",
        "A quick movement of the enemy will jeopardize six gunboats.",
        "We promptly judged antique ivory buckles for the next prize.",
        "Jinxed wizards pluck ivy from the big quilt.",
        "Jackdaws love my big sphinx of quartz.",
        "The quick onyx goblin jumps over the lazy dwarf.",
        "How razorback-jumping frogs can level six piqued gymnasts!",
        "Sixty zippers were quickly picked from the woven jute bag.",
        "The July sun caused a fragment of black pine wax to ooze on the velvet quilt.",
        "The explorer was frozen in his big kayak just after making queer discoveries.",
        "Five big quacking zephyrs jolt my wax bed.",
        "Few black taxis drive up major roads on quiet hazy nights.",
        "Jumping jackdaws quizzically vexed four old men.",
        "My ex pub quiz crowd gave joyful thanks.",
        "Warm snow quietly falls, white but muddy."

    ];


    let ranindex = Math.floor(Math.random() * sentences.length)
    typing.innerHTML = ""
    for (const char of sentences[ranindex]) {
        // console.log(char)
        typing.innerHTML += `<span>${char}</span>`
    }
    typing.querySelectorAll('span')[0].classList.add("active")
    document.addEventListener("keydown", () => {
        input.focus()
    })

}

loadParagraph()



function inittyping() {
    const char = typing.querySelectorAll('span')
    // console.log(input)
    const typedchar = input.value.charAt(charindex)

    if (charindex < char.length && timeleft > 0) {
        if (!istyping) {
            timer = setInterval(inittime, 1000)
            istyping = true
        }



        if (char[charindex].innerText === typedchar) {
            char[charindex].classList.add('correct')
            console.log("cr")
        }
        else {
            mistake++
            char[charindex].classList.add('incorrect')
            console.log("incr")
        }
        charindex++
        char[charindex].classList.add('active')
        mistakes.innerHTML = mistake
        Cpm.innerText = charindex - mistake
    }
    else {
        clearInterval(timer)
    }

}

input.addEventListener("input", inittyping)

function inittime() {
    if (timeleft > 0) {
        timeleft--
        time.innerText = timeleft
        let words = Math.round(((charindex - mistake) / 5) / (maxtime - timeleft) * 60)

        Wpm.innerText = words
    }
    else {
        clearInterval(timer)
    }

}




btn.addEventListener("click", () => {
console.log("clickd")
    clearInterval(timer);
    timeleft = maxtime;
    charindex = 0;
    mistake = 0;
    istyping = false;


    input.value = "";
    time.innerText = maxtime;
    mistakes.innerText = "0";
    Wpm.innerText = "0";
    Cpm.innerText = "0";


    loadParagraph();
});



let instruction = document.querySelector(".ins");

function typeInstruction() {
    let text = instruction.textContent.trim();
    instruction.textContent = "";
    let index = 0;
    let cursorBlink = true;
    let interval = setInterval(() => {
        if (index <= text.length) {
            instruction.textContent = text.slice(0, index);
            if (cursorBlink) {
                instruction.textContent += "|";
                cursorBlink = false;
            } else {
                instruction.textContent = instruction.textContent.slice(0, -1);
                cursorBlink = true;
            }
            index++;
        } else {
            clearInterval(interval);
            instruction.textContent = text; // Remove cursor after typing is complete
        }
    }, 100);
}

typeInstruction();









let modeToggleBtn = document.getElementById("mode-toggle-btn");
let icon = modeToggleBtn.querySelector("i");
let body = document.body;
let styleLink = document.getElementById("style-link");

modeToggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    icon.classList.toggle("fa-sun");
    icon.classList.toggle("fa-moon");

    if (body.classList.contains("dark-mode")) {
        styleLink.href = "dark-mode.css"; // Apply dark mode CSS
    } else {
        styleLink.href = "style.css"; // Revert to default CSS
    }
});

