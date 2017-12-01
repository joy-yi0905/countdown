# countdown

countdown 一个轻量级倒计时插件，不依赖任何框架。

countdown演示：**[demo](http://joy-yi0905.github.io/countdown/demo/demo.html)**

### 如何使用

- 首先，引入 `countdown.min.js`（这些文件包含在demo目录）

```html
<script src="countdown.min.js"></script>
```

- 然后，在页面里实例化它：

```js
var c1 = new Countdown({
  change: function(res) {
    console.log(res);
  }
});
```

- 最后，通过 `start` 方法启动定时器：

```js
c1.start();
```

当需要暂停定时器时，可通过 `stop` 方法：

```js
c1.stop();
```

### 参数

当用户需要自定义倒计时，可以给实例化的 Countdown 方法传递相关参数。这些参数包括一些内容：

| **参数** | **描述** | **默认值** | **格式** |
|----------|----------|------------|----------|
| begin | 开始时间 | new Date()，即当前时间 | String 或 Date object |
| end | 结束时间 | '2030/01/01' | String  |
| timestamp | 时间戳，常用于设置倒计时的时间，单位为**秒**。当设置此项时，begin 和 end 会被忽略 | 0 | String 或 Number |
| isFormat | 是否格式化输出的时间格式，比如 年-yyyy, 天-dd | false，即不格式 | Boolean |
| isMilliSecond | 是否输出毫秒 | false，即不输出 | Boolean |
| change | 时间每次更新后的回调函数。它包含一个参数，该参数是一个包含了年、天、时、分、秒、毫秒这些属性的对象 | `function(res) {console.log(res);}` | Function |
| over | 倒计时结束后的回调函数。 | `function() {console.log('The countdown is over');}` | Function  |

### 方法

countdown 提供了两个实例方法：

| **参数** | **描述** | **默认值** | **格式** |
|----------|----------|------------|----------|
| start | 启动倒计时 |  | Function |
| stop | 暂停倒计时 |  | Function  |

