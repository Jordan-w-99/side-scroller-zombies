class Background extends GameObject {
    constructor(x, y, w, h, img) {
        super(x, y, w, h, img);
        console.log(this.img);
    }

    draw() {
        if(this.img){
            push();
            
            translate(this.x, this.y);
            imageMode(CENTER);
            image(this.img, 0, 0, this.w, this.h);
            
            pop();
        }
    }
d}