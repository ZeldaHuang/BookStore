export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email || email.length <= 0) return "电话号码不可为空"
  // if (!re.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}
