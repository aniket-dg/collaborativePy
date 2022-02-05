// Example navigatorPush.service.js file
// Import the functions you need from the SDKs you need
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Optional: Added to that the browser opens when you click on the notification push web.

// Needs to be before initializing firebase messaging
self.addEventListener('notificationclick', function (event) {
    // Android doesn't close the notification when you click it
    // See http://crbug.com/463146
    event.notification.close();
    // Check if there's already a tab open with this URL.
    // If yes: focus on the tab.
    // If no: open a tab with the URL.
    extraData = event.notification?.data?.FCM_MSG?.data
    console.log('Notification',event.notification)
    console.log('Extra Data',extraData)
    const urlToOpen = new URL(extraData?.url || "", self.location.origin).href;

    const promiseChain = clients.matchAll({ 
        type: 'window', 
        includeUncontrolled: true 
    }).then(function (windowClients) {
        let matchingClient = null;
        // focus on window if tab is open with given url
        for (let i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i];
            if (windowClient.url.split(/[?#]/)[0] === urlToOpen) {
                matchingClient = windowClient;
                break;
            }
        }
        if (matchingClient) {
            return matchingClient.focus();
        } else {
            return clients.openWindow(urlToOpen);
        }
    })
    event.waitUntil(promiseChain);
});

// For passing info from window to sw context
self.addEventListener('message', function(event){
    let data = JSON.parse(event.data);
    console.log("Received Message from window:", data);
    manageFCMUser(data)
});

self.addEventListener('push', function(e) {
    // if app in foreground show notification
    // isClientFocused().then((clientIsFocused) => {
    //     if (clientIsFocused) {
    //         const data = e.data.json()
    //         console.log('PUSH EVENT', data)
    //         console.log('Don\'t need to show a notification.');
    //         const notificationTitle = data.notification.title || '';
    //         const notificationOptions = (({ body, icon }) => ({ body, icon }))(data.notification);
    //         notificationOptions.data = {FCM_MSG:{data:{...data.data}}};
    //         // notificationOptions.image = data.data.image;
    //         return self.registration.showNotification(notificationTitle, notificationOptions);
    //     }
    //     // Client isn't focused, we need to show a notification. (firebase takes care of it for us)
    //     // return self.registration.showNotification('Had to show a notification.');
    // })
});

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//const firebaseConfig = {
//    apiKey: "AIzaSyBUBxvnL-kiOmGy3jn4zSuODP_pvMQ_uMY",
//    authDomain: "stellar-ai-test.firebaseapp.com",
//    projectId: "stellar-ai-test",
//    storageBucket: "stellar-ai-test.appspot.com",
//    messagingSenderId: "200783260012",
//    appId: "1:200783260012:web:87f291502baab08152eb49",
//    measurementId: "G-LFG6ZP6ZLC"
//};

const firebaseConfig = {
    apiKey: "AIzaSyCgfo-giLUmzB7wqwOffD4rnJZzjqmUkhA",
    authDomain: "stellar-ai-4cfe6.firebaseapp.com",
    projectId: "stellar-ai-4cfe6",
    storageBucket: "stellar-ai-4cfe6.appspot.com",
    messagingSenderId: "388945018484",
    appId: "1:388945018484:web:315cc707231f684ceadb21",
    measurementId: "G-J547JZL1WD"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

//messaging.usePublicVapidKey(
//    "BJMtWEit7IsPhW5FKfXpfdqHSx-h27vjv0Zd_y8w6rBj-Kmn3EPbBOOQKU1qDzePeYz-oS2rYQz8_VH2r9QWA6s"
//)

messaging.usePublicVapidKey(
    "BB33Facuw46_JoeaHdkwSX2RzyOoCBytwPI8_gKN8_drwbCzmbr72g6JqGqU-FaLRYS0RrB-FhyOkgL0T52NpA8"
)

function manageFCMUser(data) {
    messaging.getToken()
    .then((currentToken) => {
        if (currentToken) {
            let command = data.command
            let FCMUser = data.user;
            const url = data.url;
            // Send the token to your server and update the UI if necessary
            console.log('RegID:', FCMUser.registration_id,'FCMToken:', currentToken)
            FCMUser.registration_id = currentToken;
            if (command==='createOrUpdate'){
                FCMUser.active = true
                const formData = convertObjToFormData(FCMUser)
                console.log('====Creating user...====')
                fetch(url, {
                    method: 'POST',
                    body: formData,
                }).then(async(res) => {
                    if(res.ok){
                        data = await res.json();
                        console.log('====User created...====', data)
                    }
                    if (res.status === 403)
                        throw new Error('User is unauthenticated!')
                }).catch(err => {console.log('User updation failed:', err)})
            }
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    })
}

function isClientFocused() {
    return clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    }).then((windowClients) => {
        let clientIsFocused = false;

        for (let i = 0; i < windowClients.length; i++) {
            const windowClient = windowClients[i];
            if (windowClient.focused) {
                clientIsFocused = true;
                break;
            }
        }

        return clientIsFocused;
    });
}

function convertObjToFormData(FCMUser) {
    const formData = new FormData();
    Object.keys(FCMUser).forEach(key => formData.append(key, FCMUser[key]));

    return formData;
}