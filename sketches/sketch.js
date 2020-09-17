let solar = function (p) {
  let celestials = [];
  p.setup =  function() {
    let size = $("#solar").parent().width()
    p.createCanvas(size, size);
    p.background(0);
    p.loadJSON('/sketches/solar.json', function(celestial_data) {
      let spacing = p.width / celestial_data.length / 2;
      for (let i = 0; i < celestial_data.length; i++) {
        let c = celestial_data[i];
        celestials.push(new Celestial(c.radius * spacing / 60, i * spacing, c.color, c.year, c.name, p));
      }
    });
  }
  
  p.draw = function() {
    p.background(0);
    p.translate(p.width / 2, p.height / 2);
  
    for (let c of celestials) {
      p.push();
      p.rotate((-p.frameCount * 5) / c.year + c.offset);
      c.show();
      p.pop();
    }
  }

  class Celestial {
    constructor(radius, distance, color, year) {
      this.radius = radius;
      this.distance = distance;
      this.color = color;
      this.angle = 0;
      this.year = year;
      this.offset = p.random(0, p.TWO_PI);
    }
    show() {
      p.noStroke();
      p.fill(this.color);
      p.ellipse(this.distance, 0, this.radius, this.radius);
    }
  }

}

let solarP5 = new p5(solar, 'solar');
