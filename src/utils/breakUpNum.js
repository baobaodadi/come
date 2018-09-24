
/**
 * @Description: Break up big number to 'xxx,xxx,xxx' style, or other custom styles
 */
export default function breakUpNumber(number = 0, step = 3, separator = ',') {
  const splitNum = number.toString().split('.');
  const num = splitNum[0].split('').reverse();
  function spNum(targetNum, preArray) {
    const pre = targetNum.splice(0, preArray.length === 0 ? step : step + 1, separator);
    if (targetNum.length === 1) {
      return preArray.concat(pre);
    }
    return spNum(targetNum, preArray.concat(pre));
  }
  return spNum(num, []).reverse().join('') + (splitNum[1] ? `.${splitNum[1]}` : '');
}

export function compeleteDecimal(number) {

  const splitNum = number.toString().split('.');
  if (splitNum[1]) {
    return `${splitNum[0]}.${splitNum[1].length > 1 ? splitNum[1] : `${splitNum[1]}0`}`;
  }
  return `${splitNum[0]}.00`;
}
