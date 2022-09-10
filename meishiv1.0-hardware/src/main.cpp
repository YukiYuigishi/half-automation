#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>

const char *ssid = "TP-Link_3B04";
const char *password = "63464320";

String serverName = "https://half-automation.yuigishi.workers.dev/";
String response = "";

DynamicJsonDocument doc(2048);
void setup() {

  Serial.begin(115200);

  WiFi.mode(WIFI_STA);

  if (WiFi.begin(ssid, password) != WL_DISCONNECTED) {
    ESP.restart();
  }

  while ((WiFi.status() != WL_CONNECTED)) {
    delay(1000);
    Serial.print(".");
  }

  configTime(9 * 3600L, 0, "ntp.nict.jp", "time.google.com",
             "ntp.jst.mfeed.ad.jp");
}

struct tm timeInfo;
char s[20];

void loop() {

  while ((WiFi.status() != WL_CONNECTED)) {
    delay(1000);
    Serial.print(".");
  }
  getLocalTime(&timeInfo);
  sprintf(s, " %04d/%02d/%02d %02d:%02d:%02d", timeInfo.tm_year + 1900,
          timeInfo.tm_mon + 1, timeInfo.tm_mday, timeInfo.tm_hour,
          timeInfo.tm_min, timeInfo.tm_sec); //人間が読める形式に変換

  String serverPath = serverName + "/1234567890";
  HTTPClient http;

  http.begin(serverPath.c_str());

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();

    deserializeJson(doc, http.getStream());

    Serial.println(doc["id"].as<String>());


    Serial.println(payload);
  } else {
    Serial.print("Error Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();

  delay(5000);
}
