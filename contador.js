const inicio = new Date("2022-12-17T14:00:00"); // Data e hora de início do namoro
const diasElem = document.getElementById("dias");
const mesesElem = document.getElementById("meses");
const horasElem = document.getElementById("horas");
const minutosElem = document.getElementById("minutos");

function atualizarContador() {
    const agora = new Date(); // Data e hora atuais
    
    // Calcula o tempo total em milissegundos
    let diff = agora - inicio;

    // Calcula anos, meses, dias, horas e minutos
    const anos = agora.getFullYear() - inicio.getFullYear();
    let meses = agora.getMonth() - inicio.getMonth();
    let dias = agora.getDate() - inicio.getDate();
    let horas = agora.getHours() - inicio.getHours();
    let minutos = agora.getMinutes() - inicio.getMinutes();

    // Ajusta para valores negativos e transições de meses e anos
    if (dias < 0) {
        meses -= 1;
        const ultimoDiaMesPassado = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
        dias += ultimoDiaMesPassado;
    }

    if (meses < 0) {
        meses += 12;
    }

    if (horas < 0) {
        horas += 24;
        dias -= 1;
    }

    if (minutos < 0) {
        minutos += 60;
        horas -= 1;
    }

    // Atualiza os elementos no HTML
    mesesElem.textContent = meses;
    diasElem.textContent = dias;
    horasElem.textContent = horas;
    minutosElem.textContent = minutos;
}

// Atualiza o contador a cada segundo
setInterval(atualizarContador, 1000);
