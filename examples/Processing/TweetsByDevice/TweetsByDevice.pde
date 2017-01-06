Table potus;
Table flotus;

color potusC = color(255, 255, 0);
color flotusC = color(0, 255, 255);

void setup() {

  size(800, 600);
  pixelDensity(2);
  potus = loadTable("potus_tweets.csv", "header");
  flotus = loadTable("flotus_tweets.csv", "header");

  IntDict potusDevices = new IntDict();
  IntDict flotusDevices = new IntDict();

  for (TableRow row : potus.rows()) {
    String s = row.getString("source");
    potusDevices.increment(s);
  }
  for (TableRow row : flotus.rows()) {
    String s = row.getString("source");
    flotusDevices.increment(s);
  }

  int highest = flotusDevices.maxValue();
  highest = max(highest, potusDevices.maxValue());

  background(0);

  String[] potusList = potusDevices.keyArray();
  String[] flotusList = flotusDevices.keyArray();

  ArrayList<String> devices = new ArrayList<String>();
  for (int i = 0; i < potusList.length; i++) {
    String device = potusList[i];
    devices.add(device);
  }
  for (int i = 0; i < flotusList.length; i++) {
    String device = flotusList[i];
    if (!devices.contains(device)) {
      devices.add(device);
    }
  }


  int total = devices.size();
  float w = float(width) / (total+1);
  float x = w;
  int alternate = 0;
  for (String device : devices) {
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text(device, x, height - 50 +(alternate % 2) * 16);
    alternate++;

    int potusN = 0;
    int flotusN = 0;
    if (potusDevices.hasKey(device)) {
      potusN = potusDevices.get(device);
    }
    if (flotusDevices.hasKey(device)) {
      flotusN = flotusDevices.get(device);
    }

    float y = height - 75;
    noStroke();

    float h1 = map(flotusN, 0, highest, 0, height-100)+1;
    fill(flotusC);
    rect(x-5, y-h1, 10, h1);
    textAlign(RIGHT);
    text(flotusN, x-2, y-h1-5);

    float h2 = map(potusN, 0, highest, 0, height-100)+1;
    fill(potusC);
    rect(x+5, y-h2, 10, h2);
    textAlign(LEFT);
    text(potusN, x+10, y-h2-5);

    x += w;
  }

  
  textSize(32);
  textAlign(LEFT);
  fill(flotusC);
  text("FLOTUS", 10, 40);
  fill(potusC);
  text("POTUS", 10, 80);
}