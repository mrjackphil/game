let board;
let input;
let currentdate = new Date(); 
class Test extends Phaser.Scene{
    constructor(){
        super({key:'Test'});
    }
    init(){
        localStorage.score = Number(0);
    }
    preload ()
    {
        this.load.atlas('diamond', 'sprites/diamond.png', 'sprites/diamond.json');
    }

    create ()
    {
        this.input.on('pointerup', (pointer,gameObjects)=>{
            if (!gameObjects.length)Cell.unchooseAll();
        })
        input = new Input(this);
        board = new Board(this, 5, 5, 64);
        board.generateBoard();
    }
    update(){
        localStorage.date = String(currentdate.getMonth()) + String(currentdate.getDate()) + String(currentdate.getHours());
    }
}



