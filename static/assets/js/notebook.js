// Getting information from template
const session_key = JSON.parse(document.getElementById('session_key').textContent);
const user_id = JSON.parse(document.getElementById('user_id').textContent);
const user_email = JSON.parse(document.getElementById('user_email').textContent);
const group_id = JSON.parse(document.getElementById('group_id').textContent);
//const group_name = JSON.parse(document.getElementById('group_name').textContent);
const group_name = name_url;
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
const chatSocket = new ReconnectingWebSocket(socketChatURL);
chatSocket.onclose = function (e){
    console.log("Connection closed");
    console.log(e);
}
chatSocket.onmessage = validateMessage
getGroupConversation(group_name)

// Validate message
function validateMessage(e) {
    console.log("new message"+e);
    data = JSON.parse(e['data']);
    getGroupMessage(data);
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

