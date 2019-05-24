    // Initialise the Zendesk JavaScript API client
    // https://developer.zendesk.com/apps/docs/apps-v2
    var client = ZAFClient.init();
	client.invoke('hide')
	client.metadata().then(function(metadata) {
		var settings_hidden_groups = metadata.settings.groups_to_hide;	

		client.get(['ticketFields:assignee']).then(
			function(data) {
				var groups = data['ticketFields:assignee']['optionGroups'];
				console.log(groups);
				var i = -1;
				groups.forEach(function (group) {
					i = i +1;
					var value = group['value'];
					var isEnabled = group['isEnabled'];
					var isVisible = group['isVisible'];
					var label = group['label'];
	
					var hidden_groups = settings_hidden_groups.split(',');

					if (hidden_groups.indexOf(value) >= 0){
						client.invoke('ticketFields:assignee.optionGroups.' + i + '.hide')
					}
				});
			});
	});