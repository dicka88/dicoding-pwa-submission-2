const webPush = require('web-push')

const vapidKeys = {
	publicKey: 'BBJ51slZXoZss2hxV_7pkdKAjZHFVkHjwNV3NfO1-T19OvaqeWgb8_SwSZCfjB5wNtT03IG49n4tt4jkqxCN0u0',
	privateKey: 'BBqlJsR2aK39V4eo-wwZGYFFfuZS2MsNZrgfBKo_UTw'
}

const pushSubscription = {
	endpoint: 'https://fcm.googleapis.com/fcm/send/eZc7H9-LCVY:APA91bHzY3P6eZcTtLzGPWZKJne2mf_0SA0WmwuglxqU2-VssMrP0HlA5TkZXmpqrPRC-jzQPN8D6uwsb2TkG4OwJVavmxkrx8aZAfVtih5_LYFzEgoTsI18NXA_dc-13wsAJzJ57bNq',
	keys: {
		p256dh: 'BD7CCoJ/gLuJ4vp/wE1uLb2Yo1CjGWqVUExWzcwwXBBbMAU0ur41j6813CnKTRKKtipjMHMUTeddqc4esThGik4=',
		auth: 'xhvLNppUfEnUURI8S1Yl3g=='
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