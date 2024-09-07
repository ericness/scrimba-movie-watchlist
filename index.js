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
                content.innerHTML = `
                <img src="${data.Poster}" alt="Movie Poster" class="movie-poster">
                <div class="movie-info">
                    <h2>${data.Title}</h2>
                    <p>${data.Year}</p>
                    <p>${data.Rated}</p>
                    <p>${data.Genre}</p>
                    <p>${data.Plot}</p>
                </div>
                `
            })
    } else {
        console.log('Please enter a search term');
    }
})


function makeSearchUrl(searchTerm) {
    return baseUrl + `?apikey=${apiKey}&t=${searchTerm}`
}