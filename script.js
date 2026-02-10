let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");

let turn = "X"; // pehle X chalega

// Boxes pe click event
boxes.forEach((box) => {
  box.addEventListener("click", () => {

    // agar box already filled hai to dobara click na ho
    if (box.innerText !== "") return;

    // box me X ya O show karo
    box.innerText = turn;

    // turn change karo
    if (turn === "X") {
      turn = "O";
    } else {
      turn = "X";
    }

  });
});

// Reset Button Working
resetBtn.addEventListener("click", () => {

  // saare boxes clear kar do
  boxes.forEach((box) => {
    box.innerText = "";
  });

  // game restart with X
  turn = "X";
});
