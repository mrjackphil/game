class Test extends Phaser.Scene{
    constructor(){
        super({key:'Test'});
    }
    init(){
        console.log('test');
    }
    preload ()
    {
        this.load.atlas('diamond', 'sprites/diamond.png', 'sprites/diamond.json');
    }

    create ()
    {
        const CellHandler = new CellHandler;
        let daemon = new Cell(this, 1, 64).init(400,400);
    }

}

class CellHandler{
    constructor(){
        this.objects=[];
    }
    add(obj){

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