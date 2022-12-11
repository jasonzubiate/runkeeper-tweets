class Tweet {
	private text: string;
	time: Date;

	constructor(tweet_text: string, tweet_time: string) {
		this.text = tweet_text;
		this.time = new Date(tweet_time); //, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
	get source(): string {
		//TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
		if (
			this.text.startsWith('Just completed') ||
			this.text.startsWith('Just posted')
		) {
			return 'completed_event';
		} else if (this.text.startsWith('Achieved')) {
			return 'achievement';
		} else if (this.text.includes('#RKLive')) {
			return 'live_event';
		}
		return 'miscellaneous';
	}

	//returns a boolean, whether the text includes any content written by the person tweeting.
	get written(): boolean {
		//TODO: identify whether the tweet is written
		return !this.text.includes('Check it out!');
	}

	get writtenText(): string {
		if (!this.written) {
			return '';
		}
		//TODO: parse the written text from the tweet
		return this.text;
	}

	get activityType(): string {
		if (this.source != 'completed_event') {
			return 'unknown';
		}
		const splitString = this.text.split(' ');
		//TODO: parse the activity type from the text of the tweet
		if (splitString.includes('mi') || splitString.includes('km')) {
			const activity =
				splitString.indexOf('mi') >= 0
					? splitString[splitString.indexOf('mi') + 1]
					: splitString[splitString.indexOf('km') + 1];
			return activity;
		}
		return 'other';
	}

	get distance(): number {
		if (this.source != 'completed_event') {
			return 0;
		}
		const splitString = this.text.split(' ');
		if (splitString.includes('mi')) {
			return +splitString[splitString.indexOf('mi') - 1];
		} else if (splitString.includes('km')) {
			return +splitString[splitString.indexOf('km') - 1] / 1.609;
		}
		return 0;
	}

	getHTMLTableRow(rowNumber: number): string {
		//TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
		const splitString = this.text.split(' ');
		let text = '';
		splitString.forEach((word)=> {
			if(word.includes('https')) {
				text= text.concat(`<a href="${word}"> ${word}</a>`) 
			} else {
				text = text.concat(" ", word)
			}
		})

		return `
		<tr>
			<td><strong>${rowNumber + 1}</strong></td>
			<td>${this.activityType}</td>
			<td>${text}</td>
		</tr>
		`;
	}
}
