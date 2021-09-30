/* HTML-element */
const input = document.querySelector("input"); // Input
const list = document.querySelector("ul"); // Lista
const stuffArray = []; // Array för lagring
const msg = document.querySelector("#msgHTML"); // Meddelande
const headText = document.querySelector("h1"); // Rubrik
let leftToDoCount = 0; // Räknare

input.focus();

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
    return;
  }
  else { // Lägg till i listan
    const item = document.createElement("li");
    list.appendChild(item);
    /* Label */
    const itemLabel = document.createElement("span");
    itemLabel.innerText = text + "  ";
    itemLabel.setAttribute("class", "label");
    item.appendChild(itemLabel);
    /* Soptunna */
    const trashcan = document.createElement("span");
    trashcan.innerHTML = '&#x1F5D1;';
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan)

    stuffArray.push(text); // Lägger till i array
    input.value = ""; // Tömmer input
    msg.innerHTML = "Lägg till något mer!";
    leftToDoCount++;
    counterFunc() // Räknarfunktion
    input.focus();

    /* Metod för markering */
    itemLabel.addEventListener("click", function () {
      if (itemLabel.getAttribute("class") == "completed") {
        itemLabel.setAttribute("class", "");
        leftToDoCount++;
        input.focus();
      }
      else {
        itemLabel.setAttribute("class", "completed");
        leftToDoCount--;
        input.focus();
      }
      counterFunc()
    });

    /* Metod för att ta bort */
    trashcan.addEventListener("click", function () {
      if (itemLabel.getAttribute("class") == "completed") { // Så att räknaren går rätt
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