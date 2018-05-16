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
        // let daemon = new Cell(this, 1, 64).init(400,400);
        let board = new Board(this,daemon);
    }
}

class Board{
    constructor(game,cf){
        this.init();
        this.cellfunction = cf;
    }
    init(){
        let n_column = [1,2,3];
        let n_row = 5;

        for (let c = 0;c < n_column.length; c++){
            new Cell(game,1,64).init(64,64 + (c*64))
        }
    }
}

