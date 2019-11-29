export class Likes {
    constructor() {
        this.likes = this.readData();
    }

    addLike(id, title, publisher, img) {
        let like = {
            id,
            title,
            publisher,
            img
        }

        this.likes.push(like);
        this.saveData();
        return like;
    }

    deleteLike(id) {
        let index = this.likes.findIndex(like => like.id === id);
        this.likes.splice(index, 1);
        this.saveData();
    }

    isLiked(id) {
        return this.likes.findIndex(like => like.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    saveData() {
        localStorage.setItem(`likes`, JSON.stringify(this.likes));
    }

    readData() {
        let data = JSON.parse(localStorage.getItem(`likes`));
        return data ? data : [];
    }
}

