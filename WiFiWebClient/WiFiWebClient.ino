

// Simple POST client for ArduinoHttpClient library
// Connects to server once every five seconds, sends a POST request
// and a request body

#include <DHT.h>
#include <SPI.h>
#include <WiFi101.h>
#include "arduino_secrets.h"
#include <ArduinoHttpClient.h>

// Constants
#define DHTPIN 2          // what pin we're connected to
#define DHTTYPE DHT22     // DHT 22  (AM2302)
DHT dht(DHTPIN, DHTTYPE); //// Initialize DHT sensor for normal 16mhz Arduino

// Variables
float hum;  // Stores humidity value
float temp; // Stores temperature value

///////please enter your sensitive data in the Secret tab/arduino_secrets.h
/////// WiFi Settings ///////
char ssid[] = SECRET_SSID;
char pass[] = SECRET_PASS;

char serverAddress[] = "192.168.2.0"; // server address
int port = 7139;

WiFiClient wifi;
HttpClient client = HttpClient(wifi, serverAddress, port);
int status = WL_IDLE_STATUS;

void setup()
{
  Serial.begin(9600);
  dht.begin();
  while (status != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(ssid); // print the network name (SSID);

    // Connect to WPA/WPA2 network:
    status = WiFi.begin(ssid, pass);
  }

  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
}

void loop()
{
  readTempAndHum();
  String path = "/api/sensor/sendData";
  Serial.println("making POST request");
  String contentType = "application/x-www-form-urlencoded";

  // String postData = "humidity=15.25&temperature=25.50";
  String postData = "humidity=" + String(hum, 3) + "&temperature=" + String(temp, 3);

  Serial.print("postData: = "); // DEBUG
  Serial.println(postData);     // DEBUG

  client.post(path, contentType, postData);

  // read the status code and body of the response
  int statusCode = client.responseStatusCode();
  String response = client.responseBody();

  Serial.print("Status code: ");
  Serial.println(statusCode);
  Serial.print("Response: ");
  Serial.println(response);

  Serial.println("Wait five seconds");
  delay(5000);
}

void readTempAndHum()
{
  hum = dht.readHumidity();
  temp = dht.readTemperature();
  Serial.print("Humidity: ");
  Serial.print(hum);
  Serial.print(" %, Temp: ");
  Serial.print(temp);
  Serial.println(" Celsius");
  // delay(1000); // Delay 1 sec.
}