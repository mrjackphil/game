class CellHandler {
    constructor() {
        this.objects = [];
    }
    add(obj) {
        if (obj.isArray)
            this.objects = this.objects.concat(obj);
        if (typeof obj === 'object')
            this.objects.push(obj);
    }
    remove(obj) {
        if (obj.isArray) console.log('not done');
            //ToDO
        if (typeof obj === 'object'){
            this.objects.splice(this.objects.indexOf(obj), 1);
        }
    }
}