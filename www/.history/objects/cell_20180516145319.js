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
    constructor(game, id, size){
        this.game = game;
        this.id = cellHandler.length+1;
        this.size = size;
        this.color = this.getRandomDiamond();
    }
    init(x,y){
        cellHandler.add(this);
        this.object = this.game.add.sprite(x,y,'diamond',this.color).setInteractive();

        this.object.on('pointerdown', function (pointer, gameObject){
            this.changeColor();
        },this);
    };
    changeColor(){
        let color = this.getRandomDiamond()
        this.color = color;
        console.log(this.object);
    }
    getRandomDiamond(){
        let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
        return diamonds[Math.floor(Math.random() * diamonds.length)];
    }
}