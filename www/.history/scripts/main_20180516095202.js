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
    this.load.atlas('diamond', 'sprites/diamon.png', 'assets/diamon.json');
}

function create ()
{
    let cell = this.add.sprite(0,0, 'diamond', red.png);
    console.log(cell);
}
