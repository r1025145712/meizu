function Ac(_target) {
    // this.time = 600;//总时长
    this.rate = 30;//每30ms定时器执行一次

    this.calculate = function (_css, _time) {
        //计算步长
        this.times = _time / this.rate;//总长度
        if (_css.left) {
            this.step = (Number(_css.left.match(/-?\d+/g)[0]) - _target.offsetLeft) / this.times;
        }
        if (_css.top) {
            this.hstep = (Number(_css.top.match(/-?\d+/g)[0]) - _target.offsetTop) / this.times;
        }
    }
    this.run = function (_css, _time, _fx) {
        var me = this, _count = 1;
        this.calculate(_css, _time);
        this.timer = setInterval(function () {
            _target.style.left = _target.offsetLeft + me.step + "px";
            _target.style.top = _target.offsetTop + me.hstep + "px";

            if (_count++ >= me.times) {
                if (_css.left) {//实际应用过程中才发现有位置不精确的bug，所以采取强制的措施
                    _target.style.left = _css.left;//强制的将结果精确到给定的位置
                }
                if (_css.top) {
                    _target.style.top = _css.top;
                }
                window.clearInterval(me.timer);
                if (typeof _fx == "function") {
                    _fx();
                }
            }
        }, this.rate);
    };
    this.delay = function (_sj, _fx) {
        me = this;
        this.yc = window.setTimeout(function () {
            window.clearTimeout(this.yc);
            if (typeof _fx == "function") {
                _fx();
            }
        }, _sj)
    };  
}