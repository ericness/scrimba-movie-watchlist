const baseUrl = 'https://www.omdbapi.com/'
const apiKey = '7b9077a6'
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('searchbox')
const content = document.getElementById('content')

if (!sessionStorage.getItem('watchlist')) {
    sessionStorage.setItem('watchlist', JSON.stringify([]));
}
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const searchTerm = searchBox.value.trim();
    if (searchTerm) {
        fetch(makeSearchUrl(searchTerm))
            .then(response => response.json())
            .then(data => {
                content.style.justifyContent = 'flex-start'
                content.innerHTML = ""
                for (const movie of data.Search) {
                    fetch(makeTitleUrl(movie.imdbID))
                        .then(response => response.json())
                        .then(detailData => {
                            console.log(detailData);
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
                                        <div class="add-to-watchlist" data-imdbid="${detailData.imdbID}">
                                            <img src="images/plus-sign.svg" alt="Add to Watchlist" class="plus-sign">
                                            Add to Watchlist
                                        </div>
                                    </div>
                                    <div class="movie-plot">${detailData.Plot}</div>
                                </div>
                            </div>
                            `
                        })
                        .then(() => {
                            addWatchlistEventListeners();
                        })
                }
            });
    } else {
        console.log('Please enter a search term');
    }
})


function makeSearchUrl(searchTerm) {
    return baseUrl + `?apikey=${apiKey}&s=${searchTerm}`
}

function makeTitleUrl(imdbId) {
    return baseUrl + `?apikey=${apiKey}&i=${imdbId}`
}

function addWatchlistEventListeners() {
    const watchlistButtons = document.querySelectorAll('.add-to-watchlist');
    watchlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const imdbID = this.getAttribute('data-imdbid');
            addToWatchlist(imdbID);
        });
    });
}

function addToWatchlist(imdbID) {
    let watchlist = JSON.parse(sessionStorage.getItem('watchlist'));
    if (!watchlist.includes(imdbID)) {
        watchlist.push(imdbID);
        sessionStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log(`Added ${imdbID} to watchlist`);
        // You can add visual feedback here, like changing the button text or style
    } else {
        console.log(`${imdbID} is already in the watchlist`);
    }
}