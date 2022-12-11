let written_tweet_array = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	written_tweet_array = runkeeper_tweets
		.map(function (tweet) {
			return new Tweet(tweet.text, tweet.created_at);
		})
		.filter((tweet) => tweet.written);
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	let searchBar, filter, table, tr, td, txtValue;
	// Initializing variables
	searchBar = document.getElementById('textFilter');
	filter = searchBar.value.toLowerCase();
	table = document.getElementById('tweetTable');

	const filteredTweets = written_tweet_array.filter((tweet) => {
		return tweet.text.toLowerCase().includes(filter) || tweet.activityType.toLowerCase().includes(filter);
	});
	
	document.getElementById('searchCount').innerText = filteredTweets.length

	document.getElementById('searchText').innerText = searchBar.value 

	table.innerHTML = filteredTweets
		.map((tweet) => tweet.getHTMLTableRow(filteredTweets.indexOf(tweet)))
		.join('');
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch(event);
	loadSavedRunkeeperTweets().then(parseTweets);
});
