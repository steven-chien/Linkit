Meteor.methods({
	/* method to obtain a list of free busy objects for every member IDs received */
	getOccupiedList: function(memberIds) {
		if(this.userId) {
			/* define max and min period to be now and 1 month from now */
			var startDate = new Date();
			var endDate = new Date(startDate.getTime());
			endDate.setMonth(parseInt(endDate.getMonth())+1);
			var busyList = [];

			/* get free busy data for every participants */
			for(var i=0; i<memberIds.length; i++) {
				/* prepare to get each and every calendars from user */
				var calendarIds = [];

				/* get access token from user */
				var user = Meteor.users.findOne(memberIds[i]);
				var accessToken = user && user.services.google.accessToken;
				console.log(accessToken);
				var requestUrl = 'https://www.googleapis.com/calendar/v3/users/me/calendarList?access_token='+accessToken;

				/* try to get list of calendar IDs */
				var calList;
				try {
					var returnVector = HTTP.call('get', requestUrl);
					calList = returnVector.data.items;
					for(var j=0; j<calList.length; j++)
						calendarIds.push({ id: calList[j].id });
				}
				catch(error) {
					console.log(error);
					return String(error);
				}

				/* get free busy for each and every calendars by HTTP POST */
				var requestUrl = 'https://www.googleapis.com/calendar/v3/freeBusy';
				var postData = {
					'headers': { 
						'Authorization': 'Bearer '+accessToken,
						'Content-Type': 'application/json' 
					},
					'data': {
						'timeMin': startDate.toISOString(),
						'timeMax': endDate.toISOString(),
						'items': calendarIds,
						'timeZone': 'HKT',
					}
				};

				/* process returned data and extract obj storing free busy of each calendar */
				var returnValue;
				try {
					var returnVector = HTTP.call('post', requestUrl, postData);
					var returnValue = JSON.parse(returnVector.content).calendars;
				}
				catch (error) {
					console.log(returnValue);
					console.log(error);
					return String(error);
				}
				console.log(returnValue);

				/* push each and ever free busy obj into list */
				for(var j=0; j<calendarIds.length; j++) {
					var busyObj = returnValue[calendarIds[j].id].busy;
					for(var k=0; k<busyObj.length; k++) {
						busyList.push(busyObj[k]);
					}
				}
			}
			console.log(busyList);

			var busyMap = [];
			for(var i=0; i<14; i++) {
				busyMap[i] = [];
				for(var j=0; j<24; j++) {
					busyMap[i][j] = 0;
				}
			}

			for(var i=0; i<busyList.length; i++) {
				var now = new Date(startDate);
				var start = Date.parse(busyList[i].start);
				var end = Date.parse(busyList[i].end);
				console.log(now);
				now.setHours(0);
				now.setMinutes(0);
				now.setSeconds(0);
				now.setUTCMilliseconds(0);
				for(var j=0; j<14; j++) {
					for(var k=0; k<24; k++) {
						if(now.getTime()>=start && now.getTime()<=end) {
							if(now.getDay()==4)
								console.log(now);
							busyMap[j][k] = 1;
						}
						now.setHours(now.getHours()+1);
					}
				}
			}

			console.log(busyMap);
			//return busyList;
			return busyMap;
		}
	}
});
