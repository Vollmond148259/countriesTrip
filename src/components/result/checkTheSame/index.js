function checkTheSame(array, searchingObject) {
    const found = array.find(element => element.city === searchingObject.city)
    if (found === undefined) {
      return true
    }
    else{
      return false
    }
  }
export default checkTheSame