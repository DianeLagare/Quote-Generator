const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const faceBookButton = document.getElementById('facebook');
const newQuoteButton = document.getElementById('new-quote');

//Empty array for api quotes
let apiQuotes = []; 

//random new quotes
function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

//Replace 'null' author field with 'Unknown'
if(quote.author == null) {
  quoteAuthor.textContent = 'Unknown';
} else {
  quoteAuthor.textContent = quote.author;
}

//Changes long quotes into a smaller size
if(quote.text.length > 120) {
  quoteText.classList.add('long-quote');
} else {
  quoteText.classList.remove('long-quote');
}
  quoteText.textContent = quote.text;
}

// Quotes from API
async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
  }
}

//Enables to tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank'); 
}


// Share the quote on Facebook!
function faceBookQuote() {
  const faceBookUrl = `http://www.facebook.com/sharer.php?s=100&p?quote=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(faceBookUrl, '_blank');  
};

//makes buttons work
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);
faceBookButton.addEventListener('click', faceBookQuote);

//run getQuotes function
getQuotes();