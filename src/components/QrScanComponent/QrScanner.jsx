import React, { useRef, useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import { Reader } from '@zxing/library';

function QRScanner({ onScan }) {
  const cameraRef = useRef(null);

  useEffect(() => {
    const codeReader = new Reader();
    
    const startScanning = async () => {
      try {
        const videoInputDevices = await codeReader.getVideoInputDevices();
        
        if (videoInputDevices.length > 0) {
          // Use the first available camera
          const selectedDeviceId = videoInputDevices[0].deviceId;
          const constraints = { video: { deviceId: selectedDeviceId } };
          await codeReader.decodeFromVideoDevice(undefined, cameraRef.current.video, (result, error) => {
            if (result) {
              // Pass the scanned QR code data to the parent component
              onScan(result.getText());
            } else if (error) {
              console.error(error);
            }
          }, constraints);
        } else {
          console.error('No video input devices found.');
        }
      } catch (error) {
        console.error(error);
      }
    };

    startScanning();

    return () => {
      codeReader.reset();
    };
  }, [onScan]);

  return (
    <div>
      <Camera
        ref={cameraRef}
        idealFacingMode="environment"
        isFullscreen={true}
        onCameraStart={() => console.log('Camera started')}
        onCameraStop={() => console.log('Camera stopped')}
      />
    </div>
  );
}

export default QRScanner;
