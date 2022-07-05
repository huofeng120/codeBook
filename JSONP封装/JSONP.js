// 类似jq中$.ajax请求

class MyJsonp {
  constructor(config={}){
    let {url,jsonp,jsonpCallback,data,success} = config
    console.log("config",config)
    // 请求地址
    this.url = url
    if (!this.url) {
      throw Error
    }
    // jsonp回调函数key
    this.jsonp = jsonp || 'cb'

    // jsonp回调函数名称
    this.jsonpCallback = jsonpCallback || this.getRandomStr()

    // 获取参数
    this.data = data || {}
    this.success = success
    this.createScript()
    
  }
  getRandomStr(){
    return "JQ"+(Math.random()+'').replace('.','')
  }
  // 动态生成script标签
  createScript(){
    let oScript = document.createElement('script')
    oScript.src = this.setJsonpRequestUrl()
    document.body.appendChild(oScript);

    window[this.jsonpCallback] = (data)=>{
      // 删除jsonp script
      document.body.removeChild(oScript)

      // 调用成功函数
      this.success(data)

      // 调用失败函数
      // this.fail(data)
    }
  }
  // jsonp完整路径
  setJsonpRequestUrl(){
    let data = this.setReqData()
    return `${this.url}?${this.jsonp}=${this.jsonpCallback}${data}`
  }

  // 解析data数据
  setReqData(){
    let dataStr = Object.keys(this.data).map((key)=>`${key}=${this.data[key]}`).join('&')
    return "&"+dataStr
  }

}