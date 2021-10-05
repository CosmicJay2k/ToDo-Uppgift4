/* HTML-element */
const input = document.querySelector("input"); // Input
const list = document.querySelector("ul"); // Lista
const msg = document.querySelector("#msgHTML"); // Meddelande
const headText = document.querySelector("h1"); // Rubrik

let stuffArray = []; // Array för lagring
let leftToDoCount = 0; // Räknare

input.focus(); // För att alltid kunna skriva

/* Funktion för räknare */
function counterFunc() {
  if (leftToDoCount == 1) { // För formuleringen
    headText.innerHTML = `Du har ${leftToDoCount} sak kvar att göra!`;
  }
  else {
    headText.innerHTML = `Du har ${leftToDoCount} saker kvar att göra!`;
  }
};

/* Klicka på knappen: Lägga till */
btnAdd.addEventListener("click", addItem);

/* Trycka Return/Enter: Lägga till */
inputHTML.addEventListener("keyup", function (e) {
  let key = e.which || e.keyCode || 0;
  if (key === 13) {
    e.preventDefault();
    addItem();
  }
});

/* Funktion för att lägga till */
function addItem() {
  const text = input.value;
  if (text.length == 0) { // Kontrollerar att något är skrivet
    msg.innerHTML = "Skriv något!";
    input.focus();
  }
  else { // Lägg till i listan
    const item = document.createElement("li");
    list.appendChild(item);
    /* Label */
    const itemLabel = document.createElement("span");
    itemLabel.setAttribute("class", "tooltip");
    itemLabel.innerText = text;
    item.appendChild(itemLabel);
    /* Tooltip */
    const itemTooltip = document.createElement("span");
    itemTooltip.innerText = "Tryck för att markera som klar";
    itemTooltip.setAttribute("class", "tooltiptext");
    itemLabel.appendChild(itemTooltip);
    /* Soptunna */
    const trashcan = document.createElement("span");
    trashcan.innerHTML = '&#x1F5D1;';
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan);

    const btnClearTooltip = document.createElement("span");
    btnClearTooltip.innerText = "Rensa listan";
    btnClearTooltip.setAttribute("class", "tooltiptextclear")
    btnClear.appendChild(btnClearTooltip);

    stuffArray.push(text); // Lägger till i array
    input.value = ""; // Tömmer input
    msg.innerHTML = "Lägg till något mer!";
    leftToDoCount++;
    counterFunc();
    input.focus();

    /* Metod för markering */
    itemLabel.addEventListener("click", function () {
      if (itemLabel.getAttribute("class") == "completed tooltip") { // Om den är Completed
        itemTooltip.innerText = "Tryck för att markera som klar";
        itemLabel.setAttribute("class", "tooltip");
        leftToDoCount++;
        input.focus();
      }
      else {
        itemLabel.setAttribute("class", "completed tooltip");
        itemTooltip.innerText = "Tryck för att avmarkera";
        leftToDoCount--;
        input.focus();
      }
      counterFunc();
    });

    /* Metod för att ta bort */
    trashcan.addEventListener("click", function () {
      stuffArray.splice(stuffArray.indexOf(text), 1); // Tar bort från Array
      if (itemLabel.getAttribute("class") == "completed tooltip") { // Så att räknaren går rätt
        item.remove();
      }
      else {
        item.remove();
        leftToDoCount--;
      }
      counterFunc();
      input.focus();
    });
  }
};

/* Rensa listan */
btnClear.addEventListener("click", function () {
  list.innerHTML = "";
  leftToDoCount = 0;
  stuffArray = [];
  counterFunc();
  input.focus();
});