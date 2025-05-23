let usati = 0;  // indizi usati
let risolto = false;  // controllo se è stato risolto


/* DOCUMENT.READY */
$(()=> {    
    $("#hints-counter").text(usati + "/3");   // contatore indizi
    
    dragAndDrop();
    
    checkAllPuzzles(); // Controlla se l'enigma è stato risolto e passa all'enigma 2
});



function checkAllPuzzles() {    
    if (risolto) {
        mostraSuccesso();   // mostra sms successo
        setTimeout(() => {
            var url = "enigma2.html?usati=" + encodeURIComponent(usati); // Aggiungi il nome alla query string
            window.location.href = url; // Vai alla pagina 2 con il parametro
        }, 3000); // se l'enigma è risolto si passa al numero 2
    }
}



/* INDIZI */
function showHint() {   // richiamata in common.js
    if (usati >= 3) {
        alert("Hai già utilizzato tutti gli indizi disponibili per questa stanza");
        return;
    }
    
    usati++;
    $("#hints-counter").text(usati + "/3");
    
    if (!risolto){
        if (usati === 1) {
            $("#hint-display").html("1° -  Questo è un esempio d'indirizzo pubblico : <b>168.172.1.0 /24</b>").fadeIn();
        } else if (usati === 2) {
            $("#hint-display").html("2° -  Questo è un esempio d'indirizzo privato: <b>10.0.0.0 /8</b>").fadeIn();
        } else {
            $("#hint-display").html("3° -  <img src=\"immagini/tabella.png\" alt=\"tabella\">").fadeIn();
    }
    }
}


/* MOSTRA SMS SUCCESSO */
function mostraSuccesso() {
    $("#puzzle-feedback") 
        .removeClass("puzzle-error")
        .addClass("puzzle-success")
        .text("Enigma 1 completato")
        .show();
}

/* MOSTRA SMS ERRORE */
function mostraErrore() {
    $("#puzzle-feedback")  // concatenazione di funzioni 
        .removeClass("puzzle-success")
        .addClass("puzzle-error")
        .text("Risposta sbagliata")
        .show();
    
    setTimeout(()=> { $("#puzzle-feedback").fadeOut(); }, 3000);   // Nascondi il messaggio
}


/* DRAG AND DROP */

function dragAndDrop() {
    const indirizzi = $(".indirizzi");  // per rimettere tra gli altri indirizzi se lo slot è già occupato

    // non posso usare le arrow funcion (this punterebbe a window)
    $(".elemento").on("dragstart", function (e) {   // dragstart: evento che si verifica quando l'utente inizia a trascinare un oggetto 
        e.originalEvent.dataTransfer.setData("text/plain", ""); // necessario per compatibilità
        $(this).addClass("dragging");
    });

    // Quando termina il trascinamento
    $(".elemento").on("dragend", function () {
        $(this).removeClass("dragging");
    });

    $(".zona, .indirizzi").on("dragover", function (e) { // dragover: abilita il drop nelle varie zone e nel div indirizzi pk il brw non lo fa di default
        e.preventDefault();         // x disattivare il comportamento predefinito del brw, obbligatorio
    });

    
    $(".zona, .indirizzi").on("drop", function (e) {   // drop: quando si rilascia un elemento in una zona o tra gli altri indirizzi
        e.preventDefault(); // obbligatorio
        const dragged = $(".dragging");

        // Se zona già occupata, rimetti nella lista
        if ($(this).hasClass("zona") && $(this).children().length > 0) {
            indirizzi.append(dragged);
        } else {
            $(this).append(dragged);
        }

        dragged.removeClass("dragging");
    });

    // Verifica correttezza
    $("#invio").click(()=> {
        let corretto = true;

        $(".zona").each(function () {
            const zonaTipo = $(this).closest(".zone").attr("id");
            const elemento = $(this).children(".elemento");

            if (elemento.length === 0) {
                corretto = false; 
                return;
            }

            const tipoIndirizzo = elemento.data("value"); // "pubblico" o "privato"

            if ((zonaTipo === "private" && tipoIndirizzo !== "privato") ||
                (zonaTipo === "public" && tipoIndirizzo !== "pubblico")) {
                corretto = false;
            }
        });

        if (corretto) {
            risolto = true;
            checkAllPuzzles();
        } else {
            mostraErrore();
        }
    });
}
