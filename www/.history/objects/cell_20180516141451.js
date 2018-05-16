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
        this.id = id;
        this.size = size;
        this.color = this.getRandomDiamond();
    }
    init(x,y){
        cellHandler.add(this);
        let cell = this.game.add.sprite(x,y,'diamond',this.color).setInteractive();
        cell.on('pointerdown', function (pointer, gameObject){
        });
    };
    listener(){
        console.log('pressed');
    }
    changeColor(){
        this.color = getRandomDiamond();
    }
    getRandomDiamond(){
        let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
        return diamonds[Math.floor(Math.random() * diamonds.length)];
    }
}