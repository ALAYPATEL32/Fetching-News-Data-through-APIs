const apikey = '82fe8307a9a04010bd92d913c964ee52';
const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById ('search-input');
const searchButton = document.getElementById ('search-button');

async function fetchRandomNews() {
    try {
        // const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&pageSize=10&apiKey=${apikey}`;
        const apiUrl = `https://newsapi.org/v2/everything?q=apple&from=2024-08-11&to=2024-08-11&sortBy=popularity&apiKey=${apikey}`;
        // https://newsapi.org/v2/everything?q=apple&from=2024-08-11&to=2024-08-11&sortBy=popularity&apiKey=82fe8307a9a04010bd92d913c964ee52
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.articles);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click",async ()=>{

    const query =searchField.value.trim();
    if(query !==""){
        try{
                const articles = await fetchNewsQuery(query);
                console.log("this is testing : "+articles);
                
                displayBlog(articles)
        }
        catch(error){
            console.log("error fething news by qury",error);
        }
    }
})


async function fetchNewsQuery(query){

    try {

        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
       
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data.articles);
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news", error);
        return [];
    }
}


function displayBlog(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        // console.log("inside displayBlog : " + article.title);

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'default-image-url.jpg'; // Provide a fallback image URL
        img.alt = article.title || 'No title available';

        const title = document.createElement("h2");
        const truncatedTitle = article.title && article.title.length > 30
            ? article.title.slice(0, 30) + "....."
            : article.title || 'No title available';
        title.textContent = truncatedTitle;

        // console.log("len of title : " + (article.title ? article.title.length : 'No title'));
        // console.log("text content : " + title.textContent);

        const description = document.createElement("p");
        const truncatedDes = article.description && article.description.length > 120
            ? article.description.slice(0, 120) + "....."
            : article.description || 'No description available';
        description.textContent = truncatedDes;

        // console.log("text content : " + description.textContent);

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click', () => {
            window.open(article.url, "_blank");
        });

        blogContainer.appendChild(blogCard);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlog(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
