document.addEventListener('DOMContentLoaded', (event) => {
    // Obtener contadores de votos del servidor
    fetchVotes();
});

function fetchVotes() {
    axios.get('http://localhost:3000/votes')
        .then(response => {
            const votes = response.data;
            document.getElementById('count1').innerText = votes.find(vote => vote.candidate === 'Candidato 1').count;
            document.getElementById('count2').innerText = votes.find(vote => vote.candidate === 'Candidato 2').count;
            document.getElementById('count3').innerText = votes.find(vote => vote.candidate === 'Candidato 3').count;
        })
        .catch(error => {
            console.error('Error fetching votes:', error);
        });
}

function submitVote() {
    if (localStorage.getItem('hasVoted') === 'true') {
        alert('Ya has votado. Solo se permite votar una vez.');
        return;
    }

    const form = document.getElementById('voteForm');
    const selectedCandidate = form.candidate.value;
    if (selectedCandidate) {
        axios.post('http://localhost:3000/vote', { candidate: selectedCandidate })
            .then(response => {
                // Marcar que el usuario ha votado
                localStorage.setItem('hasVoted', 'true');
                alert(`Has votado por: ${selectedCandidate}`);
                fetchVotes();
            })
            .catch(error => {
                console.error('Error submitting vote:', error);
            });
    } else {
        alert('Por favor, selecciona un candidato antes de votar.');
    }
}

function showTotalVotes() {
    axios.get('http://localhost:3000/votes')
        .then(response => {
            const votes = response.data;
            alert(`Total de votos:\nCandidato 1: ${votes.find(vote => vote.candidate === 'Candidato 1').count}\nCandidato 2: ${votes.find(vote => vote.candidate === 'Candidato 2').count}\nCandidato 3: ${votes.find(vote => vote.candidate === 'Candidato 3').count}`);
        })
        .catch(error => {
            console.error('Error fetching votes:', error);
        });
}
