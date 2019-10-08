import processing.serial.*;
import ddf.minim.*;

Serial myPort; 
int val; //val to be read by port
int delayTime = 1000;

int firstTrackStart = 1;
int secondTrackStart = 11;
int resetValue = -1;

Minim minim;
AudioSample e,a,r,t,h,d,i,n,o,s;

boolean firstTrackPlaying = false;
boolean secondTrackPlaying = false;

//button - start first track
float button1X = 100;
float button1Y = 50;
float button1W = 150;
float button1H = 80;

//button - stop first track
float button2X = 300;
float button2Y = 50;
float button2W = 150;
float button2H = 80;

//button - start second track
float button3X = 100;
float button3Y = 200;
float button3W = 150;
float button3H = 80;

//button - stop second track
float button4X = 300;
float button4Y = 200;
float button4W = 150;
float button4H = 80;


void setup(){
  
  //setup the view
  size(550,500);
  background(255);
  stroke(0);
  noFill();
  
  minim = new Minim(this);
  
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 9600);
  e = minim.loadSample("E.mp3");
  a = minim.loadSample("A.mp3");
  r = minim.loadSample("R.mp3");
  t = minim.loadSample("T.mp3");
  h = minim.loadSample("H.mp3");
  d = minim.loadSample("D.mp3");
  i = minim.loadSample("I.mp3");
  n = minim.loadSample("N.mp3");
  o = minim.loadSample("O.mp3");
  s = minim.loadSample("S.mp3");
  
  val = resetValue;
}

void draw() {
  //button rendering
  background(255);
  rect(button1X,button1Y,button1W,button1H);
  rect(button2X,button2Y,button2W,button2H);
  rect(button3X,button3Y,button3W,button3H);
  rect(button4X,button4Y,button4W,button4H);
  
  fill(255);
  textSize(35);
  text("Start 1", button1X+20, button1Y+50);
  text("Stop 1", button2X+20, button2Y+50);
  text("Start 2", button3X+20, button3Y+50);
  text("Stop 2", button4X+20, button4Y+50);
  fill(0);
  
  readFromPort();
  
  //button event
  if(mousePressed){
   if(mouseX>button1X && mouseX <button1X+button1W && mouseY>button1Y && mouseY <button1Y+button1H){
    fill(0);
    firstTrackPlaying = true;
    val = firstTrackStart;
   } else if(mouseX>button2X && mouseX <button2X+button2W && mouseY>button2Y && mouseY <button2Y+button2H){
    fill(0);
    firstTrackPlaying = false;
    myPort.write(-2);
    val = resetValue;
   } else if(mouseX>button3X && mouseX <button3X+button3W && mouseY>button3Y && mouseY <button3Y+button3H){
    fill(0);
    secondTrackPlaying = true;
    val = secondTrackStart;
   } else if(mouseX>button4X && mouseX <button4X+button4W && mouseY>button4Y && mouseY <button4Y+button4H){
    fill(0);
    secondTrackPlaying = false;
    myPort.write(-2);
    val = resetValue;
   }
  } 
  
  if (firstTrackPlaying){
    firstTrack();
  } else if (secondTrackPlaying) {
    secondTrack();
  } else {
    val = resetValue;
  }
  
}

void firstTrack(){
  if (val == 1) {
    e.trigger();
    delay(delayTime);
    myPort.write(2);
    val = resetValue;
  }
  else if (val == 3){
    a.trigger();
     delay(delayTime);
     myPort.write(4);
     val = resetValue;
  }
  else if (val == 5){
    r.trigger();
     delay(delayTime);
     myPort.write(6);
     val = resetValue;
  }
  else if (val == 7){
    t.trigger();
     delay(delayTime);
     myPort.write(8);
     val = resetValue;
  }
  else if (val == 9){
    h.trigger();
     delay(delayTime);
     myPort.write(10);
     val = resetValue;
  }
}

void secondTrack(){
  if (val == 11) {
    d.trigger();
    delay(delayTime);
    myPort.write(12);
    val = resetValue;
  }
  else if (val == 13){
    i.trigger();
     delay(delayTime);
     myPort.write(14);
     val = resetValue;
  }
  else if (val == 15){
    n.trigger();
     delay(delayTime);
     myPort.write(16);
     val = resetValue;
  }
  else if (val == 17){
    o.trigger();
     delay(delayTime);
     myPort.write(18);
     val = resetValue;
  }
  else if (val == 19){
    s.trigger();
     delay(delayTime);
     myPort.write(20);
     val = resetValue;
  }
}

void readFromPort(){
  if ( myPort.available() > 0) {  // If data is available,
    val = myPort.read();         // read it and store it in val
  }
}
