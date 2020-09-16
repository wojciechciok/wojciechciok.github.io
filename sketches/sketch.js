let celestials = [];
function setup() {
  let size = windowHeight > windowWidth ? windowWidth : windowHeight;
  createCanvas(size, size);
  background(0);
  loadJSON('../sketches/solar.json', function(celestial_data) {
    let spacing = width / celestial_data.length / 2;
    for (let i = 0; i < celestial_data.length; i++) {
      let c = celestial_data[i];
      celestials.push(new Celestial(c.radius * spacing / 60, i * spacing, c.color, c.year, c.name));
    }
  });
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  for (let c of celestials) {
    push();
    rotate((-frameCount * 5) / c.year + c.offset);
    c.show();
    pop();
  }
}