import uniqid from 'uniqid';

export class ShopList {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        let item = {
            id: uniqid(),
            count,
            unit,
            ingredient,
        }

        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        let index = this.items.findIndex(item => item.id === id );
        this.items.splice(index, 1);
    }

    updateNewCount(id, newCount) {
        this.items.find(item => item.id === id).count = newCount;
    }
}