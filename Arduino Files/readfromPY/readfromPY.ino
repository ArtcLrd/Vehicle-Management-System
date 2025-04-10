
const int IR_PIN = 9;
#include <Servo.h>
//8-1st IR,9-2nd IR, 10 -1st servo,11-2ndservo
Servo servo1;
Servo servo2;


int val;
void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  Serial.begin(19200);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(9, INPUT);
  pinMode(10,INPUT);
  servo2.attach(12);
  servo2.write(180);
  servo1.attach(10);  // attaches the servo on pin 9 to the servo objectư
  servo1.write(10); 
}

// the loop function runs over and over again forever
void loop() {
  

  if (Serial.available() > 0){
    int val = char(Serial.read())-'0';
    Serial.write("\n");
    
    

    if(val == 1){
      Serial.write("ON\n");
      digitalWrite(LED_BUILTIN, HIGH);
      onServo1();
      onServo2();
      delay(1500);
    } 
      
    if(val == 0){
      Serial.write("OFF\n");
      digitalWrite(LED_BUILTIN, LOW);
      offServo1();
      offServo2();
      delay(1500);
      }

}
int irSensorValue = digitalRead(9);
    if (irSensorValue == LOW){
      onServo2();
      delay(3000);
      offServo2();
    }
int irSensorValue2 = digitalRead(10);
Serial.write(irSensorValue2);
    if (irSensorValue2 == HIGH){
      onServo1();
      delay(3000);
      offServo1();
    }
  }



void  onServo1(){
for (int pos = 10; pos <= 100; pos += 1) {  // rotate from 180 degrees to 0 degrees, one by one degree
    servo1.write(pos);                        // control servo to go to position in variable 'pos'
    delay(50);                               // waits 10ms for the servo to reach the position
  }
  delay(1000);
}

void  offServo1(){
  for (int pos = 100; pos >= 10; pos -= 1) {  // rotate from 180 degrees to 0 degrees, one by one degree
    servo1.write(pos);                        // control servo to go to position in variable 'pos'
    delay(50);                               // waits 10ms for the servo to reach the position
  }
  delay(1000);
}




void  onServo2(){
for (int pos = 180; pos >= 90; pos -= 1) {  // rotate from 180 degrees to 0 degrees, one by one degree
    servo2.write(pos);                        // control servo to go to position in variable 'pos'
    delay(50);                               // waits 10ms for the servo to reach the position
  }
  delay(1000);
}

void  offServo2(){
  for (int pos = 90; pos <= 180; pos += 1) {  // rotate from 180 degrees to 0 degrees, one by one degree
    servo2.write(pos);                        // control servo to go to position in variable 'pos'
    delay(50);                               // waits 10ms for the servo to reach the position
  }
  delay(1000);
}
