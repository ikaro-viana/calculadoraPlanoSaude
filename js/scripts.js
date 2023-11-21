function calcularPlanosDeSaude() {
    // Obter valores do formulário
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseInt(document.getElementById('peso').value);
    const altura = parseInt(document.getElementById('altura').value);

    // Verificar se todos os campos foram preenchidos
    if (!verificarCamposPreenchidos(idade, peso, altura)) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
    }

    const imc = calcularIMC(peso, altura);

    // Calcular preços para Operadora A
    const aBasico = 100 + (idade * 10 * (imc / 10));
    const aPadrao = (150 + (idade * 15)) * (imc / 10);
    const aPremium = (200 - (imc * 10) + (idade * 20)) * (1 + imc / 10);

    // Calcular fator de comorbidade para Operadora B
    const fatorComorbidade = calcularFatorComorbidade(imc);

    // Calcular preços para Operadora B
    const bBasico = 100 + (fatorComorbidade * 10 * (imc / 10));
    const bPadrao = (150 + (fatorComorbidade * 15)) * (imc / 10);
    const bPremium = (200 - (imc * 10) + (fatorComorbidade * 20)) * (1 + imc / 10);

    // Exibir resultados em uma tabela
    var tabelaResultado = '<table class="table">';
    tabelaResultado += '<thead><tr><th>Plano</th><th>Operadora A</th><th>Operadora B</th></tr></thead>';
    tabelaResultado += '<tbody>';
    tabelaResultado += '<tr><td>Básico</td><td>' + aBasico.toFixed(2) + '</td><td>' + bBasico.toFixed(2) + '</td></tr>';
    tabelaResultado += '<tr><td>Padrão</td><td>' + aPadrao.toFixed(2) + '</td><td>' + bPadrao.toFixed(2) + '</td></tr>';
    tabelaResultado += '<tr><td>Premium</td><td>' + aPremium.toFixed(2) + '</td><td>' + bPremium.toFixed(2) + '</td></tr>';
    tabelaResultado += '</tbody></table>';

    document.getElementById('result').innerHTML = tabelaResultado;
}

function calcularIMC(peso, altura) {
    const alturaEmMetros = altura / 100;
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
