const webPush = require('web-push')

const vapidKeys = {
	publicKey: 'BBJ51slZXoZss2hxV_7pkdKAjZHFVkHjwNV3NfO1-T19OvaqeWgb8_SwSZCfjB5wNtT03IG49n4tt4jkqxCN0u0',
	privateKey: 'BBqlJsR2aK39V4eo-wwZGYFFfuZS2MsNZrgfBKo_UTw'
}

const pushSubscription = {
	endpoint: 'https://fcm.googleapis.com/fcm/send/eW3LMlMl9bw:APA91bGWUVGKo7q2T9DY_T3AeeIcr2IM3RzFZ0j3ZoOmKHXNyxIxgQBe7oOHq9Gmjb4zwCOB9WyCBnOZQlV9DzRI_VK0XdkQ0TUFLopmqAmt2NphhAJqpdGpaC7ugYn-5RB-_NgbDzHS',
	keys: {
		p256dh: 'BP/NyNHaGI3cR5aJFG/t92XQmqEZOnU3/2+wUSpbXjD1XHvq3LWCeFmJiUntcudbbS+OrPR3cUctQHN2ACkbE4w=',
		auth: 'ql6lv8BznsO3ZdvgE/P3iA=='
	}
}

let payload = "Today, Real Madrid vs Barcelona"

let options = {
	gcmAPIKey: '741451177275',
	TTL: 60
}

webPush.setVapidDetails(
	'mailto:dickaismaji@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
)

webPush.sendNotification(pushSubscription,payload,options)