class Zombie extends Character {
    constructor(x, y, w, h, img, animFrameCount, facing) {
        super(x, y, w, h, img, animFrameCount, facing);
        this.states = ["Walk", "Attack", "Dead"];
    }

    update(playerX) {
        if(this.dead == false){
            this.animFrame += 1 * (deltaTime / 60);
        }
        if (this.animFrame >= this.animFrameCount) {
            if(this.state == 1){
                this.animFrame = 0;
            }
            else if(this.state == 2){
                this.state = 1;
            }
            else{
                this.dead = true;
                this.animFrame = this.animFrameCount - 1;
            }
        }

        if(this.state == 1){
            if(playerX != null){
                if(this.facing == 1) {
                    if(playerX < this.x) this.facing = -1;
                }
                else if(playerX > this.x) this.facing = 1;
            }

            this.x += this.facing*2;
        }
    }

    getCurFrame() {
        // console.log(`${this.states[this.state - 1]} (${floor(this.animFrame)}).png`);
        return this.img.data.frames[`${this.states[this.state - 1]} (${floor(this.animFrame)}).png`];
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

    die(){
        this.state = 3;
        this.animFrame = 1;
        this.animFrameCount = 12;
        this.w = 100;
        this.h = 100;
    }

    hit(){
        this.state = 2;
        this.animFrame = 1;
        this.animFrameCount = 8;

        return random(20,50);
    }
}