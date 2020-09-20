const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('quote-author');
const quoteContainer = document.getElementById('quote-container');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

// Get quote from API
async function getQuote() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/method=getQuote&lang=en&format=json';
    try {
        const response = await  fetch(proxyUrl + apiUrl);
        const data = await response.json();
        //if author is blank
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }
        else {
            authorText.innerText = data.quoteAuthor;
        }
        //if the quote is long
        if (data.quoteText.length > 100) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
    }
    catch(error) {
        getQuote();
        console.log('oops', error)
    }
}
//Twitter Button
function tweetQuote() {
    const quote = quote.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();