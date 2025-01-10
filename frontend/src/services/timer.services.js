

const socket = new WebSocket("ws://localhost:8080/timer-track")

const test = () => {

    // Connection opened
    socket.addEventListener("open", event => {
        socket.send("Connection established")
    })

    socket.addEventListener("message", event => {
        console.log("Message")
    })

}



export default test