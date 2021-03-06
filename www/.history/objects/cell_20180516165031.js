class CellHandler{
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
        this.cell_color = color || this.getRandomDiamond();
        this.object;
    }
    init(x,y){
        cellHandler.add(this); //add to cellHandler
        this.object = this.game.add.sprite(x,y,'diamond',this.cell_color).setInteractive();//create and remember object

        this.object.on('pointerdown', function (pointer, gameObject){
            this.choose();
            console.log(this.color);
        },this);
    };
    get color(){
        // return this.object.setFrame(color);
        return (this.cell);
    }
    // set color(_color){
    //     // let color = _color || this.getRandomDiamond();
    //     // this.object.setFrame(color);
    // }
    destroy(){
        this.object.destroy();
    }
    choose(){
        if (this.tween === undefined){ //if not animated
            this.unchoose();
            this.animateScale();
        }else{
            this.unchoose();
        }
    }
    getRandomDiamond(){
        let diamonds = ['blue', 'green', 'malachite', 'orange', 'purple', 'red'];
        return diamonds[Math.floor(Math.random() * diamonds.length)];
    }
    unchoose(){
        //Stop all tweens
        let tweenCells = cellHandler.objects.filter(i=>i.tween);
        for (let i in tweenCells) {
            tweenCells[i].tween.stop();
            tweenCells[i].object.scaleX = 1;
            tweenCells[i].object.scaleY = 1;
            delete tweenCells[i].tween;
        }

    }
    animateScale(){
        //Animate new cell
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
}