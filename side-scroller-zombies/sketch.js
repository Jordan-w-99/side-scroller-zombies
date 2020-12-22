let player;
let zombies = [];
let bullets = [];
let bg;
let loaded = false;
let imgs = [];
let startTime, nextSpawnTime;

function setup() {
  load();
  createCanvas(800, 400);
}

function load() {
  DataHandler.loadImgs();
  DataHandler.loadImgData();
}

function draw() {
  background(220);

  if (loaded == false) {
    loaded = DataHandler.isLoaded();

    if (loaded == true) {
      player = new Player(width / 2, (3 / 4) * height, 80, 80, { data: DataHandler.imgData['player'], img: DataHandler.imgs['player'] }, 10);
      bg = new Background(width / 2, height / 2, 2400, 400, DataHandler.imgs['background']);
      loaded = true;
      console.log("loaded");
    }
  }
  else {
    if (!startTime) {
      startTime = floor(millis());
      nextSpawnTime = startTime;
    }

    if (floor(millis()) >= nextSpawnTime) {
      // console.log("zombie spawned");
      spawnZombie();
      nextSpawnTime = millis() + floor(random(100, 2500));
    }

    let camX = width / 2 - player.x;
    camX = constrain(camX, -width, width)

    translate(camX, 0);

    if (keyIsDown(65)) player.move('a');
    else if (keyIsDown(68)) player.move('d');

    bg.draw();

    for (let i = 0; i < zombies.length; i++) {
      zombies[i].update(player.dead==false?player.x:null);
      zombies[i].draw();

      if(zombies[i].collides(player) && zombies[i].state == 1 && player.dead == false){
        player.takeDamage(zombies[i].hit());
      }
    }

    player.update();
    player.draw();

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].update();

      if (bullets[i].toRemove == true) {
        bullets.splice(i, 1);
        console.log("bullet removed");
      }
      else {
        bullets[i].draw();

        for (let j = 0; j < zombies.length; j++) {
          if (bullets[i].collides(zombies[j]) && zombies[j].state != 3) {
            bullets.splice(i, 1);
            zombies[j].die();
            break;
          }
        }
      }
    }

    HUD.draw(camX, player);
  }
}

function keyPressed() {
  if (key == ' ') player.shoot();
}

function spawnZombie() {
  let side = random([-width - 80, width * 2 + 80]);
  zombies.push(new Zombie(side, (3 / 4) * height, 80, 80, { data: DataHandler.imgData['zombie1'], img: DataHandler.imgs['zombie1'] }, 10, side == (-width - 80) ? 1 : -1));
}