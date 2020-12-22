class DataHandler {
    static imgs = {};
    static imgData = {};
    static imgURLs = [
        "../Assets/player.png",
        "../Assets/playeridle.png",
        "../Assets/zombie1.png",
        "../Assets/background.png"
    ];
    static dataURLs = [
        "../Assets/player.json",
        "../Assets/playeridle.json",
        "../Assets/zombie1.json",
    ];

    static loadImgs() {
        let imgs = {};

        for (let i = 0; i < this.imgURLs.length; i++) {
            loadImage(this.imgURLs[i], (img) => {
                let name = this.imgURLs[i].match(/s\/([a-z]|[A-Z]|[0-9])*/);
                imgs[name[0].substring(2, name[0].length)] = img;
            });
        }

        console.log(imgs);
        this.imgs = imgs;
    }

    static async loadImgData() {
        let data = {};

        for (let i = 0; i < this.dataURLs.length; i++) {
            let d = await (await fetch(this.dataURLs[i])).json();

            let name = this.dataURLs[i].match(/s\/([a-z]|[A-Z]|[0-9])*/);
            data[name[0].substring(2, name[0].length)] = d;
        }

        console.log(data);
        this.imgData = data;
    }

    static isLoaded() {
        if (Object.keys(this.imgs).length == this.imgURLs.length && Object.keys(this.imgData).length == this.dataURLs.length) return true;
        return false;
    }
}