/*TO DO
    - CONTROLLA CHE L'ENIGMA VADA BENE X TUTTO
    - FAI I SUGGERIMENTI
    - FAI I COLLEGAMENTI DEI SUGGERIMENTI
    - COMMENTA LE SPIEGAZIONI DELLE COSE CHE HAI CHISTO A CHATTI o che cmq non sai fare*/

//variabili (globali) x vedere se il campo corretto o meno
var validoVer = false;
var validoHlen = false;
var validoTos = false;
var validoTotL = false;
var validoFid = false;
var validoFlags = false;
var validoFoffset = false;
var validoTtl = false;
var validoProtocol = false;
var validoChecksum = false;
var validoSource = false;
var validoDest = false;
var validoOptions = false;


var ver = $("#Ver");
var hlen = $("#HLEN");
var tos = $("#TOS");
var totL = $("#TotalLength");
var fId = $("#FragmentIdentification");
var flags = $("#flags");
var fOffset = $("#FragOffset");
var ttl = $("#ttl");
var protocol = $("#protocol");
var headerChecksum = $("#headerChecksum");
var sourceAddress = $("#sourceAddress");
var destinationAddress = $("#destinationAddress");
var options = $("#options");

var contaIndizi = new URLSearchParams(window.location.search).get('usati');


$(document).ready(function () {
    controllaCampi();

    //richiesta di suggerimenti
    $("#hint-btn").click(showHint);

    // Aggiorna il contatore degli indizi se esiste
    if (contaIndizi) { // Controlla se 'usati' esiste
        $("#contaSugg").text(contaIndizi + "/3"); // Se esiste, lo visualizzi
    }
    
});

    function controllaCampi() {
        ver.on("blur", function () { //quando il campo <input> perde il focus si avvia la funzione di correzione dell'eventuale errore
            if (ver.val().trim() == "" || ver.val().trim().toUpperCase() != "VER") {
                if (ver.next("label.errore").length === 0) {  //cerca se c'è un elemento label con la classe .errore immediatamente dopo  #Ver
                    ver.after("<label class='errore'>Errato!</label>");
                }
                validoVer = false;
            } else {
                ver.next("label.errore").remove(); // eventuali messaggi di errore già mostrati rimossi se inseriti corretti ora
                validoVer = true;
            }
            controllaTuttiValidi(); //sblocca domanda del campo dati
        });
    
    
        hlen.on("blur", function () {
            if (hlen.val().trim() == "" || hlen.val().trim().toUpperCase() != "HLEN") {
                if (hlen.next("label.errore").length === 0) {
                    hlen.after("<label class='errore'>Errato!</label>");
                }
                validoHlen = false;
            } else {
                hlen.next("label.errore").remove();
                validoHlen = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        tos.on("blur", function () {
            if (tos.val().trim() == "" || tos.val().trim().toUpperCase() != "TOS(DS)" && tos.val().trim().toUpperCase() != "TOS (DS)") {
                if (tos.next("label.errore").length === 0) {
                    tos.after("<label class='errore'>Errato!</label>");
                }
                validoTos = false;
            } else {
                tos.next("label.errore").remove();
                validoTos = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        totL.on("blur", function () {
            if (totL.val().trim() == "" || totL.val().trim().toUpperCase() != "TOTAL LENGTH") {
                if (totL.next("label.errore").length === 0) {
                    totL.after("<label class='errore'>Errato!</label>");
                }
                validoTotL = false;
            } else {
                totL.next("label.errore").remove();
                validoTotL = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        fId.on("blur", function () {
            if (fId.val().trim() == "" || fId.val().trim().toUpperCase() != "FRAGMENT IDENTIFICATION") {
                if (fId.next("label.errore").length === 0) {
                    fId.after("<label class='errore'>Errato!</label>");
                }
                validoFid = false;
            } else {
                fId.next("label.errore").remove();
                validoFid = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        flags.on("blur", function () {
            if (flags.val().trim() == "" || flags.val().trim().toUpperCase() != "FLAGS") {
                if (flags.next("label.errore").length === 0) {
                    flags.after("<label class='errore'>Errato!</label>");
                }
                validoFlags = false;
            } else {
                flags.next("label.errore").remove();
                validoFlags = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        fOffset.on("blur", function () {
            if (fOffset.val().trim() == "" || fOffset.val().trim().toUpperCase() != "FRAGMENT OFFSET") {
                if (fOffset.next("label.errore").length === 0) {
                    fOffset.after("<label class='errore'>Errato!</label>");
                }
            validoFoffset = false;
            } else {
                fOffset.next("label.errore").remove();
                validoFoffset = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        ttl.on("blur", function () {
            if (ttl.val().trim() == "" || ttl.val().trim().toUpperCase() != "TTL" && ttl.val().trim().toUpperCase() != "TIME TO LIVE") {
                if (ttl.next("label.errore").length === 0) {
                    ttl.after("<label class='errore'>Errato!</label>");
                }
            validoTtl = false;
            } else {
                ttl.next("label.errore").remove();
                validoTtl = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        protocol.on("blur", function () {
            if (protocol.val().trim() == "" || protocol.val().trim().toUpperCase() != "PROTOCOL") {
                if (protocol.next("label.errore").length === 0) {
                    protocol.after("<label class='errore'>Errato!</label>");
                }
            validoProtocol = false;
            } else {
                protocol.next("label.errore").remove();
                validoProtocol = true;
            }
            controllaTuttiValidi(); 
        });
    
        headerChecksum.on("blur", function () {
            if (headerChecksum.val().trim() == "" || headerChecksum.val().trim().toUpperCase() != "HEADER CHECKSUM") {
                if (headerChecksum.next("label.errore").length === 0) {
                    headerChecksum.after("<label class='errore'>Errato!</label>");
                }
                validoChecksum = false;
            } else {
                headerChecksum.next("label.errore").remove();
                validoChecksum = true;
            }
            controllaTuttiValidi(); 
        });
    
        sourceAddress.on("blur", function () {
            if (sourceAddress.val().trim() == "" || sourceAddress.val().trim().toUpperCase() != "SOURCE ADDRESS") {
                if (sourceAddress.next("label.errore").length === 0) {
                    sourceAddress.after("<label class='errore'>Errato!</label>");
                }
            validoSource = false;
            } else {
                sourceAddress.next("label.errore").remove();
                validoSource = true;
            }
            controllaTuttiValidi(); 
        });
    
        destinationAddress.on("blur", function () {
            if (destinationAddress.val().trim() == "" || destinationAddress.val().trim().toUpperCase() != "DESTINATION ADDRESS") {
                if (destinationAddress.next("label.errore").length === 0) {
                    destinationAddress.after("<label class='errore'>Errato!</label>");
                }
                validoDest = false;
            } else {
                destinationAddress.next("label.errore").remove();
                validoDest = true;
            }
            controllaTuttiValidi(); 
        });
    
    
        options.on("blur", function () {
            if (options.val().trim() == "" || options.val().trim().toUpperCase() != "OPTIONS") {
                if (options.next("label.errore").length === 0) {
                    options.after("<label class='errore'>Errato!</label>");
                }
                validoOptions = false;
            } else {
                options.next("label.errore").remove();
                validoOptions = true;
            }
            controllaTuttiValidi(); 
        });

    
    
    }

function controllaTuttiValidi() {
    if (validoVer && validoHlen && validoTos && validoTotL && validoFid && validoFlags &&  validoFoffset &&  validoTtl &&  validoProtocol && validoChecksum && validoSource && validoDest && validoOptions )
        {
            $("#campoDati").text("Quali sono i campi usati per la frammentazione del datagramma? Scrivili in ordine crescente per dimensione (bit).");
            $("#risposta").prop("disabled", false);
            $("#risposta").on("blur", rispFinale);
            
       }
        else {
            $("#campoDati").text("???");
            $("#risposta").prop("disabled", true);
        }
    }


    function rispFinale() {
        let risposta = $("#risposta").val().trim().toUpperCase();
        let rispostaCorretta = "FLAGS, FRAGMENT OFFSET, FRAGMENT IDENTIFICATION".toUpperCase();
        
        if(!risposta.localeCompare(rispostaCorretta)) {
            $("#stanza6").prop("disabled", false);
            window.location.href = "../room6/index.html";
        }
    }


function showHint(){
    contaIndizi++;
    if(contaIndizi < 3){
        $("#contaSugg").text(contaIndizi + "/3");
        if(contaIndizi == 1){
            $("#sugg1").html("<img src='immagini/sugg1_enigma3.png' alt='suggeriemnto 1'></img>").fadeIn();
        }
        else if(contaIndizi == 2){
            $("#sugg2").html("<img src='immagini/sugg3_enigma3.png' alt='suggeriemnto 2'></img>").fadeIn();
        }
        else if(contaIndizi == 3){
            $("#sugg3").text("I campi dell'header che si occupano della frammentazione si trovano nella seconda riga").fadeIn();
        }
    }
    else{
        alert("Hai terminato tutti gli indizi a disposizione");
    }


}
    