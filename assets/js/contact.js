/* Contact form: sends through FormSubmit's AJAX endpoint so visitors stay on the page.
   If the AJAX request fails for any reason, the form falls back to a normal POST. */
(function () {
	var form = document.getElementById('contact-form');
	if (!form) return;
	var status = document.getElementById('form-status');
	var button = form.querySelector('input[type="submit"]');

	function show(msg, cls) {
		status.textContent = msg;
		status.className = cls || '';
	}

	if (/[?&]sent=1/.test(window.location.search))
		show('Thanks! Your message was sent. I\'ll get back to you soon.', 'ok');

	form.addEventListener('submit', function (e) {
		if (!window.fetch || !window.FormData) return; // old browser: normal POST
		e.preventDefault();
		if (form._honey && form._honey.value) return; // bot

		var data = {};
		new FormData(form).forEach(function (v, k) { data[k] = v; });
		data._replyto = data.email;

		button.disabled = true;
		show('Sending…');

		fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
			.then(function (res) {
				if (res.ok && String(res.body.success) === 'true') {
					form.reset();
					show('Thanks! Your message was sent. I\'ll get back to you soon.', 'ok');
					if (window.goatcounter && window.goatcounter.count)
						window.goatcounter.count({ path: 'contact-form-sent', title: 'Contact form sent', event: true });
				} else {
					throw new Error((res.body && res.body.message) || 'Send failed');
				}
			})
			.catch(function () {
				show('Something went wrong. Please email me directly at alexisv@andrew.cmu.edu.', 'err');
			})
			.then(function () { button.disabled = false; });
	});
})();
