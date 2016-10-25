$(document).ready(function () {
	var refreshButton = document.querySelector('.refresh');
	var close1Button = document.querySelector('.close1');
	var close2Button = document.querySelector('.close2');
	var close3Button = document.querySelector('.close3');

	var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');
	var close1ClickStream = Rx.Observable.fromEvent(close1Button, 'click');
	var close2ClickStream = Rx.Observable.fromEvent(close2Button, 'click');
	var close3ClickStream = Rx.Observable.fromEvent(close3Button, 'click');

	var requestStream = refreshClickStream.startWith('startup click')
		.map(function () {
			var randomOffset = Math.floor(Math.random() * 500);
			return 'https://api.github.com/users?since=' + randomOffset + '&access_token=4c6c5bfe2f11e99576b93cf43420ad206b9bbf68';
		});

	var responseStream = requestStream
		.flatMap(function (requestUrl) {
			return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
		});


	function createSuggestionStream(closeStream) {
		return closeStream.startWith('startup click')
			.combineLatest(responseStream,
				function (click, listUsers) {
					return listUsers[Math.floor(Math.random() * listUsers.length)];
				}
			)
			.merge(
				refreshClickStream.map(function () {
					return null;
				})
			)
			.startWith(null);
	}

	var suggestion1Stream = createSuggestionStream(close1ClickStream);
	var suggestion2Stream = createSuggestionStream(close2ClickStream);
	var suggestion3Stream = createSuggestionStream(close3ClickStream);

	suggestion1Stream.subscribe(function (suggestion) {
		renderSuggestion(suggestion, '.suggestion1');
	});

	suggestion2Stream.subscribe(function (suggestion) {
		renderSuggestion(suggestion, '.suggestion2');
	});

	suggestion3Stream.subscribe(function (suggestion) {
		renderSuggestion(suggestion, '.suggestion3');
	});

	// Rendering ---------------------------------------------------
	function renderSuggestion(suggestedUser, selector) {
		var suggestionEl = document.querySelector(selector);
		if (suggestedUser === null) {
			suggestionEl.style.visibility = 'hidden';
		} else {
			suggestionEl.style.visibility = 'visible';
			var usernameEl = suggestionEl.querySelector('.username');
			usernameEl.href = suggestedUser.html_url;
			usernameEl.textContent = suggestedUser.login;
			var imgEl = suggestionEl.querySelector('img');
			imgEl.src = "";
			imgEl.src = suggestedUser.avatar_url;
		}
	}
});
