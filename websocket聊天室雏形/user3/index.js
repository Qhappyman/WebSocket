const content = document.getElementsByClassName('content')[0]
const text = document.getElementById('text')
const but = document.getElementById('but')
const left = document.getElementById('left')
const right = document.getElementById('right')
const exit = document.getElementById('exit')

const ws = new WebSocket("ws://localhost:8000")
but.addEventListener('click', send, false)
exit.addEventListener('click', () => {
    ws.close()
    alert('退出成功')

})

function send() {
    right.innerHTML += text.value + '<br/>'
    ws.send(text.value)
    text.value = ''
    left.innerHTML += '<br/>'

}



ws.onopen = function () {
    ws.send("建立连接")
    right.innerHTML += '<br/>'
}

ws.onmessage = function (event) {
    const data = event.data
    if (data.includes('start&')) {
        console.log(data.split('&')[1])
        const clientName = data.split('&')[1]
        if (!sessionStorage.getItem('clientName')) {
            sessionStorage.setItem('clientName', clientName)
            left.innerHTML += clientName + '进入房间<br/>'
        }
    } else {
        const clientName = sessionStorage.getItem('clientName')
        const dataArr = data.split('&')
        console.log(clientName, dataArr[0])
        console.log(clientName == dataArr[0])
        if (!(clientName == dataArr[0])) {
            left.innerHTML += dataArr[0] + ':' + dataArr[1] + '<br/>'
            right.innerHTML += '<br/>'
        }

    }
}
ws.onclose = function (event) {
    console.log('client close')
    sessionStorage.removeItem('clientName')
}