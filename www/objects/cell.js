class Cell{
    constructor(game, size, color){

        let _cell_color = color || Cell.randomDiamond();

        this.game = game;
        this.id = board.handler.objects.length ? nextId() : 0

        function nextId (){
            let max = 0;
            for (let c in board.handler.objects){
                let c_id = board.handler.objects[c].id;
                if (c_id > max) max = c_id
            }
            return max + 1
        }

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
        board.handler.add(this); //add to cellHandler
        this.object = this.game.add.sprite(x,y,'diamond',this.color).setInteractive();//create and remember object
        this.object.on('pointerdown', function (pointer, gameObject){
            input.onCellClick(this);
        },this);
        this.object.on('pointerup', function (pointer){
            input.onRelease(this);
        },this);
    };

    destroyAndFall(){
        let all = board.handler.objects;
        if (!this.destroyMatched(all)) return false
        while (board.handler.objects.length < 25){
            this.falling(all);
            this.createNew();
        }
    }

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
            Cell.unchooseAll();
            this.animateScale();
            this.chosen = true;
        }else{
            Cell.unchooseAll();
            this.chosen = false;
        }
    }
    static unchooseAll(){ 
        //Stop all tweens
        let tweenCells = board.handler.objects.filter(i=>i.tween);
        for (let i in tweenCells) {
            const cTw = tweenCells[i];
            cTw.tween.stop();
            cTw.object.scaleX = 1;
            cTw.object.scaleY = 1;
            delete cTw.tween;
        }
        let chosens = board.handler.objects.filter(i=>i.chosen===true);
        for (let c in chosens){
            chosens[c].chosen = false
        }
    }
    animateScale(){ //Animate new cell
        for (let i in board.handler.objects) {
            board.handler.objects[i].object.setDepth(0);
        }
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

        let vertical = board.handler.objects //Check horizontals
                                .filter(i=>i.color === cur.color)//all the same color
                                .filter(i=>vert(i));

        for (let c in vertical){
            if (vertical[c].match !== true)(this.checkVertical(vertical[c], [], true));
        }

        let all = board.handler.objects.filter(i=>i.match === true);

        if (iteration !== true){
            for (let c in board.handler.objects){
                board.handler.objects[c].match = false;
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

        let horizontal = board.handler.objects //Check horizontals
                        .filter(i=>i.color === cur.color)//all the same color
                        .filter(i=>horiz(i));
        

        for (let c in horizontal){
            if (horizontal[c].match !== true)(this.checkHorizontal(horizontal[c], [], true));
        }

        let all = board.handler.objects.filter(i=>i.match === true);

        if (iteration !== true){
            for (let c in board.handler.objects){
                board.handler.objects[c].match = false;
            }
        }

        return all; 
    }
    static switchCells(first, second){
        let complete = false;
        let x = first.object;
        let y = second.object;

        if (first.column + 1 === second.column && first.row === second.row ||
            first.column - 1 === second.column && first.row === second.row ||
            first.row + 1 === second.row && first.column === second.column ||
            first.row - 1 === second.row && first.column === second.column ) {
            }
            else{
                return
            }

        x.tween = first.game.tweens.add({
            targets: x,
            x: y.x,
            y: y.y,
            duration: 500,
            ease: 'Power2',
            onComplete: () =>{
                if (complete){
                    x.tween = first.game.tweens.add({
                        targets: x,
                        x: y.x,
                        y: y.y,
                        duration: 500,
                        ease: 'Power2',
                    })
                }
            }
        });
        y.tween = second.game.tweens.add({
            targets: y,
            x: x.x,
            y: x.y,
            duration: 500,
            ease: 'Power2',
            onComplete: () =>{
                if (complete){
                    y.tween = second.game.tweens.add({
                        targets: y,
                        x: x.x,
                        y: x.y,
                        duration: 500,
                        ease: 'Power2',
                    })
                }
            }
        });

        if (!   complete){
            [first.column, second.column] = [second.column, first.column];
            [first.row, second.row] = [second.row, first.row];
            let ar1 = board.handler.objects.indexOf(first);
            let ar2 = board.handler.objects.indexOf(second);

            board.handler.objects[ar1] = second;
            board.handler.objects[ar2] = first;
        }
    }

    destroyMatched(array){
        let is = false;
        let matches = [];
        for (let a in array){
            let m = this.checkMatches(array[a]);
            matches = matches.concat(
                m.filter(x=>matches.indexOf(x) === -1)
            )};
        for (let m in matches){
            board.handler.remove(matches[m]);
            matches[m].object.destroy();
            delete matches[m];
            localStorage.score = Number(localStorage.score) + Number(1);
            is = true;
        }
        Cell.unchooseAll();
        return is
    }

    falling(array){
        for (let c in array){
            let cell = array[c];
            let condition = board.handler.objects.find(i=>i.column === cell.column && i.row === cell.row + 1)
            if (typeof condition === 'undefined' && cell.row !== board.row_count - 1){
                this.moveTo(cell, cell.column, cell.row + 1);
            }
        }
    }
    moveTo(cell, column, row){
        let i = board.handler.objects.indexOf(cell);
        cell.fall = this.game.tweens.add({
            targets: cell.object,
            x: board.cell_size + column * board.cell_size,
            y: board.cell_size + row * board.cell_size,
            duration: 500,
            ease: 'Power2',
            onComplete: () =>{
                delete cell.fall;
                this.destroyAndFall(); 
            }
        });
        cell.column = column;
        cell.row = row;
        board.handler.objects[i] = cell;
    }
    createNew(){ //Create new cell on empty place (by checking handler array)
        for (let r=0; r< board.column_count; r++){
            if (typeof board.handler.objects.find(i=>i.column === r && i.row === 0) === 'undefined'){
                let cll = new Cell(this.game,board.cell_size);
                cll.init(board.cell_size + (r*board.cell_size),board.cell_size)
                cll.column = r;
                cll.row = 0;
            }

        }
    }
}