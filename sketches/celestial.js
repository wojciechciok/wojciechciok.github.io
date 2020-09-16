class Celestial {
    constructor(radius, distance, color, year) {
      this.radius = radius;
      this.distance = distance;
      this.color = color;
      this.angle = 0;
      this.year = year;
      this.offset = random(0, TWO_PI);
    }
    show() {
      noStroke();
      fill(this.color);
      ellipse(this.distance, 0, this.radius, this.radius);
    }
  }