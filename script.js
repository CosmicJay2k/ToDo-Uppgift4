/* HTML-element */
const input = document.querySelector("input"); // Input
const list = document.querySelector("ul"); // Lista
const stuffArray = []; // Array för lagring
const msg = document.querySelector("h2"); // Meddelande
const headText = document.querySelector("h1"); // Rubrik
let completedCount = 0; // Räknare

/* Funktion för räknare */
function counterFunc() {
  if (completedCount == 0) {
    headText.innerHTML = `Du har ${completedCount} saker kvar att göra!`
  }
  else if (completedCount == 1) { // För formuleringen
    headText.innerHTML = `Du har ${completedCount} sak kvar att göra!`
  }
  else {
    headText.innerHTML = `Du har ${completedCount} saker kvar att göra!`
  }
};

/* Knapptryck: Lägga till */
btnAdd.addEventListener("click", addItem);

/* Funktion för att lägga till */
function addItem() {
  const text = input.value.toUpperCase(); // Tar in värdet från input o sätter på "text"
  if (text.length == 0) { // Kontrollerar att något är skrivet
    msg.innerHTML = "Skriv något!"; // Ändrar meddelande
    return;
  }
  else { // Lägg till i listan
    const item = document.createElement("li"); // Definierar ett objekt
    list.appendChild(item); // Lägger till objektet i listan
    const itemLabel = document.createElement("span"); // Definierar ett objekt
    itemLabel.innerText = text; // Stoppar in input i objektet
    item.appendChild(itemLabel); // Lägger till objektet i objektet
    const trashcan = document.createElement("span"); // Soptunna
    trashcan.innerHTML = ' &#x1F5D1;';
    trashcan.setAttribute("class", "trashcan");
    item.appendChild(trashcan)
    stuffArray.push(text); // Lägge till i array
    input.value = ""; // Tömmer input
    msg.innerHTML = "Lägg till något mer!"; // Ändrar meddelande
    completedCount++;
    counterFunc() // Räknarfunktion

    /* Funktion för markering */ // Skulle vilja flytta ut denna funktion ??
    itemLabel.addEventListener("click", markItem);
    function markItem() {
      if (item.getAttribute("class") == "completed") {
        item.setAttribute("class", "");
        completedCount++;
      }
      else {
        item.setAttribute("class", "completed");
        completedCount--;
      }
      counterFunc()
    };

    /* Funktion för att ta bort */
    trashcan.addEventListener("click", function () {
      if (item.getAttribute("class") == "completed") { // Så att räknaren går rätt
        item.remove();
      }
      else {
        item.remove();
        completedCount--;
      }
      counterFunc()
    });
  }
};