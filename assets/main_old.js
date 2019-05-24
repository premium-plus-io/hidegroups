    // Initialise the Zendesk JavaScript API client
    // https://developer.zendesk.com/apps/docs/apps-v2
    var client = ZAFClient.init();
	client.invoke('hide')
	client.metadata().then(function(metadata) {
		var apply_to_all = false;
		var settings_apply_groups = metadata.settings.groups_to_apply;
		var settings_hidden_groups = metadata.settings.groups_to_hide;	

		if (settings_apply_groups == ""){
			apply_to_all = true;
		}
		
		client.get(['ticketFields:assignee','currentUser']).then(
			function(data) {
				var groups = data['ticketFields:assignee']['optionGroups'];
				var current_groups = data['currentUser']['groups'];
		
				console.log(groups);
				console.log(current_groups);

				var i = -1;
				var user_groups = settings_user_groups.split(',');
				console.log(user_groups);
				current_groups.forEach(function (current_group) {
					if (user_groups.indexOf(String(current_group['id'])) >= 0 || apply_to_all == true){
						console.log(true);
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
					}
				});
			}
		);
	});