class Input{
    constructor(game){
        this.game = game;
    }
    onCellClick(clickedObject){
        let chosens = board.handler.objects.filter(i=>i.chosen===true);
        if (chosens.length){
            Cell.switchCells(clickedObject, chosens[0]);
            clickedObject.destroyAndFall();
        }else{
            clickedObject.choose();
        }
    }
    onRelease(hoveredObject){
        let chosens = board.handler.objects.filter(i=>i.chosen===true);
        if (chosens.length){
            Cell.switchCells(hoveredObject, chosens[0]);
            hoveredObject.destroyAndFall();
        }

    }
}