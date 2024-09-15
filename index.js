const baseUrl = 'https://www.omdbapi.com/'
const apiKey = '7b9077a6'
const searchForm = document.getElementById('search-form')
const searchBox = document.getElementById('searchbox')
const content = document.getElementById('content')

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
                                <img src="${detailData.Poster}" alt="Movie Poster" class="movie-poster">
                                <div class="movie-info">
                                    <h2>${detailData.Title}</h2>
                                    <p>${detailData.Year}</p>
                                    <p>${detailData.Rated}</p>
                                    <p>${detailData.Genre}</p>
                                    <p>${detailData.Plot}</p>
                                </div>
                            </div>
                            `
                        });
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