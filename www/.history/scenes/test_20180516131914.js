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
        this.generateBoard();

    }
    generateBoard(){
        console.log(this);
        for (let c=0;c<this.n_c;c++){
            for (let r=0;r<this.n_r;r++){
                new Cell(this.game,1,this.c_z).init(this.c_z + (c*64),this.c_z+ (r*64))
            }
        }
    }
}

