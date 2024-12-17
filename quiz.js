document.getElementById('submit-quiz').addEventListener('click', function () {
    const answers = {
        q1: "b", // Resposta correta: Pagode
        q2: "a", // Resposta correta: Ele
        q3: "a", // Resposta correta: Ele
        q4: "b", // Resposta correta: Lasanha
        q5: "c", // Resposta correta: Lasanha
        q6: "a", // Resposta correta: Lasanha
        q7: "b", // Resposta correta: Lasanha
        q8: "b", // Resposta correta: Lasanha
        q9: "a", // Resposta correta: Lasanha
        q10: "a", // Resposta correta: Lasanha
    };

    let score = 0;

    // Verifica todas as respostas
    Object.keys(answers).forEach((key) => {
        const radios = document.getElementsByName(key);
        for (const radio of radios) {
            const parentLabel = radio.parentElement;

            // Remove classes anteriores
            parentLabel.classList.remove('correct', 'incorrect');

            if (radio.checked) {
                if (radio.value === answers[key]) {
                    score++;
                    parentLabel.classList.add('correct'); // Marca como correto
                } else {
                    parentLabel.classList.add('incorrect'); // Marca como incorreto
                }
            } else if (radio.value === answers[key]) {
                parentLabel.classList.add('correct'); // Mostra a resposta correta
            }
        }
    });

    // Exibe o resultado
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>Você acertou ${score} de 10 perguntas!</h2>`;
    resultDiv.style.display = "block"; // Mostra o resultado
});
