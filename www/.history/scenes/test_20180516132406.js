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
        let board = new Board(this, 5, 5, 80);
    }
}

class Board{
    constructor(game, n_column, n_row, cell_size){
        this.game = game;
        this.column_count = n_column;
        this.row_count = n_row;
        this.cell_size = cell_size;
        this.init();
    }
    init(){
        this.generateBoard();

    }
    generateBoard(){
        console.log(this);
        for (let c=0;c<this.column_count;c++){
            for (let r=0;r<this.row_count;r++){
                new Cell(this.game,1,this.cell_size).init(this.cell_size + (c*64),this.cell_size+ (r*64))
            }
        }
    }
}

