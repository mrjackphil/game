class CellHandler{ //save all cells in array
    constructor(){
        this.objects=[];
    }
    add(obj){
        if (obj.isArray) this.objects = this.objects.concat(obj);
        if (typeof obj === 'object') this.objects.push(obj);
    }
    remove(){
    }
}

class Cell{
    constructor(game, size, color){

        let _cell_color = color || Cell.randomDiamond();

        this.game = game;
        this.id = cellHandler.objects.length ? cellHandler.objects[cellHandler.objects.length-1].id + 1 : 0;
        this.size = size;
        this.object;
        this.column;
        this.row;
        this.match;
        this.chosen;

        Object.defineProperty(this, 'color', {
            get: function(){
                return _cell_color;
            },
            set: function(_color){
                _cell_color = _color || Cell.randomDiamond();
                this.object.setFrame(_cell_color);
            }
        })
        
    }
    init(x,y){
        cellHandler.add(this); //add to cellHandler
        this.object = this.game.add.sprite(x,y,'diamond',this.color).setInteractive();//create and remember object
        this.object.on('pointerdown', function (pointer, gameObject){
            let chosens = cellHandler.objects.filter(i=>i.chosen===true);
            if (chosens.length){
                Cell.switchCells(this, chosens[0]);
                let all = cellHandler.objects;
                for (let a in all){all[a].object.alpha = 1;}
                this.destroyMatched(all);
                this.unchooseAll();
            }else{
            this.choose();
            }
        },this);
    };

    //Getters and setters for cell
    static randomDiamond(){
        let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
        return diamonds[Math.floor(Math.random() * diamonds.length)];
    }

    //Methods for cells
    destroy(){
        this.object.destroy();
    }
    choose(){ // when choose cell
        if (this.tween === undefined){ //if not animated
            this.unchooseAll();
            this.animateScale();
            this.chosen = true;
        }else{
            this.unchooseAll();
            this.chosen = false;
        }
    }
    unchooseAll(){ 
        //Stop all tweens
        let tweenCells = cellHandler.objects.filter(i=>i.tween);
        for (let i in tweenCells) {
            const cTw = tweenCells[i];
            cTw.tween.stop();
            cTw.object.scaleX = 1;
            cTw.object.scaleY = 1;
            delete cTw.tween;
        }
        let chosens = cellHandler.objects.filter(i=>i.chosen===true);
        for (let c in chosens){
            chosens[c].chosen = false
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

        let v = this.checkVertical(cur);
        let h = this.checkHorizontal(cur);

        if (v.length < 3){v = []};
        if (h.length < 3){h = []};

        all = all.concat(v);
        all = all.concat(h);
        

        return all;
    }

    checkVertical(object, array, iteration){
        let cur = object || this;
        cur.match = true;

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
            if (vertical[c].match !== true)(this.checkVertical(vertical[c], [], true));
        }

        let all = cellHandler.objects.filter(i=>i.match === true);

        if (iteration !== true){
            for (let c in cellHandler.objects){
                cellHandler.objects[c].match = false;
            }
        }

        return all; 
    }

    checkHorizontal(object, array, iteration){
        let cur = object || this;
        cur.match = true;

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
            if (horizontal[c].match !== true)(this.checkHorizontal(horizontal[c], [], true));
        }

        let all = cellHandler.objects.filter(i=>i.match === true);

        if (iteration !== true){
            for (let c in cellHandler.objects){
                cellHandler.objects[c].match = false;
            }
        }

        return all; 
    }
    static switchCells(first, second){
        let x = first.object;
        let y = second.object;

        [x.x, y.x] = [y.x, x.x];
        [x.y, y.y] = [y.y, x.y];
        console.log(x);
        [x.column, y.column] = [y.column, x.column];
        console.log(x);
        [x.row, y.row] = [y.row, x.row];
        let ar1 = cellHandler.objects.indexOf(first);
        let ar2 = cellHandler.objects.indexOf(second);

        cellHandler.objects[ar1] = second;
        cellHandler.objects[ar2] = first;

    }

    destroyMatched(array){
        for (let a in array){
            let matches = this.checkMatches(array[a]);
            for (let m in matches){
                matches[m].object.alpha = 0.5;
            }
        }
    }
}