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
        for (let c=0;c<this.column_count;c++){
            for (let r=0;r<this.row_count;r++){
                new Cell(this.game,this.cell_size).init(this.cell_size + (c*this.cell_size),this.cell_size+ (r*this.cell_size))
            }
        }
    }
}