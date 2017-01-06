PImage obama;
PImage smaller;
PImage[] allImages;
float[] brightness;
PImage[] brightImages;

int scl = 16;
int w, h;
void setup() {
  size(600, 749);
  obama = loadImage("obama.jpg");

  File[] files = listFiles(sketchPath("data/photos"));
  //allImages = new PImage[files.length-1];
  allImages = new PImage[1500];
  brightness = new float[allImages.length];
  brightImages = new PImage[256];

  for (int i = 0; i < allImages.length; i++) {
    println(i);
    String filename = files[i+1].toString();
    PImage img = loadImage(filename);

    allImages[i] = createImage(scl, scl, RGB);
    allImages[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    allImages[i].loadPixels();
    float avg = 0;
    for (int j = 0; j < allImages[i].pixels.length; j++) {
      float b =  brightness(allImages[i].pixels[j]);
      avg += b;
    }
    avg /= allImages[i].pixels.length;
    brightness[i] = avg;
    System.gc();
  }

  for (int i = 0; i < brightImages.length; i++) {
    float record = 256;
    for (int j = 0; j < brightness.length; j++) {
      float diff = abs(i - brightness[j]);
      if (diff < record) {
        record = diff;
        brightImages[i] = allImages[j];
      }
    }
  }


  w = obama.width/scl;
  h = obama.height/scl;
  smaller = createImage(w, h, RGB);
  smaller.copy(obama, 0, 0, obama.width, obama.height, 0, 0, w, h);
}

void draw() {
  background(0);
  smaller.loadPixels();
  for (int x =0; x < w; x++) {
    for (int y = 0; y < h; y++) {
      int index = x + y * w;
      color c = smaller.pixels[index];
      int imageIndex = int(brightness(c));
      //fill(brightness(c));
      //noStroke();
      //rect(x*scl, y*scl, scl, scl);
      image(brightImages[imageIndex], x*scl, y*scl, scl, scl);
    }
  }
  //image(obama, 0, 0);
  //image(smaller,0,0);

  noLoop();
}


File[] listFiles(String dir) {
  File file = new File(dir);
  if (file.isDirectory()) {
    File[] files = file.listFiles();
    return files;
  } else {
    // If it's not a directory
    return null;
  }
}