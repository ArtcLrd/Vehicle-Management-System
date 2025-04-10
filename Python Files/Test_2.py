import serial,time

class Arduino:

    def  __init__(self,i,index,flag):
        if(i==1):
            dev = serial.Serial("COM4",baudrate=19200)
            self.Blink_light(dev)
        if(i==2):
            dev = serial.Serial("COM4",baudrate=19200)
            self.Servo(dev,index,flag)
        

    def Blink_light(self,dev):
        print("Blinking Started...")
        for _ in range(10):
            dev.write(b'0') 
            time.sleep(1)
            dev.write(b'1')
            time.sleep(1)
            dev.write(b'0')
            time.sleep(1)

    def Servo(self,dev,index,ON):
        if index == 1:

            if ON:
                    time.sleep(1)
                    dev.write(b'1')
                    time.sleep(1)
            else:
                    time.sleep(1)
                    dev.write(b'0')
                    time.sleep(1)

        elif index == 2:

            if ON:
                for _ in range(1):
                    
                    dev.write(b'1')
                    time.sleep(1)
                    dev.write(b'0')
                    time.sleep(1)
            else:
                for _ in range(1):

                    dev.write(b'0')
                    time.sleep(1)
                    dev.write(b'1')
                    time.sleep(1)

if __name__ == "__main__":
     Arduino(2,2,False)
