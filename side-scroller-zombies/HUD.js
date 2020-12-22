class HUD {
    static drawHealthBar(camX, pHealth){
        push();
        fill("black");

        let w = 150;
        rect(-camX + 10, 10, w, 20);

        fill("red");
        let healthW = map(pHealth, 0, 100, 0, 148);
        healthW = constrain(healthW, 0, 148);
        rect(-camX + 11, 11, healthW, 18)

        pop();
    }

    static draw(camX, player){
        this.drawHealthBar(camX, player.health);
    }
}