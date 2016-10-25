$(document).ready(function () {

	var refreshButton = document.querySelector('.refresh');
	var closeButton1 = document.querySelector('.close1');
	var closeButton2 = document.querySelector('.close2');
	var closeButton3 = document.querySelector('.close3');



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
