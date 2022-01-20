// Getting information from template
const session_key = JSON.parse(document.getElementById('session_key').textContent);
const user_id = JSON.parse(document.getElementById('user_id').textContent);
const user_email = JSON.parse(document.getElementById('user_email').textContent);
const group_id = JSON.parse(document.getElementById('group_id').textContent);
const group_name = JSON.parse(document.getElementById('group_name').textContent);
const group_name_url = document.getElementById('group_name_url').textContent;
const upload_url = document.getElementById('chat-form').getAttribute('data-upload-url');
// console.log(
//     session_key,
//     user_id,
//     user_email,
//     group_id,
//     group_name,
//     upload_url
// )

let data;
/* Websocket creation */
let wsStart = 'ws://';
if(location.protocol === 'https:'){
    wsStart = 'wss://';
}

// For chat
const socketChatURL = `${wsStart}${window.location.host}/ws/chat/group/${group_name}/${ user_id }/`;
const chatSocket = new ReconnectingWebSocket(socketChatURL)
chatSocket.onmessage = validateMessage
getGroupConversation(group_name)

// Validate message
function validateMessage(e) {
    data = JSON.parse(e['data'])
    getGroupMessage(data)
}

// Get newest received group message
function getGroupMessage(data) {
    $.getJSON(`/chat/api/chat/group/msg/${data.id}/`, function(data) {
        const isCurrentUser = user_email === data.user;
        drawMessage(data, isCurrentUser)
    });
}

// Get old group message(s)
function getGroupConversation(groupName) {
    $.getJSON(`/chat/api/chat/group/msg/?target=${groupName}`, function (data) {
        // console.log(data['results'])
        const messages = data['results']
        for (let i = messages.length - 1; i >= 0; i--) {
            const isCurrentUser = user_email === messages[i].user
            if (isCurrentUser){
                // if msg is sent by currentUser
                if (!messages[i].is_delete){
                    drawMessage(messages[i], isCurrentUser);
                    continue;
                }
            } else {
                // if msg is received by someone other than sender
                let receiverHasDeleted = false;
                for (let user of messages[i].receiver_delete){
                    if (user_email === user['email']){
                        receiverHasDeleted = true
                        break;
                    }
                }
                if (!receiverHasDeleted)
                    drawMessage(messages[i], isCurrentUser);
            }            
        }
    });
}

// Displays a single message
function drawMessage(data, isCurrentUser) {
	console.log(data);
    let html = '';
    const mediaEl = generateMediaEl(data, isCurrentUser)
        html = `
            <div class="message-wrapper ${isCurrentUser ? 'reverse':null}" data-id="${data.id}">
                <div class="profile-picture">
                    <img src="${data.user_profile_url}" alt="${data.user_full_name}">
                </div>
                <div class="message-content">
                    <p class="name">${data.user_full_name}<span class="c-dropdown-btn">&#8942;</span></p>
                    ${data.body ? `
                        <div class="message pe-5">${urlify(data.body)}</div>
                    `:''}
                    ${mediaEl}
                </div>
            </div>
        `
    const chatArea = document.getElementById('chat-area')
    chatArea.insertAdjacentHTML('beforeend', html);
    scrollChatToEnd(chatArea)
}

// Generate media element
function generateMediaEl(data, isCurrentUser) {
    let html = '';
    data['media_files']?.forEach((file, index) => {
            const name_cryptic_ext = file.split('/').pop();
            let filename = name_cryptic_ext; // May or may not have cryptic part.
            filename = filename.replace(/^(.+)(_.+)(\..+)$/, '$1$3')
            html += `
                <div class="message-file">
                    <div class="icon sketch">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path fill="#ffd54f" d="M96 191.02v-144l160-30.04 160 30.04v144z"/>
                        <path fill="#ffecb3" d="M96 191.02L256 16.98l160 174.04z"/>
                        <path fill="#ffa000" d="M0 191.02l256 304 256-304z"/>
                        <path fill="#ffca28" d="M96 191.02l160 304 160-304z"/>
                        <g fill="#ffc107">
                        <path d="M0 191.02l96-144v144zM416 47.02v144h96z"/>
                        </g>
                    </svg>
                    </div>
                    <a href="${file}" target="_blank" download="${filename}" class="file-info">
                        <div class="file-name">${filename}</div>
                    </a>
                </div>
            `
    })
    return html
}

// Send message on form submit
document.getElementById('chat-form').addEventListener('submit', (e)=>{
    e.preventDefault();
    if (myDropzone.files.length > 0){
        if (myDropzone.getQueuedFiles().length) {
            myDropzone.processQueue();
        }
    } else {
        sendMessage()
    }
})

// Sends the message with or without files
function sendMessage(bucketId=0) {
    inputEl = document.getElementById('chat-input')
    let message = inputEl.value
    let finalMessage = message.replace(/\n/g, "");
    inputEl.value = ''
    if (finalMessage.length > 0 || bucketId !== 0)
        chatSocket.send(JSON.stringify({
            'message': finalMessage,
            'receiver_id': '',
            'command': 'new_message',
            'bucket_id': bucketId,
        }));
}

// Process message received from API
function processMessage() {

}

// Message dropdown menu
let oldDropdownId;
document.getElementById('chat-container').addEventListener('click', function(e){
    if (e.target && e.target.classList.contains('c-dropdown-btn')){
        const msgWrapper = e.target.closest('.message-wrapper')
        const msgId = msgWrapper.getAttribute('data-id')
        const isSelf = msgWrapper.classList.contains('reverse')
        // console.log(oldDropdownId)
        if(oldDropdownId){
            document.querySelector(`.c-dropdown-menu[data-id='${oldDropdownId}']`).remove();
            if (oldDropdownId==msgId){
                oldDropdownId = undefined;
                return
            }
        }
        oldDropdownId = msgId;
        const rect = document.getElementById('chat-area').getBoundingClientRect();
        const x = Math.floor(e.clientX);
        const y = Math.floor(e.clientY);
        // console.log(x, y)
        let html = `
            <div class="c-dropdown-menu" data-id="${msgId}" 
                 style="top:${y + 10}px; left: ${x}px; ${ isSelf ? `transform: translateX(-100%)`:''}">
                <button class="c-dropdown-item" 
                        onclick="${isSelf ? `deleteGroupSenderMsgforSelf(event)`:`deleteGroupReceiverMessage(event)`}">
                    &#10060; Delete message
                </button>
            </div>
        `
        document.getElementById('chat-area').insertAdjacentHTML('beforeend', html)
    } else {
        // Close dropdown if clicked anywhere on chat area
        if(oldDropdownId){
            document.querySelector(`.c-dropdown-menu[data-id='${oldDropdownId}']`).remove();
            oldDropdownId = undefined;
        }
    }
})

// Delete your message for self
function deleteGroupSenderMsgforSelf(e) {
    const msgId = e.target.closest('.c-dropdown-menu').getAttribute('data-id');
    const msgWrapper = document.querySelector(`.message-wrapper[data-id='${msgId}']`);
    msgWrapper.remove();
    $.getJSON(`/chat/api/group/sender/msg/delete/self/${msgId}/`, function (data) {
    });
}

// Delete someone else's message for self
function deleteGroupReceiverMessage(e) {
    const msgId = e.target.closest('.c-dropdown-menu').getAttribute('data-id');
    const msgWrapper = document.querySelector(`.message-wrapper[data-id='${msgId}']`);
    msgWrapper.remove();
    $.getJSON(`/chat/api/group/receiver/msg/delete/${msgId}/`, function (data) {
    });
}

// Dropzone config
let myDropzone = new Dropzone('#chat-area', {
    url: upload_url,
    paramName: "files",
    uploadMultiple:true,
    autoProcessQueue: false,
    parallelUploads: 20,
    maxFilesize: 30,
    maxFiles: 20,
    clickable: "#attachFiles", // Define the element that should be used as click trigger to select files.
    previewsContainer: "#previews",
    previewTemplate: document.querySelector('#preview-template').innerHTML,
    init: function () {
        // Doing it this way passes proper arguments
        this.on("addedfile", function(file) {fileAdded(file)});
        this.on("successmultiple", function(data) {uploadAllComplete(data)});
    }
})

function fileAdded(file) {
    file.previewElement.addEventListener('click', ()=>{
        myDropzone.removeFile(file)
    })
}

function uploadAllComplete(data){
    const bucketId = JSON.parse(data[0]['xhr'].responseText)['bucket_id'];
    sendMessage(bucketId)
    // Clearing once message sent
    myDropzone.removeAllFiles();
}

// Scrolls chat messages to end.
function scrollChatToEnd(element) {
    element.scrollTop = element.scrollHeight;
}

// process body for links
function urlify(msg){
    const regex = RegExp(/(https?:\/\/[^\s]+)/)
    const processedMsg = msg.replace(regex, function(url) {
        return `<a href="${url}" target="_blank" style="color: inherit; text-decoration:underline; overflow-wrap: anywhere;">${url}</a>`;
    })
    return processedMsg;
}

/* Video functionality */
let mapPeers = {};
const socketVideoURL = `${wsStart}${window.location.host}/ws/video/meet/${group_name_url}/`;
const videoSocket = new WebSocket(socketVideoURL);

videoSocket.addEventListener('open', (e)=>{
    console.log("Connection OPEN", e);
    sendVideoSignal('new-peer', {'receiver_channel_name': group_name_url});
});

videoSocket.addEventListener('message', validateVideoMessage);

videoSocket.addEventListener('close', (e)=>{
    console.log("Connection CLOSED", e);
});

videoSocket.addEventListener('error', (e)=>{
    console.log("Connection ERROR", e);
});

function sendVideoSignal(action, message){
    videoSocket.send(JSON.stringify({
        'peer': `viewer_${user_id}`,
        'action': action,
        'message': message
    }));
}

function validateVideoMessage(e) {
    console.log(e)
    let parsedData = JSON.parse(e.data);
    let peerUserName = parsedData['peer'];
    let action = parsedData['action'];

    if(`viewer_${user_id}` === peerUserName){
        return;
    }

    let receiver_channel_name = parsedData['message']['receiver_channel_name'];

    if(action === 'new-peer'){
        if (!(peerUserName in mapPeers)){
            createOfferer(peerUserName, receiver_channel_name);
            return;
        }
        else {
            setTimeout(() => {
                if (!(peerUserName in mapPeers)){
                    createOfferer(peerUserName, receiver_channel_name);
                    return
                }
            }, 7000);
        }
    }

    if(action === 'new-offer'){
        let offer = parsedData['message']['sdp'];
        createAnswerer(offer, peerUserName, receiver_channel_name);
        return;
    }

    if(action === 'new-answer'){
        let answer = parsedData['message']['sdp'];
        let peer  = mapPeers[peerUserName][0];
        peer.setRemoteDescription(answer);
        return;
    }

    if(action === 'video-on'){
        manageVideoEl('on', peerUserName)
        return;
    }

    if(action === 'video-off'){
        manageVideoEl('off', peerUserName)
        return;
    }
}
// Local streams
let localStream = new MediaStream();
// const constraints = {
//     'video': true,
//     'audio': true
// }

// const localVideo = document.querySelector('#local-video');
// const btnToggleAudio = document.querySelector('#btn-toggle-audio');
// const btnToggleVideo = document.querySelector('#btn-toggle-video');

// let userMedia = navigator.mediaDevices.getUserMedia(constraints)
// .then(stream => {

//     localStream = stream;
//     localVideo.srcObject = localStream;
//     localVideo.muted = true;


//     let audioTracks = stream.getAudioTracks();
//     let videoTracks = stream.getVideoTracks();

//     audioTracks[0].enabled = true;
//     videoTracks[0].enabled = true;

//     btnToggleAudio.addEventListener('click', ()=>{
//         audioTracks[0].enabled = !audioTracks[0].enabled;

//         if(audioTracks[0].enabled){
//             btnToggleAudio.classList.replace('mic-off', 'mic-on')
//             return;
//         }
//         btnToggleAudio.classList.replace('mic-on','mic-off');
//     });

//     btnToggleVideo.addEventListener('click', ()=>{
//         videoTracks[0].enabled = !videoTracks[0].enabled;

//         if(videoTracks[0].enabled){
//             btnToggleVideo.classList.replace('camera-off','camera-on');
//             sendVideoSignal('video-on', {})
//             localVideo.srcObject = localStream;
//             return;
//         }
//         sendVideoSignal('video-off', {})
//         localVideo.srcObject = null;
//         btnToggleVideo.classList.replace('camera-on','camera-off');
//     });
// })
// .catch(error =>{
//     console.log('Error accessing media devices', error);
// });

function createOfferer(peerUserName, receiver_channel_name){
    let peer = new RTCPeerConnection(null);

    addLocalTracks(peer);

    let dc = peer.createDataChannel('channel');
    dc.addEventListener('open', ()=>{
        console.log("dc connection opened");
    });
    // dc.addEventListener('message', dcOnMessage);

    let remoteVideo = createVideo(peerUserName);

    setOnTrack(peer, remoteVideo);

    mapPeers[peerUserName] = [peer, dc];

    peer.addEventListener('iceconnectionstatechange', ()=>{
       let iceconnectionState = peer.iceConnectionState;

       if(iceconnectionState === 'failed' || iceconnectionState === 'disconnected' || iceconnectionState === 'closed'){
           delete mapPeers[peerUserName];

           if(iceconnectionState !== 'closed'){
               peer.close();
           }

           if (!peerUserName.startsWith('viewer_'))
            removeVideo(remoteVideo);
       }
    });

    peer.addEventListener('icecandidate', (event)=>{
       if(event.candidate){
           console.log('new ice candidate', JSON.stringify(peer.localDescription));

           return;
       }
       sendVideoSignal('new-offer', {
           'sdp':peer.localDescription,
           'receiver_channel_name': receiver_channel_name
       });
       // to notify video status of other users when new users join  
       // if(!localStream.getVideoTracks()[0].enabled){
       //     sendVideoSignal('video-off', {})
       // }
    });

    peer.createOffer()
        .then(o => peer.setLocalDescription(o))
        .then(() => {
            console.log("local description set successfully");
        });
}

function createAnswerer(offer, peerUserName, receiver_channel_name){
    let peer = new RTCPeerConnection(null);

    addLocalTracks(peer);
    let remoteVideo = createVideo(peerUserName);

    setOnTrack(peer, remoteVideo);
    peer.addEventListener('datachannel', e=>{
       peer.dc = e.channel;
        peer.dc.addEventListener('open', ()=>{
            console.log("dc connection opened");
        });
        // peer.dc.addEventListener('message', dcOnMessage);
        mapPeers[peerUserName] = [peer, peer.dc];
    });

    peer.addEventListener('iceconnectionstatechange', ()=>{
       let iceconnectionState = peer.iceConnectionState;

       if(iceconnectionState === 'failed' || iceconnectionState === 'disconnected' || iceconnectionState === 'closed'){
           delete mapPeers[peerUserName];

           if(iceconnectionState !== 'closed'){
               peer.close();
           }
           if (!peerUserName.startsWith('viewer_'))
            removeVideo(remoteVideo);
       }
    });

    peer.addEventListener('icecandidate', (event)=>{
       if(event.candidate){
           console.log('new ice candidate', JSON.stringify(peer.localDescription));
           return;
       }
       sendVideoSignal('new-answer', {
           'sdp':peer.localDescription,
           'receiver_channel_name': receiver_channel_name
       });
    });

    peer.setRemoteDescription(offer)
    .then(() => {
        console.log('Remote description set successfully for %s', peerUserName);
        return peer.createAnswer();
    })
    .then(a => {
        console.log('Answer created');
        peer.setLocalDescription(a);
    })
}

function addLocalTracks(peer){
    localStream.getTracks().forEach(track => {
        peer.addTrack(track, localStream);
    });
    return;
}

function manageVideoEl(status, peerUserName) {
    const userId = peerUserName.split('_')[1]
    // After element in DOM update video element
    setTimeout(() => {
        let videoEl = document.querySelector(`video[data-id="${userId}"]`)
        if (videoEl !== null){
            // Saving source
            if (mapPeers[peerUserName]){
                if (videoEl.srcObject != null){
                    mapPeers[peerUserName][2] = videoEl.srcObject;
                }
                
                if (status==='on'){
                    videoEl.srcObject = mapPeers[peerUserName][2] || null;
                } else if (status==='off'){
                    videoEl.srcObject = null;
                }
            }
        }
    }, 1000);
}

function setOnTrack(peer, remoteVideo){
    let remoteStream = new MediaStream();
    remoteVideo.srcObject = remoteStream;
    peer.addEventListener('track', async (event)=>{
       remoteStream.addTrack(event.track, remoteStream);
    });
}

function  createVideo(peerUserName){
    let userId = peerUserName.split('_')[1]

    // Video element Creation
    let remoteVideo = document.createElement('video');
    remoteVideo.id = peerUserName + '-video';
    remoteVideo.autoplay = true;
    remoteVideo.playsInline = true;
    remoteVideo.classList.add('custom-video');
    remoteVideo.setAttribute('data-id', userId);
    if (!peerUserName.startsWith('viewer_')){
        addVideoToDOM(remoteVideo, userId)
    }

    return remoteVideo;
}

function addVideoToDOM(video, userId){
    let videoSection = document.querySelector('#video-section');
    $.getJSON(`/chat/call/participant/${userId}`, function(data){
        // Styling Elements
        video.style.backgroundImage = `url('${data.profile_image_url}')` // if video off then show this bg
        
        const videoCallWrapper =  document.createElement('div')
        videoCallWrapper.classList.add('video-call-wrapper')
        const videoParticipant = document.createElement('div')
        videoParticipant.classList.add('video-participant')
        const nameTag = document.createElement('span')
        nameTag.classList.add('name-tag')
        nameTag.textContent = data.username
        videoParticipant.append(nameTag)
        videoParticipant.append(video)
        videoCallWrapper.append(videoParticipant)

        if (!document.querySelector('.video-call-wrapper'))
            $('#video-section').parent().show()
            
        videoSection.insertAdjacentElement('beforeend', videoCallWrapper);
    })
}

function removeVideo(video){
    document.getElementById(video.id).closest('.video-call-wrapper').remove()
    if (!document.querySelector('.video-call-wrapper'))
        $('#video-section').parent().hide()
    // video.closest(`.video-call-wrapper`).remove()
}

// Fullscreen feature
let fullScreenEl;
document.querySelector('.video-section')?.addEventListener('dblclick', (e)=>{
    if(e.target && e.target.classList.contains('custom-video')) {
        if (!document.fullscreenElement) {
            fullScreenEl = e.target;
            e.target.style.objectFit = 'contain';
            e.target.closest('.video-participant').requestFullscreen().catch((err)=>{
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            })
        } else {
            e.target.style.objectFit = 'cover';
            document.exitFullscreen();
        }
    }
})
document.addEventListener('fullscreenchange', (e)=>{
    if(!document.fullscreenElement){
        // runs when fullscreen is removed by escape key
        if(fullScreenEl){
            fullScreenEl.style.objectFit = 'cover'
        }
    }
})
