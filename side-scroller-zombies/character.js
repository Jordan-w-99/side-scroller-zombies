class Character extends GameObject{
    constructor(x, y, w, h, img, animFrameCount = 0, facing = 1){
        super(x, y, w, h, img);
        this.facing = facing;
        this.state = 1;
        this.animFrame = 1;
        this.animFrameCount = animFrameCount;
        this.dead = false;
    }
}