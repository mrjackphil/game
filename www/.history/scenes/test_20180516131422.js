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
        let board = new Board(this);
    }
}

class Board{
    constructor(game){
        this.game = game;
        this.init();
    }
    init(){
        let n_column = 5;
        let n_row = 5;
        let cell_size = 64;

        for (let c=0;c<n_column;c++){
            for (let r=0;r<n_row;r++){
                new Cell(this.game,1,cell_size).init(cell_size + (c*64),cell_size+ (r*64))
            }
        }
    }
}

