
/*
1.Promise特点
1.1创建时必须传入一个函数, 否则会报错
1.2会给传入的函数设置两个回调函数
1.3刚创建的Promise对象状态是pending
1.4状态一旦发生改变就不可再次改变
1.5可以通过then来监听状态的改变
1.5.1如果添加监听时状态已经改变, 立即执行监听的回调
1.5.2如果添加监听时状态还未改变, 那么状态改变时候再执行监听回到
1.5.3同一个Promise对象可以添加多个then监听, 状态改变时所有的监听按照添加顺序执行
*/
// 定义promise状态
const PENDING = "pending" // 等待
const FULFILLED = "fulfilled" // 成功
const REJECTED = "rejected" // 失败
class MyPromise {
  constructor(handle) {
    // 设置初始状态
    this.status = PENDING

    // 初始化成功及失败函数调用栈
    this.resolveCallbacks = []
    this.rejectCallbacks = []
    // 判断是否是函数
    if (!_isFunction(handle)) {
      throw new Error("请输入一个函数")
    }
     // 调用handle函数
     handle(this._resolveFn.bind(this),this._rejectFn.bind(this))
   
  }

  then(onResolve,OnReject){
    // 判断是否传入回调函数
    if (this._isFunction(onResolve)) {
      // onResolve
      if (this.status === FULFILLED) {
        onResolve()
      }
    }

    if (this._isFunction(OnReject)){
      if (this.status === REJECTED) {
        OnReject()
      }
    }

    // 状态pending时
    if (this.status === PENDING) {
      // 收集当前调用栈
      this._isFunction(onResolve) && this.resolveCallbacks.push(onResolve)
      this._isFunction(OnReject) && this.rejectCallbacks.push(OnReject)
    }



  }

  // 成功函数
  _resolveFn(val) {
    // 状态不可逆
    if (this.status === PENDING) {
      // 修改状态为成功
      this.status = FULFILLED

      // 修改成功参数值
      this.resolveVal = val

      // 将栈中函数调用
      this.resolveCallbacks.forEach((fn)=>fn(this.resolveVal))
      
    }
  }

  // 失败函数
  _rejectFn(val) {
    // 状态不可逆
    if (this.status === PENDING) {
      // 修改状态为失败
      this.status = REJECTED

      // 修改失败时参数值
      this.rejectVal = val

      // 将栈中函数调用
      this.rejectCallbacks.forEach((fn)=>fn(this.rejectVal))
     
    }

  }

  _isFunction(fn) {
    return typeof fn === "function"
  }
}