class CellHandler{ //save all cells in array
    constructor(){
        this.objects=[];
    }
    add(obj){
        if (obj.isArray) this.objects.concat(obj);
        if (typeof obj === 'object') this.objects.push(obj);
    }
    remove(){
    }
}

class Cell{
    constructor(game, size, color){
        this.game = game;
        this.id = cellHandler.objects.length+1;
        this.size = size;
        this.cell_color = color || this.randomDiamond;
        this.object;
        this.column;
        this.row;
    }
    init(x,y){
        cellHandler.add(this); //add to cellHandler
        this.object = this.game.add.sprite(x,y,'diamond',this.cell_color).setInteractive();//create and remember object
        this.object.on('pointerdown', function (pointer, gameObject){
            this.choose();
        },this);
    };

    //Getters and setters for cell
    get color(){
        return this.cell_color;
    }
    set color(_color){
        this.cell_color = _color || this.randomDiamond;
        this.object.setFrame(this.color);
    }
    get randomDiamond(){
        let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
        return diamonds[Math.floor(Math.random() * diamonds.length)];
    }

    //Methods for cells
    destroy(){
        this.object.destroy();
    }
    choose(){ // when choose cell
        if (this.tween === undefined){ //if not animated
            this.unchoose();
            this.animateScale();
            this.checkMatches();
        }else{
            this.unchoose();
        }
    }
    unchoose(){ 
        //Stop all tweens
        let tweenCells = cellHandler.objects.filter(i=>i.tween);
        for (let i in tweenCells) {
            const cTw = tweenCells[i];
            cTw.tween.stop();
            cTw.object.scaleX = 1;
            cTw.object.scaleY = 1;
            delete cTw.tween;
        }
    }
    animateScale(){ //Animate new cell
        for (let i in cellHandler.objects) cellHandler.objects[i].object.setDepth(0);
        this.object.setDepth(1);
        this.tween = this.game.tweens.add({
            targets: [this.object],
            scaleX: 1.5,
            scaleY: 1.5,
            yoyo: true,
            duration: 1000,
            ease: 'Power2',
            loop: -1
        });
    }
    checkMatches(){
        //Check horisontals
        this.object; //current
        cellHandler.objects
                        .filter(i=>i.color === this.color)//all the same color
                        .filter(i=>(i.column === this.column - 1 || 
                                    i.column === this.column + 1)&& i.row == this.row)
    }
}