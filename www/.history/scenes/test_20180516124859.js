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
        let board = new Board();
        let daemon = new Cell(this, 1, 64).init(400,400);
    }
}

class Board{
    constructor(){
        this.init();
    }
    init(){
        let n_column = 5;
        let n_row = 5;

        for (let column in n_column){

        }
    }
}

