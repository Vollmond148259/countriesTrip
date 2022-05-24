function checkTheSame(array, searchingObject) {
  const found = array.find(element => element.city === searchingObject.city)
  if (found === undefined) {
    return false
  } else {
    return true
  }
}

export default checkTheSame
