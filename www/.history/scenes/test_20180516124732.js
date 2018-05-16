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
        init();
    }
    init(){
        let array = [5][5];
        console.log(array);
    }
}

