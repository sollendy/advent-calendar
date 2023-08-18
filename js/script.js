const calendar = document.querySelector('.calendario');
const modal = document.querySelector('#modale');
const modalContent = document.querySelector('.modale-cont');
const modalButton = document.querySelector('.modale-btn');

// prepariamo un indice di caselle aperte
let finestreAperte = [];

// console.log(source);
//innanzitutto facciamo un ciclo per ogni elemento della sorgente 

const elemSalvati = localStorage.getItem("lista");
if (elemSalvati){
    finestreAperte = JSON.parse(elemSalvati);
    // console.log(finestreAperte);
}

for (let i = 0; i < source.length; i++){
    const box = creaBox(i);
    calendar.innerHTML += box;
};

// EVENTI

// rendiamo cliccabbili le finestrelle
const finestre = document.querySelectorAll(".cont");
for(let i = 0; i < finestre.length; i++){
    // seleziono per ogni volta la finestra attuale
    const finestra = finestre[i];

    // rendo le finestre cliccabili
    finestra.addEventListener("click", function() {
        // console.log("ah");
        // fallo sembrare aperto
        finestra.classList.add("apri-cont");

        // riempire il modale
        creaContModale(i);

        // mostra il modale
        apriModale();

        // mettiamo l'id alla lista finestre aperte 
        mettiInAperte(i);
    })
}

// facciamo cliccabile e funzionale il bottone del modale
modalButton.addEventListener("click", function() {
    chiudiModale();
});

// FUNZIONI

function creaBox(i){
    const data = i + 1;
    const icona = source[i].icon;
    let classi = "cont";

    //controllo se sono state aperte
    if (finestreAperte.includes(i)) {
        classi += " apri-cont";
    }

    return `
    <div class="${classi}">
        <img class="cont-icon" src="images/icons/${icona}.png" alt="icona">
        <div class="cont-data">${data}</div>
    </div>`;
}

function apriModale(){
    modal.classList.remove("no-modale");
}

function chiudiModale(){
    modal.classList.add("no-modale");
}

// funz per riempire modale
function creaContModale(i){

    const sorpresa = source[i]

    if (sorpresa.type == "image"){
        modalContent.innerHTML = `<img src="${sorpresa.url}" alt="${sorpresa.title}">`

    } else if (sorpresa.type == "text") {
        modalContent.innerHTML = `<p>${sorpresa.text}</p>`;
    }
}

//funz per aggiungere a lista aperte
function mettiInAperte(i){
    // se in finestreAperte non c'è già la i
    if (!finestreAperte.includes(i)){
        // lo mettiamo in lista
        finestreAperte.push(i);
        //lo mettiamo nel localstorage
        localStorage.setItem("lista", JSON.stringify(finestreAperte));
    }

    // console.log(finestreAperte);
}