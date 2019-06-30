export default {
  /**
   * 检索列
   * @param arrayData
   * @param fieldName
   * @return {Array}
   */
  getObjColumn(arrayData, fieldName) {
    if (!arrayData) arrayData = [];
    let res = [];

    this.forEach(arrayData,function (n, i) {
      if (typeof n[fieldName] !== 'undefined') {
        res.push(n[fieldName]);
      }
    });
    return res;
  },
  /**
   * 重建索引
   * @param arrayData
   * @param fieldName
   */
  resetObjIndex(arrayData, fieldName) {
    if (!arrayData) arrayData = [];
    let res = {};
    this.forEach(arrayData,function (n, i) {
      if (typeof n[fieldName] !== 'undefined') {
        res[n[fieldName]] = n;
      }
    });
    return res;
  },
  /**
   * 按照某个字段进行分组
   * @param arrayData
   * @param fieldName
   */
  getObjGroup(arrayData, fieldName) {
    if (!arrayData) arrayData = [];
    let res = {};
    this.forEach.forEach(arrayData,function (n, i) {
      if (typeof res[n[fieldName]] === 'undefined') res[n[fieldName]] = [];
      res[n[fieldName]].push(n);
    });
    return res;
  },
  /**
   * 获取值
   * @param data
   * @param key
   * @param defaultValue
   * @return {*}
   */
  getObjValue(data, key, defaultValue = null) {
    key += '';
    key = key.split('.');
    let res = defaultValue;
    const keyLength = key.length - 1;
    this.forEach(key, function (n, i) {
      if (!data) data = [];
      if (typeof data[n] === 'undefined') return false;
      if (i === keyLength) {
        res = data[n];
      } else {
        data = data[n];
      }
    });
    return res;
  },

  /**
   * 循环
   * @param collection
   * @param callback
   */
  forEach(collection,callback){
    if(!collection || typeof callback !== 'function') return;
    if(collection instanceof Array){
      for (let i=0;i<collection.length;i++){
        if(callback(collection[i],i) === false){
          break;
        }
      }
    }else if(collection instanceof Object ){
      for (let i in collection){
        if(callback(collection[i],i) === false){
          break;
        }
      }
    }
  },

  /**
   * 获取url参数
   * @param name
   * @param url
   * @returns {*}
   */
  getUrlParam(name,url) {
    let _search;
    if(url){
      const _u = url.split('?');
      _search = typeof _u[1] !=='undefined'?_u[1]:'';
    }else {
      _search = window.location.search.substr(1);
    }
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = _search.match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
}