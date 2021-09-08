const dateOutput = document.getElementById('date')
const editionOutput = document.getElementById('edition')
const imgOutput = document.querySelector('img')
const headingOutput = document.querySelector('h3')
const articleOutput = document.querySelector('article')

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
const dateObj = new Date();
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2);
const year = dateObj.getFullYear();
const output = month + '\n' + day + ', ' + year;
dateOutput.textContent = output;

function getNews(event) {
    let input = document.querySelector('input')
    if (event.key == 'Enter' && input.value.length > 1) {
        fetch(`https://newsapi.org/v2/everything?q="${input.value}"&sortBy=relevancy&pageSize=1&page=1&apiKey=f47f7aa89afd4135a0a3d93b948e63ef`)
            .then(response => response.json())
            .then(data => {
                let article = data.articles[0]
                console.log(article)
                dateOutput.innerHTML = `${monthNames[parseInt(article.publishedAt.slice(5, 7) - 1)]} ${article.publishedAt.slice(8, 10)}, ${article.publishedAt.slice(0, 4)}`
                editionOutput.innerHTML = input.value + ' Edition'
                imgOutput.setAttribute('src', article.urlToImage)
                headingOutput.innerHTML = article.title
                articleOutput.innerHTML = article.content + ' '
                let link = document.createElement('a')
                link.setAttribute('href', article.url)
                link.setAttribute('target', 'blank')
                link.innerHTML = 'Read the whole article'
                articleOutput.appendChild(link)
            })
    }
}