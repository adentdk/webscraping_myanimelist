const numberString = {}

numberString.format = (number, length = null, prefix = '') => {
  let string = "" + number;
  
  if (length !== null) {
    const pad = Array.from(Array(10).keys()).map(item => '0').join('')
    string = pad.substring(0, pad.length - string.length) + string
  }

  return prefix + "" + string;

}

export default numberString;