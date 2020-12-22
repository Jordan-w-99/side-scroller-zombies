class Player extends Character {
    constructor(x, y, w, h, img, animFrameCount) {
        super(x, y, w, h, img, animFrameCount);
        this.states = ["Idle", "Run", "Shoot", "Die"];
        this.weapon = "Gun";
        this.health = 100;
    }

    getCurFrame() {
        if (this.state == 4) {
            console.log(`06-Die/JK_P__Die_00${floor(this.animFrame)}.png`);
            return this.img.data.frames[`06-Die/JK_P__Die_00${floor(this.animFrame)}.png`];
        }
        //console.log(`_Mode-${this.weapon}/0${this.state}-${this.states[this.state - 1]}/JK_P_${this.weapon}__${this.states[this.state - 1]}_00${floor(this.animFrame)}.png`);
        return this.img.data.frames[`_Mode-${this.weapon}/0${this.state}-${this.states[this.state - 1]}/JK_P_${this.weapon}__${this.states[this.state - 1]}_00${floor(this.animFrame)}.png`];
    }

    draw() {
        const i = this.img.img;
        if (i) {
            push();

            const d = this.getCurFrame();
            translate(this.x, this.y);
            scale(this.facing, 1);

            imageMode(CENTER);
            image(i, 0, 0, this.w, this.h, d.frame.x, d.frame.y, d.frame.w, d.frame.h);

            pop();
        }
    }

    update() {
        if (this.dead == false) {

            this.animFrame += 1 * (deltaTime / 60);
            if (this.animFrame >= this.animFrameCount) {
                if (this.state == 3) this.state = 1;
                else if (this.state == 4) {
                    this.dead = true;
                    this.animFrame = this.animFrameCount-1;
                }
                if (this.state != 4) this.animFrame = 0;
            }

            this.vel.x = lerp(this.vel.x, 0, 0.1);
            if (this.vel.x > -0.1 && this.vel.x < 0.1) this.vel.x = 0;

            if (this.state != 3 && this.state != 4) {
                if (this.vel.x == 0) this.state = 1;
                else this.state = 2;
            }

            if (this.state != 4) this.x += this.vel.x;
        }
    }

    move(key) {
        if (this.state != 4) {

            switch (key) {
                case 'a':
                    this.vel.x = -3;
                    this.facing = -1;

                    break;
                case 'd':
                    this.vel.x = 3;
                    this.facing = 1;

                    break;
            }
        }
    }

    shoot() {
        if (this.state != 3 && this.state != 4) {
            this.animFrame = 0;
            this.state = 3;

            if (this.facing == 1) bullets.push(new Bullet(this.x + this.w / 2, this.y + 10, 10, 10, this.img, createVector(this.facing * 10, 0)));
            else bullets.push(new Bullet(this.x - this.w / 2, this.y + 10, 10, 10, this.img, createVector(this.facing * 10, 0)));
        }
    }

    takeDamage(amount) {
        if (this.state != 4) {

            this.health -= amount;

            if (this.health <= 0) {
                this.state = 4;
                this.animFrame = 0;
                this.w = 120;
                this.h = 100;
                this.y += 20;
                console.log("dead");
            }
        }
    }
}