function toggleRules() {
    const rules = document.getElementById("rules");
    rules.classList.toggle("show");
}

function sortPower() {
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

    const powerBox = document.querySelector(".power-box");
    const powerTextElement = document.getElementById("power-text");

    powerBox.style.transform = "rotate(360deg)";
    powerTextElement.textContent = powerNumber + 1; // Exibe o número sorteado
    setTimeout(() => {
        powerTextElement.textContent = powerText; // Exibe o poder sorteado após a rotação
    }, 500);
}
