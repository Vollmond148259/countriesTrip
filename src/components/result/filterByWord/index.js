import map from "lodash/map"
function filtered(array, value) {
    if (!value) {
      return array
    }
    const tempArray = [];
    const valueArray = value.split("")
    const firstChar = valueArray[0].toUpperCase()
    valueArray[0] = firstChar
    const changedValue = valueArray.join('')
    map(array, (element) => {
      if (element.city.indexOf(changedValue) !== -1 || element.country.indexOf(changedValue) !== -1) {
        tempArray.push(element);
      }
    });
    return tempArray;
  }
  export default filtered