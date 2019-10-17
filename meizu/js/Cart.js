class Storage {
    constructor() {
        // this.storage=document.cookie;
    }
    take() {
        let _reg = /\bBK1918CART=\[(\{("\w+":"?[\w%\.]+"?,?)+},?)+]/g;
        this.storage = document.cookie;
        if (_reg.test(this.storage)) {
            this.storage = this.storage.match(_reg)[0].replace(/\bBK1918CART=/, "");
            this.storage = JSON.parse(this.storage);
        } else {
            this.storage = [];
        }
    }
    save() {
        document.cookie = "BK1918CART=" + JSON.stringify(this.storage) + ";path=/;expires=" + new Date(new Date().getTime() + 7 * 24 * 3600000);
    }
}
class Cart extends Storage {
    push(_id, _counter, _options) {
        let _has = 0;
        this.take();
        if (/^\d+$/g.test(_counter + '')) {
            for (let i = 0; i < this.storage.length; i++) {
                if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_options)) {
                    this.storage[i].counter += _counter;
                    _has = 1;
                    break;
                }
            }
            if (_has === 0) {
                this.storage.push({
                    id: _id,
                    counter: _counter,
                    comment: encodeURIComponent(_options)
                });
            }
            this.save();
        }
    }
    remove(_id, _options) {
        this.take();
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_options)) {
                this.storage.splice(i, 1);
                this.save();
                break;
            }
        }
    }
    statistics() {
        let _summary = 0;
        this.take();
        for (let i = 0; i < this.storage.length; i++) {
            _summary += this.storage[i].counter;
        }
        return _summary;
    }
    one(_id, _counter, _options) {
        this.take();
        if (/^\d+$/g.test(_counter + "")) {
            for (let i = 0; i < this.storage.length; i++) {
                if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_options)) {
                    this.storage[i].counter = Number(_counter);
                    this.save();
                    break;
                }
            }
        }
    }
    subtract(_id, _counter, _options) {
        this.take();
        if (/^\d+$/g.test(_counter + "")) {
            for (let i = 0; i < this.storage.length; i++) {
                if (this.storage[i].id === _id && this.storage[i].comment === encodeURIComponent(_options)) {
                    if(this.storage[i].counter==1){
                        this.storage[i].counter=1;
                    }
                    if (this.storage[i].counter > _counter) {
                        this.storage[i].counter -= _counter;
                    } 
                    // else {
                    //     this.storage.splice(i, 1);
                    // }
                    this.save();
                    break;
                }
            }
        }
    }
    clear() {
        this.take();
        this.storage = [];
        this.save();
    }
}
class TJCart extends Cart {
    statistics() {
        let _summary = 0;
        this.take();
        for (let i = 0; i < this.storage.length; i++) {
            _summary += this.storage[i].counter;
        }
        return _summary;
    }
}










// let _cart=new Cart();
// _cart.push(89,1,"黑色|500ML|304不锈钢|保温杯");

// [{"id":88,"counter":3,"comment":"%E9%BB%91%E8%89%B2%7C500ML%7C304%E4%B8%8D%E9%94%88%E9%92%A2%7C%E4%BF%9D%E6%B8%A9%E6%9D%AF"},{"id":89,"counter":1,"comment":"%E9%BB%91%E8%89%B2%7C500ML%7C304%E4%B8%8D%E9%94%88%E9%92%A2%7C%E4%BF%9D%E6%B8%A9%E6%9D%AF"}]


// var _storage=[{
//     id:1,
//     counter:1,
//     comment:encodeURIComponent("红色|M|...|xxx.jpg")//图片一定放到最结尾
// },{
//     id:2,
//     counter:2,
//     comment:encodeURIComponent("黄色|M|...|xxx.jpg")
// }];

// document.cookie="BK1918CART="+JSON.stringify(_storage)+";path=/;expires="+new Date(new Date().getTime()+7*24*3600000);