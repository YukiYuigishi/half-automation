#include <Arduino.h>
#include <ArduinoJson.h>
#include <HTTPClient.h>
#include <WiFi.h>

const char *ssid = "TP-Link_3B04";
const char *password = "63464320";

String serverName = "https://half-automation.yuigishi.workers.dev/api/timer";
String response = "";

DynamicJsonDocument doc(2048);
void setup()
{

  Serial.begin(115200);

  WiFi.mode(WIFI_STA);

  if (WiFi.begin(ssid, password) != WL_DISCONNECTED)
  {
    ESP.restart();
  }

  while ((WiFi.status() != WL_CONNECTED))
  {
    delay(1000);
    Serial.print(".");
  }

  pinMode(15, OUTPUT);
  digitalWrite(15, HIGH);

  configTime(9 * 3600L, 0, "ntp.nict.jp", "time.google.com",
             "ntp.jst.mfeed.ad.jp");
}

struct tm timeInfo;
char s[20];

void loop()
{

  while ((WiFi.status() != WL_CONNECTED))
  {
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

  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();

    DeserializationError error = deserializeJson(doc, payload);
    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }

    const char *id = doc["timer"]["id"];
    Serial.println(id);
    Serial.println(payload);
  }
  else
  {
    Serial.print("Error Code: ");
    Serial.println(httpResponseCode);
  }

  http.end();

  const char *id = doc["timer"]["startTime"];
  char nowTime[20] = {0};
  sprintf(nowTime, "%d:%d", timeInfo.tm_hour, timeInfo.tm_min);
  Serial.println(nowTime);

  if (strcmp(id, nowTime) == 0)
  {
    Serial.println("Success");
    digitalWrite(15, LOW);
    delay(1000);
    digitalWrite(15,HIGH);
  }
  else
  {
    Serial.println("Failed");
  }

  delay(5000);
}
