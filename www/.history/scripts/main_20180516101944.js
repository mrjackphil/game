var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);
let cell;
function preload ()
{
    this.load.atlas('diamond', 'sprites/diamond.png', 'sprites/diamond.json');
}

function create ()
{
    cell = this.add.sprite(0,0, 'diamond', 'red');
    cell.frame.width = 64;
    cell.frame.height = 64;
    cell.x = 400;
    cell.y = 400;
}
