let cellHandler;
class Test extends Phaser.Scene{
    constructor(){
        super({key:'Test'});
    }
    init(){
        cellHandler = new CellHandler;
    }
    preload ()
    {
        this.load.atlas('diamond', 'sprites/diamond.png', 'sprites/diamond.json');
    }

    create ()
    {
        let board = new Board(this, 5, 5, 64);
        let cell = this.game.add.sprite(x,y,'diamond',this.color);
        
        this.input.on('pointerdown', function (pointer, gameObject){
            console.log(pointer);
            console.log(gameObject);
        }, this);
    }
    update(){
    }
}



