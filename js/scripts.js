function calcularPlanosDeSaude() {
    // Obter valores do formulário
    var idade = parseInt(document.getElementById('idade').value);
    var peso = parseInt(document.getElementById('peso').value);
    var altura = parseInt(document.getElementById('altura').value);
    var imc = calcularIMC(peso, altura);

    // Verificar se todos os campos foram preenchidos
    if (!verificarCamposPreenchidos(idade, peso, altura)) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

    // Calcular preços para Operadora A
    var aBasico = 100 + (idade * 10 * (imc / 10));
    var aPadrao = (150 + (idade * 15)) * (imc / 10);
    var aPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    // Calcular fator de comorbidade para Operadora B
    var fatorComorbidade = calcularFatorComorbidade(imc);

    // Calcular preços para Operadora B
    var bBasico = 100 + (fatorComorbidade * 10 * (imc / 10));
    var bPadrao = (150 + (fatorComorbidade * 15)) * (imc / 10);
    var bPremium = (200 - (imc * 10) + (fatorComorbidade * 20)) * ( imc / 10);

    // Exibir resultados em uma tabela
    var tabelaResultado = '<table class="table">';
    tabelaResultado += '<thead><tr><th>Plano</th><th>Operadora A</th><th>Operadora B</th></tr></thead>';
    tabelaResultado += '<tbody>';
    tabelaResultado += '<tr><td>Básico</td><td>R$ ' + aBasico.toFixed(2).replace('.', ',') + '</td><td>R$ ' + bBasico.toFixed(2).replace('.', ',') + '</td></tr>';
    tabelaResultado += '<tr><td>Padrão</td><td>R$ ' + aPadrao.toFixed(2).replace('.', ',') + '</td><td>R$ ' + bPadrao.toFixed(2).replace('.', ',') + '</td></tr>';
    tabelaResultado += '<tr><td>Premium</td><td>R$ ' + aPremium.toFixed(2).replace('.', ',') + '</td><td>R$ ' + bPremium.toFixed(2).replace('.', ',') + '</td></tr>';
    tabelaResultado += '</tbody></table>';

    document.getElementById('result').innerHTML = tabelaResultado;
}

function calcularIMC(peso, altura) {
    var alturaEmMetros = altura / 100;
    return peso / (alturaEmMetros * alturaEmMetros);
}

function calcularFatorComorbidade(imc) {
    if (imc < 18.5) {
        return 10;
    } else if (imc < 24.9) {
        return 1;
    } else if (imc < 29.9) {
        return 6;
    } else if (imc < 34.9) {
        return 10;
    } else if (imc < 39.9) {
        return 20;
    } else {
        return 30;
    }
}

function verificarCamposPreenchidos(idade, peso, altura) {
    return !isNaN(idade) && !isNaN(peso) && !isNaN(altura);
}
