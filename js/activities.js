function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	const activities = {};

	tweet_array.forEach((tweet) => {
		if (activities[tweet.activityType]) {
			activities[tweet.activityType] += 1;
		} else {
			activities[tweet.activityType] = 1;
		}
	});

	const a = [];
	tweet_array.forEach((tweet) => {
		if (a.length == 0) {
			a.push({
				name: tweet.activityType,
				occurrencences: 1,
				distance: tweet.distance,
				day: tweet.time.getDay()
			});
		} else {
			const found = a.find((activity) => {
				return activity.name == tweet.activityType
			})
			if (found != undefined) {
				found.occurrencences += 1
				found.distance += tweet.distance;
			}
			else {
				a.push({
					name: tweet.activityType,
					occurrencences: 1,
					distance: tweet.distance,
					day: tweet.time.getDay()
				});
			}
		}
	});
	a.sort((a,b) => b.occurrencences - a.occurrencences)

	// Changes the span tags fort the number of activities
	document.getElementById('numberActivities').innerText =
		Object.keys(activities).length;

	// Changes the span tags fort the number of activities
	document.getElementById('firstMost').innerText =
		`${a[0].name}ing`;
		
	// Changes the span tags fort the number of activities
	document.getElementById('secondMost').innerText =
		`${a[1].name}ing`;

	// Changes the span tags fort the number of activities
	document.getElementById('thirdMost').innerText =
		`${a[2].name}ing`;

	document.getElementById('longestActivityType').innerText =
		`${a.sort((a,b) => b.distance - a.distance)[0].name}ing`;

	document.getElementById('shortestActivityType').innerText =
		`${a.sort((a,b) => a.distance - b.distance).filter((activity) => {
			return activity.distance >= 0;
		})[2].name}ing`;

	// Display the day of the weeks
	document.getElementById('weekdayOrWeekendLonger').innerText = a.filter(activity => activity.day > 4) ? " weekends" : ' weekdays';
		
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
		$schema: 'https://vega.github.io/schema/vega-lite/v5.json',
		description:
			'A graph of the number of Tweets containing each type of activity.',
		data: {
			values: a.sort((a,b) => b.occurrencences - a.occurrencences),
		},
		mark: 'point',
		"encoding": {
			"x": {
				"field": "name",
				"type": "nominal"
			},
			"y": {
				"field": "occurrencences",
				"type": "quantitative"
			}
		}
	};
	vegaEmbed('#activityVis', activity_vis_spec, { actions: false });

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});
