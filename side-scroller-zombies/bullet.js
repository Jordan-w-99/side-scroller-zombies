class Bullet extends GameObject {
    constructor(x, y, w, h, img, vel) {
        super(x, y, w, h, img, vel);
        this.life = 1;
        this.toRemove = false;
    }

    update() {
        if (!this.toRemove) {
            if (this.life <= 0) this.toRemove = true;
            this.life -= 0.02;

            this.x += this.vel.x;
        }
    }

    draw() {
        const i = this.img.img;

        if (!this.toRemove && i) {
            push();

            const d = this.img.data.frames['_Weapon/Bullet.png'];

            translate(this.x, this.y);
            imageMode(CENTER);
            image(i, 0, 0, this.w, this.h, d.frame.x, d.frame.y, d.frame.w, d.frame.h);
            pop();
        }
    }
}