/* HTML-element */
const input = document.querySelector("input"); // Input
const list = document.querySelector("ul"); // Lista
const stuffArray = []; // Array för lagring
const msg = document.querySelector("h2"); // Meddelande
const headText = document.querySelector("h1"); // Rubrik
let completedCount = 0; // Räknare

/* Funktion för att alltid vara redo att skriva */
function getFocus() {
  input.focus();
}
getFocus();

/* Funktion för räknare */
function counterFunc() {
  if (completedCount == 1) { // För formuleringen
    headText.innerHTML = `Du har ${completedCount} sak kvar att göra!`;
  }
  else {
    headText.innerHTML = `Du har ${completedCount} saker kvar att göra!`;
  }
};

/* Klicka på knappen: Lägga till */
btnAdd.addEventListener("click", addItem);

/* Trycka Return/Enter: Lägga till */
inputHTML.addEventListener("keyup", function (e) {
  //let key = e.which || e.keyCode || 0;
  if (e.keyCode === 13) {
    e.preventDefault();
    addItem();
  }
});

/* Funktion för att lägga till */
function addItem() {
  const text = input.value;
  if (text.length == 0) { // Kontrollerar att något är skrivet
    msg.innerHTML = "Skriv något!";
    getFocus();
    return;
  }
  else { // Lägg till i listan
    const item = document.createElement("li");
    list.appendChild(item);

    const itemLabel = document.createElement("span");
    itemLabel.innerText = text;
    item.appendChild(itemLabel);

    const trashcan = document.createElement("span"); // Soptunna
    trashcan.innerHTML = ' &#x1F5D1;';
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan)

    stuffArray.push(text); // Lägger till i array
    input.value = ""; // Tömmer input
    msg.innerHTML = "Lägg till något mer!";
    completedCount++;
    counterFunc() // Räknarfunktion
    getFocus();

    /* Funktion för markering */
    itemLabel.addEventListener("click", function () {
      if (item.getAttribute("class") == "completed") {
        item.setAttribute("class", "");
        completedCount++;
        getFocus();
      }
      else {
        item.setAttribute("class", "completed");
        completedCount--;
        getFocus();
      }
      counterFunc()
    });

    /* Funktion för att ta bort */
    trashcan.addEventListener("click", function () {
      if (item.getAttribute("class") == "completed") { // Så att räknaren går rätt
        item.remove();
      }
      else {
        item.remove();
        completedCount--;
      }
      counterFunc();
      getFocus();
    });
  }
};