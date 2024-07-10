import { useState } from 'react'

const App = () => {
  const imageUrl = "https://fastly.picsum.photos/id/425/200/300.jpg?hmac=P1vjZ6T-wo-aULK7NbbLYxIaV92_0q56o0BFWcWOdmo"
  const [download, setDownload] = useState('')
  const start = async () => {
    const startTime = Date.now()

    try {
      const response = await fetch(imageUrl)
      const reader = response.body.getReader()

      let receivedLength = 0
      const chunks = []
      let flag = true
      while (flag === true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        chunks.push(value)
        receivedLength += value.length
      }
      const endTime = Date.now()
      const duration = (endTime - startTime) / 1000
      const bitsLoaded = receivedLength * 8
      const speedBps = bitsLoaded / duration
      const speedKbps = speedBps / 1024
      const speedMbps = speedKbps / 1024

      setDownload(`${speedMbps} Mbps`)
    } catch {
      setDownload('Error !!!')
    }
  }
  return (
    <>
      <h1>Velocity Test</h1>
      <button type="button" title="Start" onClick={start}>Start</button>
      <label htmlFor="">Download Mbps</label>
      <input type="text" value={download} readOnly/>
    </>
  )
}

export default App
