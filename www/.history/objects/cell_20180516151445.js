class CellHandler{
    constructor(){
        this.objects=[];
    }
    add(obj){
        if (obj.isArray) this.objects.concat(obj);
        if (typeof obj === 'object') this.objects.push(obj);
    }
    remove(){
    }
}

class Cell{
    constructor(game, size, color){
        this.game = game;
        this.id = cellHandler.objects.length+1;
        this.size = size;
        this.color = color || this.getRandomDiamond();
    }
    init(x,y){
        cellHandler.add(this); //add to cellHandler
        this.object = this.game.add.sprite(x,y,'diamond',this.color).setInteractive();//create and remember object

        this.object.on('pointerdown', function (pointer, gameObject){
            this.choose();
        },this);
    };
    changeColor(_color){
        let color = _color || this.getRandomDiamond();
        this.object.setFrame(color);
    }
    destroy(){
        this.object.destroy();
    }
    choose(){
        console.log(this.object)
        this.game.tweens.add({
            targets: this.object,
            x: 67,
            y: 67,
            yoyo: true,
            duration: 100,
            ease: 'Power2',
            loop: true,
            repeat: 1
        });
    }
    getRandomDiamond(){
        let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
        return diamonds[Math.floor(Math.random() * diamonds.length)];
    }
}