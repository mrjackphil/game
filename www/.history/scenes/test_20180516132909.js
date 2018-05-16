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
    }
    update(){
        this.input.on('pointerdown', (e)=>{
            console.log('pointerdown');
            console.log(this);
        })

    }
}



