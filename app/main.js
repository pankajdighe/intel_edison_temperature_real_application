var mraa = require('mraa'); //require mraa
const mqtt = require('mqtt');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to resin.io dashboard logs
var analogPin0 = new mraa.Aio(1); //setup access analog inpuput pin 0
 //read the pin value as a float

var topic1 = 'topic/GeneralizedIoT'+process.env.RESIN_DEVICE_UUID;


periodicActivity(); //call the periodicActivity function

function periodicActivity()
{

	var analogValueFloat = analogPin0.read();

  console.log("Temperature Value "+analogValueFloat);

 const client =  mqtt.connect('mqtt://iot.eclipse.org', 1883, 60);



client.on('connect', function () {
	console.log("Connection Successful");
	client.publish(topic1,analogValueFloat);
});



  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}