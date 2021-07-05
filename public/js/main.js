var socket = io();

new Vue({
    el: '#app',
    data: {
        message: "",
        messages: []
    },
    methods: {
        send() {
            msg = {
                author: 'Me',
                message: this.message
            };
            socket.emit('chat message', msg);
            this.messages.push(msg);
            this.message = "";
        }
    },
    mounted() {
        socket.on('chat message', (msg) => {
            this.messages.push(msg);
            setTimeout(() => {
                const chatContainer = document.querySelector("#messages-container");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 10);
        });
    }
})