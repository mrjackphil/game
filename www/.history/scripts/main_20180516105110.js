let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);
function preload ()
{
    this.load.atlas('diamond', 'sprites/diamond.png', 'sprites/diamond.json');
}

function create ()
{
 let daemon = new Cell(1, 64).init(400,400);
}

class Cell{
    constructor(_id, _size){
        this.id = _id;
        this.size = _size;
        this.color = getRandomDiamond();
    }
    init(x,y){
        game.add.sprite(x,y,'diamond',this.color);
    };
}

function getRandomDiamond(){
    let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
    return diamonds[Math.floor(Math.random() * diamonds.length)];
}