// 实现Iterator接口的自定义数组

class MyArr {
  constructor() {
    // 获取参数
    for (let i = 0; i < arguments.length; i++) {
      this[i] = arguments[i]
    }

    // 设置数组长度
    this.length = arguments.length
  }

  // 每个Iterator接口中都必须包含[Symbol.iterator]函数
  [Symbol.iterator]() {
    let that = this
    let index = 0
    // 返回一个对象
    return {
      next() {
        return {
          value: that[index++],
          done: index < that.length
        }
      }
    }
  }
}

let arr = new MyArr(1,3,4)
// console.log(arr[Symbol.iterator])
// let _iterator = arr[Symbol.iterator]()
// console.log(_iterator.next())
// console.log(_iterator.next())
// console.log(_iterator.next())
// console.log(_iterator.next())
console.log(arr)
for (let b in arr) {
  console.log(b)
}