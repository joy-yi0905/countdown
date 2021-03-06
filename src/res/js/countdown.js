function extend(target, source) {
  for (let prop in source) {
    if (source.hasOwnProperty(prop)) {
      if (typeof target[prop] === 'undefined') {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}

function padZero(str, n = 2) {
  str = '' + str;

  while (str.length < n) {
    str = '0' + str;
  }

  return str;
}

function isDateObject(date) {
  return Object.prototype.toString.call(date) === '[object Date]';
}

const defaults = {
  begin: new Date(),
  end: new Date('2030/01/01'),
  timestamp: 0,
  isFormat: false,
  isMilliSecond: false,
  change(res) {
    console.log(res);
  },
  over() {
    console.log('The countdown is over');
  }
};


class Countdown {
  constructor(params = {}) {
    this.params = extend(params, defaults);
  }

  init() {
    const that = this;

    let yyyy = 0;
    let dd = 0;
    let hh = 0;
    let mm = 0;
    let ss = 0;
    let ms = 0;
    let begin = that.params.begin;
    let end = that.params.end;

    let result = {};

    const secondNum = {
      yyyy: 365.25 * 24 * 60 * 60,
      dd: 24 * 60 * 60,
      hh: 60 * 60,
      mm: 60,
      ss: 1
    };

    const interval = that.params.isMilliSecond ? 10 : 1000;
    const variable = that.params.isMilliSecond ? 10 : 1;
    const multiple = that.params.isMilliSecond ? 1 : 1000;

    if (that.params.isMilliSecond) {
      for (let attr in secondNum) {
        secondNum[attr] *= 1000;
      }
    }

    if (!that.elapsed) {
      that.elapsed = 0;
    }

    const getRemain = (remain, type) => {

      switch(type) {
        case 'year':
          remain = remain % secondNum.yyyy;
          break;
        case 'day':
          remain = (remain % secondNum.yyyy) % secondNum.dd;
          break;
        case 'hour':
          remain = ((remain % secondNum.yyyy) % secondNum.dd) % secondNum.hh;
          break;
        case 'minute':
          remain = (((remain % secondNum.yyyy) % secondNum.dd) % secondNum.hh) % secondNum.mm;
          break;
      }

      return remain;
    };

    if (that.remain === 0) return;

    if (!that.remain) {
      if (that.params.timestamp) { // user custom timestamp
        that.remain = that.params.timestamp * (1000/multiple);
      } else {
        begin = isDateObject(begin)
          ? begin.getTime()
          : new Date(begin.replace(/-/g, '/')).getTime();

        end = isDateObject(end)
          ? end.getTime()
          : new Date(end.replace(/-/g, '/')).getTime();

        that.remain = Math.floor((end - begin) / multiple);
      }

      if (isNaN(that.remain)) {
        throw Error('请输入正确的开始时间或结束时间');
      }

      if (that.remain <= 0) {
        throw Error('结束时间不能小于起始时间');
      }
    }

    that.starting = true;

    const calculateTime = () => {

      that.remain -= variable;
      that.elapsed += variable;

      setTime();

      if (that.remain <= (that.params.isMilliSecond ?  10 : 0)) { // The `that.remain` must be greater than `variable`(max value is 10)
        clearInterval(that.timer);

        that.remain = 0;

        if (that.params.isMilliSecond) result.ms = '00';

        that.params.change && that.params.change(result, that.elapsed);
        that.params.over && that.params.over();
      }
    };

    const setTime = () => {
      yyyy = Math.floor(that.remain / secondNum.yyyy);

      dd = Math.floor(getRemain(that.remain, 'year') / secondNum.dd);

      hh = Math.floor(getRemain(that.remain, 'day') / secondNum.hh);

      mm = Math.floor(getRemain(that.remain, 'hour') / secondNum.mm);

      ss = that.params.isMilliSecond
        ? Math.floor(getRemain(that.remain, 'minute') / secondNum.ss)
        : Math.floor(getRemain(that.remain, 'minute') % secondNum.mm);

      ms = that.params.isMilliSecond
        ? (Math.floor(getRemain(that.remain, 'minute') % secondNum.ss) + '').substr(0, 2)
        : '';

      if (that.params.isFormat) {
        yyyy = padZero(yyyy, 4);
        dd = padZero(dd);
        hh = padZero(hh);
        mm = padZero(mm);
        ss = padZero(ss);
      }

      result = {yyyy, dd, hh, mm, ss};

      if (that.params.isMilliSecond) result.ms = ms;

      that.params.change && that.params.change(result, that.elapsed);
    };

    that.timer && clearInterval(that.timer);

    that.timer = setInterval(calculateTime, interval);

    setTime();
  }

  start() {
    if (this.starting) return;

    this.init();
  }

  stop() {
    clearInterval(this.timer);

    this.starting = false;
  }
}

module.exports = Countdown;