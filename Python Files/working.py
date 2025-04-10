import time
import serial
import cv2
import urllib.request
import numpy as np
import down
from ultralytics import YOLO

msg = "NULL"

flag = True

class DETECT_WINDOW:

    def __init__(self,url):
        self.url =url
        DETECT_WINDOW.detect(self,url)

    def detect(self,url):

        while True:
            img_resp = urllib.request.urlopen(url)
            imgnp = np.array(bytearray(img_resp.read()), dtype=np.uint8)
            im = cv2.imdecode(imgnp, -1)
            #val = DETECT_WINDOW.predict(self,im)
            time.sleep(5)
            val_2 = DETECT_WINDOW.predict(self,im)
            time.sleep(2)
            
            if (val_2):
                down.download_image(url,'E://image.jpg')
                break
            else:
                continue
        """cap.release()
        cv2.destroyAllWindows()"""

    def predict(self,im):
        global msg
        model = YOLO(r"E:\Recent object detection\best.pt")
        #Change Confidence rate....
        results = model.predict(source=im, show=False, save=False, conf=0.9)  # source already setup
        #print(results)
        for result in results:
            for box in result.boxes:
                class_id = int(box.data[0][-1])
                print(model.names[class_id])
                if model.names[class_id] == "car":
                    msg = "Car Detected"
                    return True
                else:
                    msg = "NULL"
                    return False

    def str_ret(self):
        return msg

    def arduino_light(self,s):
        if s:
            for i in range(50):
                with serial.Serial('COM4', 9600, timeout=1) as ser:
                    time.sleep(0.1)
                    ser.write(b'H')
                    time.sleep(0.1)
                    ser.write(b'L')
            serial.Serial('COM4',9600,timeout=1).write(b'L')

