document.addEventListener('DOMContentLoaded', (event) => {
    // Inicializar contadores de votos
    if (!localStorage.getItem('votes1')) {
        localStorage.setItem('votes1', 0);
    }
    if (!localStorage.getItem('votes2')) {
        localStorage.setItem('votes2', 0);
    }
    if (!localStorage.getItem('votes3')) {
        localStorage.setItem('votes3', 0);
    }
    // Mostrar contadores de votos
    document.getElementById('count1').innerText = localStorage.getItem('votes1');
    document.getElementById('count2').innerText = localStorage.getItem('votes2');
    document.getElementById('count3').innerText = localStorage.getItem('votes3');
});

function submitVote() {
    if (localStorage.getItem('hasVoted') === 'true') {
        alert('Ya has votado. Solo se permite votar una vez.');
        return;
    }

    const form = document.getElementById('voteForm');
    const selectedCandidate = form.candidate.value;
    if (selectedCandidate) {
        if (selectedCandidate === 'Candidato 1') {
            let votes = parseInt(localStorage.getItem('votes1'));
            votes++;
            localStorage.setItem('votes1', votes);
            document.getElementById('count1').innerText = votes;
        } else if (selectedCandidate === 'Candidato 2') {
            let votes = parseInt(localStorage.getItem('votes2'));
            votes++;
            localStorage.setItem('votes2', votes);
            document.getElementById('count2').innerText = votes;
        } else if (selectedCandidate === 'Candidato 3') {
            let votes = parseInt(localStorage.getItem('votes3'));
            votes++;
            localStorage.setItem('votes3', votes);
            document.getElementById('count3').innerText = votes;
        }
        // Marcar que el usuario ha votado
        localStorage.setItem('hasVoted', 'true');
        alert(`Has votado por: ${selectedCandidate}`);
    } else {
        alert('Por favor, selecciona un candidato antes de votar.');
    }
}

function showTotalVotes() {
    const votes1 = localStorage.getItem('votes1');
    const votes2 = localStorage.getItem('votes2');
    const votes3 = localStorage.getItem('votes3');

    alert(`Total de votos:\nCandidato 1: ${votes1}\nCandidato 2: ${votes2}\nCandidato 3: ${votes3}`);
}
