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
    constructor(game, n_column, n_row, cell_size){
        this.game = game;
        this.n_c = n_column;
        this.n_r = n_row;
        this.c_z = cell_size;
        this.init();
    }
    init(){
        this.generateBoard(this.game, this.n_c, this.n_r, this.c_z);

    }
    generateBoard(game, n_column, n_row, cell_size){
        for (let c=0;c<n_column;c++){
            for (let r=0;r<n_row;r++){
                new Cell(this.game,1,cell_size).init(cell_size + (c*64),cell_size+ (r*64))
            }
        }
    }
}

