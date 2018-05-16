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
    let diamond = this.add.sprite(game.canvas.width/2,game.canvas.height/2, 'diamond', getRandomDiamond());
    conosole.log(diamond);
}

class Cell{
    constructor(_id, _size){
        this.id = _id;
        this.size = _size;
    }
    init(){
    };
}

function getRandomDiamond(){
    let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
    return diamonds[Math.floor(Math.random() * diamonds.length)];
}