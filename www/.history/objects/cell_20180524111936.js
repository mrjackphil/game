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
        this.match;
    }
    init(x,y){
        cellHandler.add(this); //add to cellHandler
        this.object = this.game.add.sprite(x,y,'diamond',this.cell_color).setInteractive();//create and remember object
        this.object.on('pointerdown', function (pointer, gameObject){
            this.choose();
            console.log(this.checkMatches());
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
            this.checkMatches()
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

    checkMatches(object, array, iteration){
        let cur = object || this;
        let all = array || [];
        cur.match = true;
        //Check closest matches

        this.checkVertical()
        
        if (iteration !== true){
            for (let c in cellHandler.objects){
                cellHandler.objects[c].match = false;
            }
        }

        if (all.length < 3){all = []}


        if (all.length < 3){all = []}

        return all
    }
    checkVertical(){
        function vert(i){ 
            if(
                (  i.row === cur.row - 1 || 
                   i.row === cur.row + 1)  
                && i.column === cur.column
            ) return true
        }

        let vertical = cellHandler.objects //Check horizontals
                                .filter(i=>i.color === cur.color)//all the same color
                                .filter(i=>vert(i));

        for (let c in vertical){
            if (vertical[c].match !== true)(this.checkMatches(vertical[c], [], true));
        }
    }

    checkHorizontal(){
        function horiz(i){  
            if(
                    ( i.column === cur.column - 1 || 
                    i.column === cur.column + 1)    
                    && i.row === cur.row
            ) return true
        }

        let horizontal = cellHandler.objects //Check horizontals
                        .filter(i=>i.color === cur.color)//all the same color
                        .filter(i=>horiz(i));
        

        for (let c in horizontal){
            if (horizontal[c].match !== true)(this.checkMatches(horizontal[c], [], true));
        }

    }
}