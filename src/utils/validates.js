export function valiUsername (str) {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  return reg.test(str)
}
export function valiPass (str) {
  // 6-20位字母加数字
  const reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
  return reg.test(str)
}
// 验证码
export function valiCode (str) {
  const reg = /^[a-z0-9]{6}$/
  return reg.test(str)
}
export function stripscript (str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var rs = ''
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '')
  }
  return rs
}
