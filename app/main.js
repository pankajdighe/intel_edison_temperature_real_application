var mraa = require('mraa'); //require mraa
const mqtt = require('mqtt');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to resin.io dashboard logs
var analogPin0 = new mraa.Aio(1); //setup access analog inpuput pin 0
 //read the pin value as a float




periodicActivity(); //call the periodicActivity function

function periodicActivity()
{

	var a = analogPin0.read();

	var B = 3975;

 var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
        console.log("Resistance: "+resistance);

   var celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet ;

 const client =  mqtt.connect('mqtt://iot.eclipse.org', 1883, 60);


var msg=""+celsius_temperature;

client.on('connect', function () {

	var topic1 = 'topic/GeneralizedIoT/'+process.env.RESIN_DEVICE_UUID;
	console.log("Connection Successful "+ topic1);

	client.publish(topic1,msg);
});



  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}