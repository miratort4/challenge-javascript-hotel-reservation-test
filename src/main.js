function Hotel(nome, classificacao, total) {
    this.nome = nome;
    this.classificacao = classificacao;
    this.total = total;
}

var Lakewood = new Hotel("Lakewood", 3, 0);
var Bridgewood = new Hotel("Bridgewood", 4, 0);
var Ridgewood = new Hotel("Ridgewood", 5, 0);

var listaHoteis = [Lakewood, Bridgewood, Ridgewood];

function getCheapestHotel (str) { //DO NOT change the function's name.
    var tipoCliente = str.substr(0,7);      // tipo de cliente: Regular ou Rewards
    var listaDiasDeHospedagem = [];         // lista com os dias da semana em que se estará hospedado 

    var listaAux = str.split(',');
    var diasHospedagem = listaAux.length;   // quantidade de dias de hospedagem

    var nSemana = 0;                        // quantidade de dias que caiu durante a semana
    var nFinalDeSemana = 0;                 // quantidade de dias que caiu durante o final de semana

    var regex = /\((.*)\)/;         
    for(i = 0; i < diasHospedagem; i++){
        var dia = regex.exec(listaAux[i])[1];
        if (dia == "mon" || dia == "tues" || dia == "wed" || dia == "thur" || dia == "fri") { nSemana++; }
        else if (dia == "sat" || dia == "sun"){ nFinalDeSemana++; }
        else { return "Invalid day of the week"}
        listaDiasDeHospedagem.push(dia);         
    }
    
    // total a pagar para cada hotel: Lakewood, Bridgewood e Ridgewood respectivamente
    totalLake = 0;
    totalBrid = 0;
    totalRid = 0;

    // realiza o calculo do preço total de diárias conforme o tipo de cliente 
    if(tipoCliente == "Regular") {
        totalLake = (nSemana * 110) + (nFinalDeSemana * 90);
        totalBrid = (nSemana * 160) + (nFinalDeSemana * 60);
        totalRid = (nSemana * 220) + (nFinalDeSemana * 150);
    }
    else if(tipoCliente == "Rewards") {
        totalLake = (nSemana * 80) + (nFinalDeSemana * 80);
        totalBrid = (nSemana * 110) + (nFinalDeSemana * 50);
        totalRid = (nSemana * 100) + (nFinalDeSemana * 40);
    }
    else{
        return "Invalid client type";
    }

    Lakewood.total = totalLake;
    Bridgewood.total = totalBrid;
    Ridgewood.total = totalRid;

    const menorValor = Math.min(totalLake, totalBrid, totalRid);    

    const menoresValores = listaHoteis.filter(({        // lista com os hoteis que tem o menor valor. 
        total
    }) => total === menorValor);

    if(menoresValores.length > 1) {         // caso tamanho da lista for maior que 1, então teve empate de menores preços entre hotéis
        
        const melhorClassificacao = Math.max(...menoresValores.map(({       //critério de desempate: encontra hotel que tem a maior classificação
            classificacao
        }) => classificacao))

        const melhorHotel = listaHoteis.filter(({        // lista com o hotel que tem a melhor classificação. 
            classificacao
        }) => classificacao === melhorClassificacao);

        return melhorHotel[0].nome
        
    }
    else {      //se não, não teve empate
        return menoresValores[0].nome 
    }
    // return "Cheapest hotel name"
}

exports.getCheapestHotel = getCheapestHotel



/*
TIPO DE TAXAS:
-Dia de Semana / Final de Semana
-Fidelidade / Normal

LAKEWOOD: ***
    -Dia de semana:
        -Fidelidade:    R$ 80
        -Normal:        R$ 110

    -Final de Semana:
        -Fidelidade:    R$ 80
        -Normal:        R$ 90

Bridgewood: ****
    -Dia de semana:
        -Fidelidade:    R$ 110
        -Normal:        R$ 160

    -Final de Semana:
        -Fidelidade:    R$ 50
        -Normal:        R$ 60

Ridgewood: *****
    -Dia de semana:
        -Fidelidade:    R$ 100
        -Normal:        R$ 220

    -Final de Semana:
        -Fidelidade:    R$ 40
        -Normal:        R$ 150

Ex entrada: 
"Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)"
"Rewards: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)"
"Regular: 20Mar2009(fri), 21Mar2009(sat), 22Mar2009(sun)"

Sunday:     sun
Monday:     mon
Tuesday:    tues
Wednesday:  wed
Thursday:   thur
Friday:     fri
Saturday:   sat
*/