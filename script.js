const imageupload = document.getElementById("imageUpload")

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

function start(){
    const container = document.createElement('div')
    container.style.position = 'relative'
    document.body.append(container)

    document.body.append('Loaded')
    imageupload.addEventListener('change', async() => {
        const image = await faceapi.bufferToImage(imageupload.files[0])
        document.body.append(image)
        const canvas = faceapi.createCanvasFromMedia(image)
        document.body.append(canvas)
        const displaySize = {width: image.width, height: image.height}
        faceapi.matchDimensions(canvas, displaySize)
        const detections = await facepi.detectAllFaces(image)
        .withFaceLandmarks().withFaceDescriptors()
        const resizedDetetctions = faceapi.resizeResults(detections, displaySize)
    })
}



