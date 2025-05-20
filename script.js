function toggleRules() {
    const rules = document.getElementById("rules");
    rules.classList.toggle("show");
}

function sortPower() {
    const today = new Date().toDateString(); // Obtém a data de hoje
    const lastClickDate = localStorage.getItem('lastPowerClickDate'); // Pega a última data de clique
    const powerBox = document.querySelector(".power-box");
    const powerTextElement = document.getElementById("power-text");

    // Verifica se já clicou hoje
    if (lastClickDate === today) {
        console.log("Você já usou a Caixa de Poder hoje!");
        // A mensagem da última caixa sorteada já será carregada pelo window.onload
        // Não é necessário desabilitar aqui novamente, pois o onload já fará isso
        return; // Sai da função
    }

    // Defina seus poderes com os respectivos pesos
    // Quanto maior o peso, maior a chance de ser sorteado
    const powersWithWeights = [
        { text: "Replay do Treino: repita 1 ponto da semana passada.", weight: 1 }, 
        { text: "Modo Lendário: só pontua com check-in criativo na próxima semana.", weight: 1 }, 
        { text: "Acordei no Hype: check-in até 8h vale 2 pontos.", weight: 1 }, 
        { text: "Treino da Madrugada: check-in entre 0h-6h vale +1 ponto.", weight: 1 },
        { text: "Treino em Dobro: 2 check-ins em um dia, 2 pontos.", weight: 1 },
        { text: "Peso da Coroa: um check-in da próxima semana não contará ponto.", weight: 4 }, 
        { text: "Meta Oculta: 5 check-ins na semana = +1 ponto extra.", weight: 1 },
        { text: "Treino Premiado: sorteie 1 a 3, faça check-ins seguidos e ganhe pontos.", weight: 1 },
        { text: "Bug no App: O jogador que invocou esta carta escolhe 2 dias da próxima semana nos quais os check-ins dos outros jogadores não contarão ponto.", weight: 4 } 
    ];

    // Calcula o peso total
    const totalWeight = powersWithWeights.reduce((sum, power) => sum + power.weight, 0);

    // Gera um número aleatório entre 0 e o peso total
    let randomWeight = Math.random() * totalWeight;

    let chosenPowerText = "";
    let chosenPowerIndex = -1; // Para manter a numeração original se desejar

    // Encontra o poder correspondente ao peso sorteado
    for (let i = 0; i < powersWithWeights.length; i++) {
        randomWeight -= powersWithWeights[i].weight;
        if (randomWeight <= 0) {
            chosenPowerText = powersWithWeights[i].text;
            chosenPowerIndex = i;
            break;
        }
    }

    // Armazena a data do clique e o texto do poder no localStorage
    localStorage.setItem('lastPowerClickDate', today);
    localStorage.setItem('lastSortedPowerText', chosenPowerText); // Armazena o texto sorteado

    // Desabilita o clique após o uso para o dia atual
    powerBox.style.pointerEvents = 'none';
    powerBox.style.opacity = '0.6';

    powerBox.style.transform = "rotate(360deg)";
    // Se quiser mostrar o índice + 1 (como antes)
    // powerTextElement.textContent = chosenPowerIndex + 1;
    // Ou, se preferir, pode mostrar um "?" durante a animação
    powerTextElement.textContent = "?";


    setTimeout(() => {
        powerTextElement.textContent = chosenPowerText; // Exibe o poder sorteado após a rotação
        // Reset da rotação para permitir nova animação no futuro (se habilitado novamente)
        // powerBox.style.transform = "rotate(0deg)"; // Opcional
    }, 500); // Tempo da animação de rotação
}

// Adiciona uma checagem ao carregar a página para ver se o botão já foi clicado hoje
window.onload = function() {
    const today = new Date().toDateString();
    const lastClickDate = localStorage.getItem('lastPowerClickDate');
    const lastSortedPowerText = localStorage.getItem('lastSortedPowerText');
    const powerBox = document.querySelector(".power-box");
    const powerTextElement = document.getElementById("power-text");

    if (lastClickDate === today && lastSortedPowerText) {
        powerTextElement.textContent = lastSortedPowerText;
        powerBox.style.pointerEvents = 'none';
        powerBox.style.opacity = '0.6';
    } else {
        powerTextElement.textContent = "?";
        powerBox.style.pointerEvents = 'auto';
        powerBox.style.opacity = '1';
        // Limpa o lastSortedPowerText se for um novo dia e não houver clique
        // Ou se o lastClickDate for nulo (primeira vez)
        if (lastClickDate !== today) {
            localStorage.removeItem('lastSortedPowerText'); // Garante que não mostre um poder antigo se a data mudou
        }
    }
};