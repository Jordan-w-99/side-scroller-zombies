class GameObject {
    constructor(x, y, w, h, img, vel = createVector(0, 0)) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.vel = vel;
    }

    collides(obj){
        if(this.x + this.w/2 > obj.x - obj.w/2 && this.x - this.w/2 < obj.x + obj.w/2){
            if(this.y + this.h/2 > obj.y - obj.h/2 && this.y - this.h/2 < obj.y + obj.h/2){
                return true;
            }
        }
        return false;
    }
}