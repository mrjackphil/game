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
    let cell = this.add.sprite(s,0, 'diamond', 'red');
    console.log(cell);
}
