export function nameValidator(name) {
  if (!name || name.length <= 0) return "昵称不可为空";
  return '';
}
