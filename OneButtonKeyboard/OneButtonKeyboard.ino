#include "Quirkbot.h"

AnalogSensor sensor;
KeyPress keyPress;
SerialMonitor monitor;


void start(){
  sensor.place = A0;
  keyPress.key = KEY_SPACE;
  
  sensor.out.connect(keyPress.trigger);
  monitor[0].connect(sensor.out);                                                                                                     

}
