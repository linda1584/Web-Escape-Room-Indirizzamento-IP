var col=16;
var righe=7;
$(document).ready(function(){
    creaTabella();
    $("#invio").click(controlloRisposta);
});
function creaTabella(){
    var a=1;
    var app="<table id='cruciverba'>";
    for(var i=0; i<righe;i++){
        app+="<tr id='riga"+i+"'>";
        app+="<td id='numeri"+a+"' style='border:0px;'>"+a+"</td>";
        a++;
        for(var j=0; j<col; j++){
            if(i==3 && j>2){
                app+="<td id='col"+i+j+"' class='casellaNera'></td>";
            }
            else if(i==0 && j>14){
                app+="<td id='col"+i+j+"' class='casellaNera'></td>";
            }
            else if(i==2 && j>13){
                app+="<td id='col"+i+j+"' class='casellaNera'></td>";
            }
            else{
                app+="<td id='col"+i+j+"'><input type='text' name='testo"+i+j+"' id='testo"+i+j+"'></td>";
            }
        }
        app+="</tr>";
    }
    app+="</table>";
    $("#cont-cruciverba").html(app);
}
function controlloRisposta(){
    var giusta="/1.2559";
    var risp=$("#risposta").val();
    //alert("Entro");
    if(risp===giusta){
        $("#risultato").html("<h3>Congratulazioni hai completato il cruciverba correttamente!</h3>");
        setTimeout(() => {
            var url = "enigma3.html?usati=" + encodeURIComponent(hintsUsed);
            window.location.href = url;
        }, 3000);
    }
    else{
        $("#risultato").html("<h3>Errato, riprova!</h3>");
    }
}