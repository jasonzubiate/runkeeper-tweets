function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	// Sorted tweet_array by date
	const sortedTweets = tweet_array.sort((a, b) => a.time - b.time);

	// Storing the number of tweets within each respective category (completed, live, achivements, misc)
	const tweetCategories = {
		completed: tweet_array.filter((tweet) => tweet.source == 'completed_event'),
		live: tweet_array.filter((tweet) => tweet.source == 'live_event'),
		achievements: tweet_array.filter((tweet) => tweet.source == 'achievement'),
		miscellaneous: tweet_array.filter(
			(tweet) => tweet.source == 'miscellaneous'
		),
	};

	// Updates the firstDate tag
	$('#firstDate').text(
		sortedTweets[0].time.toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	);

	// Updates the lastDate tag
	$('#lastDate').text(
		sortedTweets[sortedTweets.length - 1].time.toLocaleDateString('en-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	);

	// Updates the completed events tags
	$('.completedEvents').text(tweetCategories.completed.length);

	// Updates the completed events percentage tag
	$('.completedEventsPct').text(
		`${math.round(
			(tweetCategories.completed.length / tweet_array.length) * 100,
			2
		)}%`
	);

	// Updates the live events tags
	$('.liveEvents').text(tweetCategories.live.length);

	// Updates the live events percentage tag
	$('.liveEventsPct').text(
		`${math.round(
			(tweetCategories.live.length / tweet_array.length) * 100,
			2
		)}%`
	);

	// Updates the achivements tags
	$('.achievements').text(tweetCategories.achievements.length);

	// Updates the achieved percentage tag
	$('.achievementsPct').text(
		`${math.round(
			(tweetCategories.achievements.length / tweet_array.length) * 100,
			2
		)}%`
	);

	// Updates the miscellaneous events tags
	$('.miscellaneous').text(tweetCategories.miscellaneous.length);

	// Updates the miscellaneous events percentage tag
	$('.miscellaneousPct').text(
		`${math.round(
			(tweetCategories.miscellaneous.length / tweet_array.length) * 100,
			2
		)}%`
	);

	// Updates the written tags
	$('.written').text(tweet_array.filter((tweet) => tweet.written).length);
	// Updates the written percentage tags
	$('.writtenPct').text(
		`${math.round(
			(tweet_array.filter((tweet) => tweet.written).length /
				tweet_array.length) *
				100,
			2
		)}%`
	);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
