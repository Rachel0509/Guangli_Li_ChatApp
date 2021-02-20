import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');
    //load the socket library and make a connection
    const socket = io();

    //messenger service even handling -> incoming from manager
    function setUserId({ sID, message }) {
        //incoming connected event with data
        // debugger;
        vm.socketID = sID;
    }

    function appendMessage(message) {
        vm.messages.push(message);

        setTimeout(() => {
            document.querySelector('.messages ul:nth-last-child(1) .new-message').scrollIntoView();
        }, 0);
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },
        created: function () {
            console.log('its alive!');
            this.nickname = localStorage.getItem('username');
        },
        methods: {
            dispatchMessage() {
                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymous" })

                this.message = "";
            }
        },
        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);
})();