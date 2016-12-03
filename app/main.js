var mraa = require('mraa'); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to resin.io dashboard logs
var analogPin0 = new mraa.Aio(1); //setup access analog inpuput pin 0
 //read the pin value as a float


periodicActivity(); //call the periodicActivity function

function periodicActivity()
{

	var analogValueFloat = analogPin0.readFloat();

  console.log("Temperature Value "+analogValueFloat);
  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}