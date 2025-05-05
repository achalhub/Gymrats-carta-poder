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
        // Opcional: Pode manter uma indicação visual de desabilitação
        powerBox.style.pointerEvents = 'none';
        powerBox.style.opacity = '0.6';
        // A mensagem da última caixa sorteada já será carregada pelo window.onload
        return; // Sai da função
    }

    const powers = [
        "Replay do Treino: repita 1 ponto da semana passada.",
        "Modo Lendário: só pontua com check-in criativo na próxima semana.",
        "Acordei no Hype: check-in até 8h vale 2 pontos.",
        "Treino da Madrugada: check-in entre 0h-6h vale +1 ponto.",
        "Treino em Dobro: 2 check-ins em um dia, 2 pontos.",
        "Peso da Coroa: um check-in da próxima semana não contará ponto.",
        "Meta Oculta: 5 check-ins na semana = +1 ponto extra.",
        "Treino Premiado: sorteie 1 a 3, faça check-ins seguidos e ganhe pontos.",
        "Bug no App: O jogador que invocou esta carta escolhe 2 dias da próxima semana nos quais os check-ins dos outros jogadores não contarão ponto."
    ];

    const powerNumber = Math.floor(Math.random() * powers.length);
    const powerText = powers[powerNumber];

    // Armazena a data do clique e o texto do poder no localStorage
    localStorage.setItem('lastPowerClickDate', today);
    localStorage.setItem('lastSortedPowerText', powerText); // Armazena o texto sorteado

    // Desabilita o clique após o uso para o dia atual
    powerBox.style.pointerEvents = 'none';
    powerBox.style.opacity = '0.6'; // Opcional: Muda a aparência

    powerBox.style.transform = "rotate(360deg)";
    powerTextElement.textContent = powerNumber + 1; // Exibe o número sorteado
    setTimeout(() => {
        powerTextElement.textContent = powerText; // Exibe o poder sorteado após a rotação
    }, 500);
}

// Adiciona uma checagem ao carregar a página para ver se o botão já foi clicado hoje
window.onload = function() {
    const today = new Date().toDateString();
    const lastClickDate = localStorage.getItem('lastPowerClickDate');
    const lastSortedPowerText = localStorage.getItem('lastSortedPowerText'); // Pega o último texto sorteado
    const powerBox = document.querySelector(".power-box");
    const powerTextElement = document.getElementById("power-text");

    if (lastClickDate === today && lastSortedPowerText) {
        // Se já clicou hoje e há um texto sorteado armazenado
        powerTextElement.textContent = lastSortedPowerText; // Exibe o último texto sorteado
        powerBox.style.pointerEvents = 'none';
        powerBox.style.opacity = '0.6';
    } else {
        // Garante que o botão está habilitado e mostra "?"
        powerTextElement.textContent = "?";
        powerBox.style.pointerEvents = 'auto';
        powerBox.style.opacity = '1';
        // Opcional: Limpa o lastSortedPowerText se for um novo dia e não houver clique
        if (lastClickDate !== today) {
             localStorage.removeItem('lastSortedPowerText');
        }
    }
}