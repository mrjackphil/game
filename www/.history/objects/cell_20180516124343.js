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
    constructor(_game, _id, _size){
        this.game = _game;
        this.id = _id;
        this.size = _size;
        this.color = getRandomDiamond();
    }
    init(x,y){
        cellHandler.add(this);
        this.game.add.sprite(x,y,'diamond',this.color);
    };
    changeColor(){
        this.color = getRandomDiamond();
    }
}

function getRandomDiamond(){
    let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
    return diamonds[Math.floor(Math.random() * diamonds.length)];
}