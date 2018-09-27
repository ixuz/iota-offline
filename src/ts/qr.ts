//import jsQR from 'jsqr'
import QrCode from 'qrcode-reader'
import QRious from 'qrious';

function generateQR(): void {

  let qrElement: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('qr');

  console.log(QRious);
  var qr = new QRious({
    element: qrElement,
    value: 'https://github.com/neocotic/qrious',
    size: 256
  });
}

function scanQR(): void {
  let video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('video');
  let outVideoCanvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('outVideo');

  console.log("video: ", video);

  var qr = new QrCode();



  var n = <any>navigator;

  n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

  n.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream: MediaSource) {
    console.log("Stream");
    
    video.srcObject = stream;
    video.play();

    console.log("outVideoCanvas: " + outVideoCanvas);
    var context = outVideoCanvas.getContext('2d');

    var interval = setInterval(function() {
      if (context !== null) {
        console.log("Rendering!");
        outVideoCanvas.width = video.videoWidth;
        outVideoCanvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        let imageData: any = context.getImageData(0,0,video.videoWidth,video.videoHeight);
        qr.decode(imageData);
      }
    }, 300);
    
    qr.callback = function(error: any, result: any) {
      if(error) {
        console.log(error)
        return;
      }
      console.log(result)
      clearInterval(interval);
    }
  });



/*
  var n = <any>navigator;

  n.getUserMedia = ( n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia  || n.msGetUserMedia );

  n.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream: MediaSource) {
    console.log("Stream");
    
    video.srcObject = stream;
    video.play();

    console.log("outVideoCanvas: " + outVideoCanvas);
    var context = outVideoCanvas.getContext('2d');

    var interval = setInterval(function() {
      if (context !== null) {
        console.log("Rendering!");
        outVideoCanvas.width = video.videoWidth;
        outVideoCanvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        let imageData: any = context.getImageData(0,0,video.videoWidth,video.videoHeight);
        const code = jsQR(imageData.data, video.videoWidth, video.videoHeight);

        if (code) {
          console.log("Found QR code", code);
          clearInterval(interval);
        }
      }
    }, 300);
  });

  */
}

// Expose the function to the browser
(<any>window).generateQR = generateQR;
(<any>window).scanQR = scanQR;
