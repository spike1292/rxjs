$(document).ready(function () {
	var refreshButton = document.querySelector('.refresh');
	var closeButton1 = document.querySelector('.close1');
	var closeButton2 = document.querySelector('.close2');
	var closeButton3 = document.querySelector('.close3');

	var refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click');

	var requestStream = refreshClickStream
		.map(function () {
			var randomOffset = Math.floor(Math.random() * 500);
			return 'https://api.github.com/users?since=' + randomOffset + '&access_token=4c6c5bfe2f11e99576b93cf43420ad206b9bbf68';
		});

	var responseStream = requestStream
		.flatMap(function (requestUrl) {
			return Rx.Observable.fromPromise(jQuery.getJSON(requestUrl));
		});

	responseStream.subscribe(function (response) {
		// render `response` to the DOM however you wish
		debugger;
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
