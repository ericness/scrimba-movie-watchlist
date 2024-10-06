const baseUrl = 'https://www.omdbapi.com/'
const apiKey = '7b9077a6'
const content = document.getElementById('content')

if (!sessionStorage.getItem('watchlist')) {
    sessionStorage.setItem('watchlist', JSON.stringify([]));
}

function displayWatchlist() {
    const watchlist = JSON.parse(sessionStorage.getItem('watchlist'));
    content.innerHTML = ''

    if (watchlist.length === 0) {
        content.style.justifyContent = 'center'
        content.innerHTML = `
            <p class="content-placeholder">Your watchlist is looking a little empty...</p>
            <div class="add-some-movies">
                <a href="index.html">
                    <img src="images/plus-sign.svg" alt="Add to Watchlist" class="big-plus-sign">Let's add some movies!
                </a>
            </div>`
    }
    else {
        content.style.justifyContent = 'flex-start'
        for (const imdbID of watchlist) {
            fetch(makeTitleUrl(imdbID))
                .then(response => response.json())
                .then(detailData => {
                    content.innerHTML += `
                    <div class="movie-card">
                        <div class="movie-poster-container">
                            <img src="${detailData.Poster}" alt="Movie Poster" class="movie-poster">
                        </div>
                        <div class="movie-info">
                            <div class="movie-title-container">
                                <h2 class="movie-title">${detailData.Title}</h2>
                                <p class="movie-rating">⭐ ${detailData.imdbRating}</p>
                            </div>
                            <div class="movie-details">
                                <div class="movie-runtime">${detailData.Runtime}</div>
                                <div class="movie-genre">${detailData.Genre}</div>
                                <div class="remove-from-watchlist" data-imdbid="${detailData.imdbID}">
                                    <img src="images/minus-sign.svg" alt="Remove from Watchlist" class="minus-sign">
                                    Remove from Watchlist
                                </div>
                            </div>
                            <div class="movie-plot">${detailData.Plot}</div>
                        </div>
                    </div>
                    `
                })
                .then(() => {
                    removeWatchlistEventListeners();
                })
        }
    }
}

function makeTitleUrl(imdbId) {
    return baseUrl + `?apikey=${apiKey}&i=${imdbId}`
}

function removeWatchlistEventListeners() {
    const watchlistButtons = document.querySelectorAll('.remove-from-watchlist');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const imdbID = this.getAttribute('data-imdbid');
            removeFromWatchlist(imdbID);
        });
    });
}

function removeFromWatchlist(imdbID) {
    let watchlist = JSON.parse(sessionStorage.getItem('watchlist'));
    watchlist = watchlist.filter(id => id !== imdbID);
    sessionStorage.setItem('watchlist', JSON.stringify(watchlist));
    console.log(`Removed ${imdbID} from watchlist`);
    displayWatchlist();
}

displayWatchlist();