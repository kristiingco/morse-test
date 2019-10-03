int shortTimer = 200; //short signal in morse code
int longTimer = 800; //long signal in morse code
int interval = 300; //interval between signals
int delayTime = 1000; //delay between letters
int ledPin = 2; //default led pin
int resetValue = -1; //reset value
int firstTrackStart = 1; //first track start
int secondTrackStart = 11; //second track sta

int val; //val to be read

int e[] = {shortTimer};
int a[] = {shortTimer, longTimer};
int r[] = {shortTimer, longTimer, shortTimer};
int t[] = {longTimer};
int h[] = {shortTimer,shortTimer,shortTimer,shortTimer};
int d[] = {longTimer, shortTimer, shortTimer};
int i[] = {shortTimer, shortTimer};
int n[] = {longTimer, shortTimer};
int o[] = {longTimer, longTimer, longTimer};
int s[] = {shortTimer, shortTimer, shortTimer};


void setup() {
  Serial.begin(9600);
  pinMode(ledPin, OUTPUT);
  val = resetValue;
}

void loop() {
  readFromPort();
  stopListener();
  firstTrack();
  secondTrack();
}

void stopListener(){
  if (val == -2){
    val = resetValue;
  }
}

void turnOn(int d) {
  digitalWrite(ledPin, HIGH);
  delay(d);
  digitalWrite(ledPin, LOW);
  delay(interval);
}

void performSequence(int x[], int s) {
  for (int i = 0; i < s; i++) {
    turnOn(x[i]);
  }
}

void firstTrack() {
  if (val == 2) {
    performSequence(e,1);
    delay(delayTime);
    val = resetValue;
    Serial.write(3);
  } else if (val == 4){
    performSequence(a,2);
    delay(delayTime);
    val = resetValue;
    Serial.write(5);
  } else if (val == 6){
    performSequence(r,3);
    delay(delayTime);
    val = resetValue;
    Serial.write(7);
  } else if (val == 8){
    performSequence(t,1);
    delay(delayTime);
    val = resetValue;
    Serial.write(9);
  } else if (val == 10){
    performSequence(h,4);
    delay(delayTime);
    val = resetValue;
    Serial.write(firstTrackStart);
  }
}

void secondTrack() {
  if (val == 12) {
    performSequence(d,3);
    delay(delayTime);
    val = resetValue;
    Serial.write(13);
  } else if (val == 14){
    performSequence(i,2);
    delay(delayTime);
    val = resetValue;
    Serial.write(15);
  } else if (val == 16){
    performSequence(n,2);
    delay(delayTime);
    val = resetValue;
    Serial.write(17);
  } else if (val == 18){
    performSequence(o,3);
    delay(delayTime);
    val = resetValue;
    Serial.write(19);
  } else if (val == 20){
    performSequence(s,3);
    delay(delayTime);
    val = resetValue;
    Serial.write(secondTrackStart);
  }
}

void readFromPort() {
  if(Serial.available()){
    val = Serial.read();
  }
}

