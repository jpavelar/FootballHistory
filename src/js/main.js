"use strict";
const env = require('./.env');
Object.keys(env).forEach(key => {
    process.env[key] = env[key];
});
const apiKey = process.env.API_KEY;
document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://football-highlights-api.p.rapidapi.com/matches?countryCode=SE&limit=20';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'football-highlights-api.p.rapidapi.com'
        }
    };
    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
        displayMatches(data);
    })
        .catch(error => console.error('Erro ao buscar dados:', error));
});
function displayMatches(data) {
    const matchesContainer = document.getElementById('matches');
    if (data && data.data && Array.isArray(data.data)) {
        data.data.forEach((match) => {
            var _a;
            const matchElement = document.createElement('div');
            matchElement.className = 'match';
            matchElement.innerHTML = `
              <div class="match-details">
                <img class="logoteam" src="${match.homeTeam.logo || ''}" alt="${match.homeTeam.name || 'Time da Casa'}"> <span class="bold">VS</span> <img class="logoteam" src="${match.awayTeam.logo || ''}" alt="${match.awayTeam.name || 'Time Visitante'}">
                <p><span class="bold">Data:</span> ${new Date(match.date).toLocaleDateString()}</p>
                <p><span class="bold">Resultado:</span> ${match.state.score.current || 'N/A'}</p>
                <p><span class="bold">Descrição:</span> ${match.state.description || 'N/A'}</p>
                <p><span class="bold">Rodada:</span> ${match.round || 'N/A'}</p>
                <p><span class="bold">Temporada:</span> ${match.league.season || 'N/A'}</p>
                <p><span class="bold">Competição:</span> <img src="${match.league.logo || ''}" alt="${match.league.name || 'Competição'}" style="width: 20px; height: 20px;"> ${match.league.name || 'N/A'}</p>
                
              </div>
            `;
            (_a = document.getElementById('matches')) === null || _a === void 0 ? void 0 : _a.appendChild(matchElement);
        });
    }
    else {
        console.error('Dados inválidos');
    }
}
