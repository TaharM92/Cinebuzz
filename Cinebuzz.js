const tmdbApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWU1ZDYzODJlNzgzMjEwY2U2MDFjZTRjMTg4ZWQ3YyIsIm5iZiI6MTc2MjQzOTI3Ny4zLCJzdWIiOiI2OTBjYjA2ZGIxOWUxNDhiOGJkNzM3NTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._2-WOslc_jKsPHFe7huUzJbkinHavzkgzItyzUPyl1M';

async function getTrending() {
    const url = 'https://api.themoviedb.org/3/trending/all/week';
    const response = await fetch(url, { headers: { 'Authorization': `Bearer ${tmdbApiKey}` } });
    return (await response.json()).results;
}
function cardTemplate(item) {
    const isMovie = !!item.title;
    const title = isMovie ? item.title : item.name;
    const date = isMovie ? item.release_date : item.first_air_date;
    const img = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image';
    return `
        <div class="movie-card">
            <img src="${img}" alt="${title}">
            <div class="movie-title">${title}</div>
            <div class="movie-date">${date ? (isMovie ? 'Sortie : ' + date : 'Première : ' + date) : ''}</div>
            <div class="movie-overview">${item.overview || 'Aucun résumé disponible.'}</div>
            <div class="movie-rating" aria-hidden="true">Note : ${item.vote_average ? item.vote_average + ' / 10' : 'N/A'}</div>
        </div>
    `;
}
async function main() {
    const resultsEl = document.getElementById('results');
    if (!resultsEl) return;

    resultsEl.innerHTML = '<p class="muted">Chargement des contenus populaires...</p>';
    try {
        const results = await getTrending();
        resultsEl.classList.add('movies-grid');
        resultsEl.innerHTML = results.map(cardTemplate).join('');

        resultsEl.addEventListener('click', (e) => {
            const card = e.target.closest('.movie-card');
            if (!card) return;
            card.classList.toggle('show-rating');
            const rating = card.querySelector('.movie-rating');
            if (rating) {
                const isShown = card.classList.contains('show-rating');
                rating.setAttribute('aria-hidden', String(!isShown));
            }
        });
    } catch (err) {
        resultsEl.innerHTML = `<p class="muted">Erreur: ${err.message}</p>`;
    }
}
window.onload = main;