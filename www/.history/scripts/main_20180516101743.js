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

function preload ()
{
    this.load.atlas('diamond', 'sprites/diamond.png', 'sprites/diamond.json');
}

function create ()
{
    let cell = this.add.sprite(0,0, 'diamond', 'red');
    cell.width = 64;
    cell.height = 64;
    cell.x = game.width/2;
    cell.y = game.height/2;
}
