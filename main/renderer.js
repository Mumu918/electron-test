let counter = 0
const test1 = document.getElementById('test1')
test1.addEventListener('click', () => {
  api.setTitle(counter++)
})

const counterElement = document.getElementById('counter')
api.updateCounter((event, value) => {
  counter += value
  counterElement.innerText = counter
  event.sender.send('update-counter', counter)
})

const test2 = document.getElementById('test2')
test2.addEventListener('click', async () => {
  const status = await api.openDialog()
  console.log(status)
})

const info = document.getElementById('info')
info.innerText = `chrome-version: ${versions.chrome()}\nnode-version: ${versions.node()}\nelecreon-version: ${versions.electron()}`

const drag = document.getElementById('drag')
drag.addEventListener('dragstart', (event) => {
  event.preventDefault()
  api.startDrag('test.md')
})

const notification = document.getElementById('notification')
notification.addEventListener('click', () => {
  api.showNotification(++counter)
})

const updateStatus = () => {
  const status = document.getElementById('status')
  status.innerText = navigator.onLine ? 'online' : 'offline'
}

window.addEventListener('online', updateStatus)
window.addEventListener('offline', updateStatus)
updateStatus()
