const tmdbApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMWU1ZDYzODJlNzgzMjEwY2U2MDFjZTRjMTg4ZWQ3YyIsIm5iZiI6MTc2MjQzOTI3Ny4zLCJzdWIiOiI2OTBjYjA2ZGIxOWUxNDhiOGJkNzM3NTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._2-WOslc_jKsPHFe7huUzJbkinHavzkgzItyzUPyl1M';

async function getPopularSeries() {
    const response = await fetch('https://api.themoviedb.org/3/tv/popular', {
        headers: { 'Authorization': `Bearer ${tmdbApiKey}` }
    });
    return (await response.json()).results;
}
function seriesCard(show) {
    const img = show.poster_path
        ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
        : 'https://via.placeholder.com/300x450?text=No+Image';
    return `
        <div class="movie-card">
            <img src="${img}" alt="${show.name}">
            <div class="movie-title">${show.name}</div>
            <div class="movie-date">${show.first_air_date ? 'Première : ' + show.first_air_date : ''}</div>
            <div class="movie-overview">${show.overview || 'Aucun résumé disponible.'}</div>
            <div class="movie-rating" aria-hidden="true">Note : ${show.vote_average ? show.vote_average + ' / 10' : 'N/A'}</div>
        </div>
    `;
}
async function main() {
    const resultsEl = document.getElementById('results');
    if (!resultsEl) return;

    const results = await getPopularSeries();
    resultsEl.classList.add('movies-grid');
    resultsEl.innerHTML = results.map(seriesCard).join('');

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
}
window.onload = main;