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
        let daemon = new Cell(1, 64).init(400,400);
    }

}

class Cell{
    constructor(_id, _size){
        this.id = _id;
        this.size = _size;
        this.color = getRandomDiamond();
    }
    init(x,y){
        // Phaser.GameObjects.GameObjectCreator.call(this, game);
        // this.add.sprite(x,y,'diamond',this.color);
    };
}

function getRandomDiamond(){
    let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
    return diamonds[Math.floor(Math.random() * diamonds.length)];
}