const newsList = document.getElementById('news-list');
const searchInput = document.getElementById('search-input');
const form = document.querySelector('.form');
const apiKey = 'ee35367caa604dc1bbe89dcc17744698';

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = searchInput.value;
    if (input.trim() !== '') {
        getNews(input);
    }
});

async function getNews(query = 'top headlines') {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
        const data = await response.json();
        const articles = data.articles;
        displayNews(articles);
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

function displayNews(articles) {
    newsList.innerHTML = '';
    articles.forEach(article => {
        const articleDiv = document.createElement('div');
        articleDiv.classList.add('news-article');
        articleDiv.innerHTML = `
        <div class="card" style="width: 10rem; height: 21rem; text-align: center; border-radius: 5px; border: 2px solid rgb(89, 84, 84); margin-top: 20px; padding: 10px; " >
        <img   src="${article.urlToImage ? article.urlToImage : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYCnwiYhkFKmSjtxFSDzD-KPztLjIlaWs3g&usqp=CAU'}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="news-title">${article.title.slice(0, 40)}</h5>
          <p class="news-description">${article.description.slice(0, 60)}......</p>
          <button class="btn"><a class="a-tag" href="${article.url}" target="_blank">Read more</a></button>
        </div>
        </div>`;
        
        newsList.appendChild(articleDiv);
    });
}

getNews();

