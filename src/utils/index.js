export default {
  /**
   * 获取url中的参数
   * @param name
   * @param url
   * @return {string|null}
   */
  getUrlParam(name,url){
    let _search;
    if(url){
      let _u = url.split('?');
      _search = typeof _u[1] !=='undefined'?_u[1]:'';
    }else {
      _search = window.location.search.substr(1);
    }

    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = _search.match(reg);
    if (r != null) return unescape(r[2]); return null;
  },

  /**
   * 获取值
   * @param data
   * @param key
   * @param defaultValue
   * @return {*}
   */
  getValue(data, key, defaultValue = null) {
    key += '';
    key = key.split('.');
    let res = defaultValue;
    const keyLength = key.length - 1;
    _.forEach(key, function (n, i) {
      if (_.isEmpty(data)) data = [];
      if (typeof data[n] === 'undefined') return false;
      if (i === keyLength) {
        res = data[n];
      } else {
        data = data[n];
      }
    });
    return res;
  }
}