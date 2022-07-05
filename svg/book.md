## 矢量图VS位图
+ SVG是矢量图，如jpg/png等是位图
+ 位图在放大时失真体积大，矢量图不会失真且体积小
+ 位图是一个个很小的颜色方块组成的每个小方块为1px,矢量图是XML定义的，通过各种路径和填充颜色来描述渲染图片
+ 位图色彩比较丰富逼真，矢量图不适合制作颜色丰富的图像
## SVG矢量图
1. 默认宽度和高度：300px 150px
2. 和canvas不一样的是，可以通过css修改宽高
3. 常用属性：
   1. fill:
   2. fill-opactiy：0~1
   3. stroke:
   4. stroke-width
   5. stroke-opactiy:0~1
   6. stroke-linecap:
   7. stroke-dasharray:设置虚线
   8. stroke-dashoffset:
   9. stroke-linejoin:miter(默认)/bevel/round
## 使用方式
1. 内嵌到html
```html
<svg></svg>
```
2. 通过浏览器直接打开
```html
<svg xmlns="http://www.w3.org/2000/svg"></svg>
```
  > 注意：需要添加<strong>xmlns="http://www.w3.org/2000/svg"</strong>

3. 通过<strong>img</strong>标签引入
```html 
<img src="./color.svg">
```

4. 作为css背景使用
```css
div{
  background:url('./color.svg')
}
```

## 绘制矩形svg
+ 矩形标签`<rect>`
+ 属性值：
  + x/y:矩形起始位置
  + width/height:绘制矩形的宽高
  + fill:矩形的填充颜色
  + stroke:矩形边框颜色
  + stroke-width:矩形边框宽度
  + rx/ry:设置圆角半径
```html 
<svg>
  <rect x="100" y="100" width="100" height="100" stroke="blue" fill="red" stroke-width="4" rx="10" ry = "10"></rect>
</svg>
```

## 绘制圆和椭圆
1. 圆形`<circle>`
2. 属性：
   1. cy/cx:圆心位置
   2. r:圆的半径
```html 
<rect x="100" y="100" width="100" height="200" rx="50" ry="50"  fill="red"></rect>
<circle cx="100" cy="100" r="50"></circle>
```
3. 椭圆`<ellipse>`
4. 属性：
   1. cy/cx：圆心位置
   2. rx/ry: 水平/垂直方向的半径
```html
<rect x="100" y="200" width="100" height="200" rx="50" ry="100" fill="red"></rect>
<ellipse cx="150" cy="300" rx="50" ry="100" fill="red"></ellipse>
```

## 绘制直线和折线
1. 标签`<line>`绘制直线
   1. x1/y1:起点位置
   2. x2/y2:终点位置
2. 标签`<polyline>`绘制折线
   1. points:所有点两两出现空格分隔
   2. 默认填充,可以设置`fill="none"`修改
   3. 如需闭合：需要在points最后**设置起始点位置**
3. 标签`<polygon>`绘制折线
   1. 属性同上
   2. 自动闭合折线
```html
<svg width="500" height="400">
  <line x1="100" y1="100" x2="200" y2="100" stroke="red"></line> 
  <polyline points="100 100 200 200 70 150" stroke="red" fill="none"></polyline>
  <polygon points="100 100 200 200 80 300" stroke="red" fill="none" stroke-width="0.5"></polygon>
</svg>
```

## 路径path
1. 属性：
   1. M: moveTo，后跟起点位置
   2. L: lineTo, 后跟其他点位置
   3. H: lineTo，和上一个点的Y轴相同 L 100 400 L 200 400 === L 100 400 H 200
   4. V: lineTo, 和上一个点的X轴相同 L 100 400 L 100 500 === L 100 400 V 500
   5. Z: closePath，表示闭合
2. 注意点：
   1. path路径中区分大小写：L与l是不同的
   2. `1`小写的L表示相对路径：**相对于M起点的位置**
```html
<svg width="500" height="400">
    <path d="M 100 100 H 200 V 200 Z" stroke="red" fill="none" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
```

## 贝塞尔曲线
1. 二次贝塞尔曲线`Q x1 y1 x2 y2`:控制点x1/y1,终点x2/y2
2. 三次贝塞尔曲线`C x1 y1 x2 y2 x3 y3`:控制点1(x1/y1),控制点1(x2 y2),终点x3 y3
```html
<svg>
   <path d="M 100 100 Q 150 50 200 100 " stroke="red" fill="none"></path>
   <path d="M 100 100 C 100 50 100 50 200 100" stroke="red" fill="none"></path>
</svg>
```
## 绘制文本
+ x/y: 文字的位置
+ style:设置文字样式，大小/字体
+ dx/dy:与上一个文字的间距
+ dominant-baseline: 垂直方向的对齐方式
+ text-anchor:水平方向的对齐方式
```html
<svg width="500" height="400">
   <text>
      <tspan fill="red" x="200" y="100">
        这是一段文本
      </tspan>
      <tspan fill="blue" x="260" y="200">
        这是一段文本2
      </tspan>
    </text>
 </svg>
```
+ 绘制半径文本
  + `defs`标签
  + `<path id="myPath">`:定义路径
  + `textPath`标签
  + `xlink:href="#myPath"`
```html 
<svg>
   <defs>
      <path id="myPath" d="M 100 100 Q 150 50 200 100" fill="none" stroke="red"></path>
    </defs> 
    <text>
      <textPath xlink:href="#myPath">这是一段温拌</textPath>
    </text>
</svg>
```

## 绘制超链接
+ `a`标签
+ `xlink:href`:链接地址
+ `xlink:title`:链接标题
+ `target`:跳转方式
```html
<svg>
   <a xlink:href="http://www.baidu.com" xlink:title="百度官网" target="_blank">
      <text fill="red" x="100" y="100" dominant-baseline="middle" text-anchor="middle">
        这是百度官网
      </text>
    </a>
</svg>
```

## 绘制图片
+ 默认情况下，图片有多大绘制的就有多大
+ 绘制时的宽高与实际图片的宽高不一致时，**高度填满，宽度等比拉伸**
+ `xlink:href`
+ `width/height`
+ `x/y`:位置

```html
<svg>
   <image xlink:href="1.jpg" width="200" height="200"></image>
</svg>
```

## 结构标签
+ `<defs>`
+ `<g id="myId">`
+ `<use xlink:href="#myId">`
```html
<svg>
   <defs>
      <g id="myGroup">
         <rect x="100" y="100" width="100" height="100" rx="50" ry="25"></rect>
         <rect x="100" y="200" width="100" height="100" rx="50" ry="25"></rect>
      </g>
   </defs>
   <symbol id="myGroup2">
      <rect x="100" y="100" width="100" height="100" rx="50" ry="25"></rect>
        <rect x="100" y="200" width="100" height="100" rx="50" ry="25"></rect>
    </symbol>
    <use xlink:href="#myGroup" fill="#733"></use>
    <use xlink:href="#myGroup2" fill="#345" x="200" y="100"></use>
</svg>
```

## svg裁剪和蒙版
+ `<clipPath id="myClipPath">`使用属性`clip-path="url(#myClipPath)"`绑定
> 只有路径内的内容可以显示，路径外的内容不会显示
+ `<mask id="myMask">`使用属性`mask="url(#myMask)"`绑定
> 可见与不可见的渐变
> **注意点：指定蒙版和裁剪时需要使用url(#id)来指定**

## 渐变
+ `<linearGradient id="myLinearGradient">`
+ `<radialGradient id="myRadialGradient">`
+ x1/y1:起点
+ x2/y2：终点
> 默认情况下x1/y1/x2/y2使用是百分比`gradientUnits="objectBoundingBox"`,`gradientUnits="userSpaceOnUse"`为像素值，
+ `<stop offset="0" stop-color="red">`
```html
<svg>
   <linearGradient id="myLinearGradient" x1="100" y1="100" x2="200" y2="200" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="red" ></stop>
      <stop offset="0.4" stop-color="#dd2"></stop>
      <stop offset="0.6" stop-color="#785" ></stop>
      <stop offset="1" stop-color="blue" ></stop>
    </linearGradient>
    <rect x="100" y="100" width="100" height="100" fill="url(#myLinearGradient)"></rect>
</svg>
```

## 画笔
> SVG中除了纯色和渐变色填充颜色外，还可以使用**自定义图形进行填充**
+ `<pattern id="myPattern" width="0.2" height="0.2">`
+ `patternUnits`属性定义width/height单位:objectBoundingBox/userSpaceOnUse
```html
<svg>
   <defs>
      <pattern id="myPattern" width="20" height="30" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="5" fill="red"></circle>
      </pattern>
    </defs>
    <rect x="0" y="0" width="200" height="300" fill="url(#myPattern)"></rect>
</svg>
```

## SVG形变
> 与canvas一样**改变的是坐标系**
+ `transform属性`
```html
<svg>
   <rect x="100" y="100" width="100" height="200" fill="red" transform="translate(50,20)"></rect>
   <rect x="100" y="300" width="100" height="200" fill="red" ></rect>
</svg>
```

## viewBox视口
+ 属性值`viewBox="x y width height"`
> viewBox不是等比时设置的x/y无效，viewBox会自动调节位置
+ 属性值`preserveAspectRatio="xMinYmin"`
  + xMin:viewPort与viewBox的x轴左对齐
  + xMid:viewPort与viewBox的x轴中心对齐
  + xMax:viewPort与viewBox的x轴右对齐
  + YMin:viewPort与viewBox的Y轴上对齐
  + YMid:viewPort与viewBox的Y轴中心对齐
  + Ymax:viewPort与viewBox的Y轴下对齐
> **近大远小**
```html
<svg width="200" height="200" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="50" fill="red"></circle>
</svg>
```

## SVG动画
1. 使用方式:通过插入标签中使用、通过**xlink:href="#id"**使用
```html
<svg>
   <circle id="myAnimate" cx="100" cy="100" r="50" fill="blue"></circle>
   <animate attributeName="fill" from="blue" to="red" dur="5s" xlink:href="#myAnimate" fill="freeze"></animate>

   <!-- 或者 -->
   <circle cx="100" cy="100" r="50" fill="blue">
      <animate attributeName="fill" from="blue" to="red" dur="5s"  fill="freeze"></animate>
   </circle>
</svg>
```
2. 常用属性
   + **repeatCount**: 规定动画重复的次数。
   + **repeatDur**: 规定动画重复总时长
   + **begin**: 规定动画开始的时间
      + **begin**="1s"
      + **begin**="click"
      + **begin**="click + 1s"
   + **restart**: 规定元素开始动画之后，是否可以被重新开始执行
      + **always**：动画可以在任何时候被重置。这是默认值。
      + **whenNotActive**：只有在动画没有被激活的时候才能被重置，例如在动画结束之后。
      + **never**：在整个SVG执行的过程中，元素动画不能被重置。
   + **calcMode**: 规定每一个动画片段的动画表现
      + **linear**：默认属性值, 匀速动画
      + **discrete**: 非连续动画, 没有动画效果瞬间完成
      + **paced**: 规定整个动画效果始终以相同的速度进行，设置keyTimes属性无效
      + **spline**: 配合keySplines属性来定义各个动画过渡效, 自定义动画
   + **keyTimes**:划分动画时间片段, 取值0-1
   + **values**:划分对应取值片段的值
3. 多个属性动画：设置多个`<animate>`标签
4. 往返动画：设置相同的属性的`<animate>`标签,通过**标签ID+begin属性**设置
```html
<svg>
   <circle cx="100" cy="100" r="50" fill="blue">
      <animate id="scal_1" attributeName="fill" from="blue" to="red" dur="2s" fill="freeze" begin="0;scal_2.end"></animate>
      <animate id="scal_2"  attributeName="fill" from="red" to="blue" dur="2s" fill="freeze" begin="scal_1.end"></animate>
    </circle>
</svg>
```
5. 形变动画：`<animateTransform>`
   1. translate: from/to="x y"
   2. rotate:from/to="deg 原点x 原点y"
   3. scale:from/to="scaleX scaleY"
```html
<svg>
   <path d="M0 0 C0 200 200 200 200 0" stroke="red" stroke-width="0.5" fill="none"> </path>
   <rect x="0" y="0" width="10" height="2" fill="red" >
   <animateMotion path="M0 0 C0 200 200 200 200 0" dur="6s" begin="click" fill="freeze" rotate="auto"
   ></animateMotion>
   </rect>
</svg>
```

## 第三方库
+ [snapsvg](http://snapsvg.io/docs/)