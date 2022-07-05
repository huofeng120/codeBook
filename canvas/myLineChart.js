// 封装，绘制表格，绘制坐标轴，绘制数据点，绘制折线
class MyLineChart {
  constructor(width = 300, height = 150) {
    // 创建canvas图形
    this.oCanvas = document.createElement("canvas")
    this.oCanvas.width = width
    this.oCanvas.height = height
    document.body.appendChild(this.oCanvas)

    // 获取画图工具
    this.oCtx = this.oCanvas.getContext('2d')


  }

  // 绘制表格
  drawGrid(gridSize = 20) {
    this.gridSize = gridSize
    let oCtx = this.oCtx
    let oW = oCtx.canvas.width
    let oH = oCtx.canvas.height
    // 计算横向线条数并生成
    let _countW = Math.floor(oH / gridSize)
    for (let i = 0; i < _countW; i++) {
      oCtx.beginPath()
      oCtx.moveTo(0, i * gridSize - 0.5)
      oCtx.lineTo(oW, i * gridSize - 0.5)
      oCtx.strokeStyle = '#DDD'
      oCtx.stroke()
    }

    // 计算纵向线条数并生成
    let _countH = Math.floor(oW / gridSize)
    for (let i = 0; i < _countH; i++) {
      oCtx.beginPath()
      oCtx.moveTo(i * gridSize - 0.5, 0)
      oCtx.lineTo(i * gridSize - 0.5, oH)
      oCtx.strokeStyle = '#DDD'
      oCtx.stroke()
    }

  }

  // 绘制坐标轴
  drawCoor() {
    let oCtx = this.oCtx
    let SIZE = this.gridSize
    let oW = oCtx.canvas.width
    let oH = oCtx.canvas.height
    let originX = SIZE
    let originY = oH - SIZE
    let endX = oW - SIZE
    let endY = SIZE
    oCtx.beginPath()
    oCtx.moveTo(originX, originY); // 原点位置

    // X轴
    oCtx.lineTo(endX, originY)
    oCtx.strokeStyle = "#000"
    oCtx.stroke()

    // 绘制X轴箭头
    oCtx.lineTo(endX - 5, originY - 5)
    oCtx.lineTo(endX - 5, originY + 5)
    oCtx.lineTo(endX, originY); // 原点位置
    oCtx.fill()


    // y轴绘制

    oCtx.beginPath()
    oCtx.moveTo(originX, originY)

    oCtx.lineTo(originX, endY)
    oCtx.strokeStyle = "#000"
    oCtx.stroke()

    // 绘制三角
    oCtx.lineTo(originX - 5, endY + 5)
    oCtx.lineTo(originX + 5, endY + 5)
    oCtx.lineTo(originX, endY)
    oCtx.fill()
  }

  // 绘制数据点
  drawDataDot(list, SQUARE_SIZE = 10) {
    let oCtx = this.oCtx
    // 绘制数据点矩形
    list.forEach((e) => {
      let { x, y } = e
      oCtx.beginPath()
      oCtx.moveTo(x - SQUARE_SIZE / 2, y - SQUARE_SIZE / 2)
      oCtx.lineTo(x + SQUARE_SIZE - SQUARE_SIZE / 2, y - SQUARE_SIZE / 2)
      oCtx.lineTo(x + SQUARE_SIZE - SQUARE_SIZE / 2, y + SQUARE_SIZE - SQUARE_SIZE / 2)
      oCtx.lineTo(x - SQUARE_SIZE / 2, y + SQUARE_SIZE - SQUARE_SIZE / 2)
      oCtx.fill()
    })
  }

  // 绘制折线
  drawLine(list, color = "#000") {
    let oCtx = this.oCtx
    oCtx.beginPath()
    list.forEach((e, i) => {
      let { x, y } = e
      i === 0 ? oCtx.moveTo(x, y) : oCtx.lineTo(x, y)
    })
    oCtx.strokeStyle = color
    oCtx.stroke()
  }

  // 绘制矩形
  drawRect(list, color = "#000") {
    let oCtx = this.oCtx

    list.forEach(el => {
      let { x, y } = el
      let _h = oCtx.canvas.height - el.y - this.gridSize
      oCtx.fillStyle = color
      oCtx.fillRect(x, y, this.gridSize, _h)
    })
  }
}