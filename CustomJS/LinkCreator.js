class LinkCreator {
	createLinkWithTitle(title, destination) {
		if (!destination) {
			return title;
		}
		return `[${title}](${destination})`
	}

	linkifyUsername(username, functionOrPrefix) {
		var link = null;
		if (functionOrPrefix instanceof Function) {
			link = functionOrPrefix(username);
		} else {
			link = `${functionOrPrefix}${username}`;
		}
		return `[${username}](${link})`;
	}

	linkifySocialMediaLinks(dv, dataviewResults, header, functionOrPrefix) {
		if (dataviewResults == null)
			return;
		if (Array.isArray(dataviewResults)) {
			dv.header(3, header);
			dv.list(dv.array(dataviewResults.map((username) => this.linkifyUsername(username, functionOrPrefix))));
		} else {
			dv.header(3, header);
			dv.list(dv.array([this.linkifyUsername(dataviewResults, functionOrPrefix)]));
		}
	}

	generateContactLinks(dv) {
		this.linkifySocialMediaLinks(
			dv,
			dv.current().instagram,
			"Instagram",
			"https://instagram.com/"
		);
		this.linkifySocialMediaLinks(
			dv,
			dv.current().twitter,
			"Twitter",
			"https://twitter.com/"
		);
		this.linkifySocialMediaLinks(
			dv,
			dv.current().phone_numbers,
			"Text Message",
			(number) => "sms:" + number.replace(/[\+\D]/g, "")
		);
		this.linkifySocialMediaLinks(
			dv,
			dv.current().phone_numbers,
			"Whatsapp",
			(number) => "https://wa.me/" + number.replace(/\D/g, "")
		);

		this.linkifySocialMediaLinks(
			dv,
			dv.current().emails,
			"Email",
			"mailto:"
		);

	}
}
