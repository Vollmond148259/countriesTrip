import map from 'lodash/map';
import { Box } from '@mui/material';
function checkTheSame(array, searchingObject) {
  const found = array.find((element) => element.city === searchingObject.city);
  if (found === undefined) {
    return false;
  } else {
    return true;
  }
}

function filtered(array, value) {
  if (!value) {
    return array;
  }
  const tempArray = [];
  const valueArray = value.split('');
  const firstChar = valueArray[0].toUpperCase();
  valueArray[0] = firstChar;
  const changedValue = valueArray.join('');
  map(array, (element) => {
    if (
      element.city.indexOf(changedValue) !== -1 ||
      element.country.indexOf(changedValue) !== -1
    ) {
      tempArray.push(element);
    }
  });
  return tempArray;
}

function Lighter({ filter, str }) {
  if (!filter) return str;
  const regExp = new RegExp(filter, 'ig');
  const matchValue = str.match(regExp);
  if (matchValue) {
    return str.split(regExp).map((symbol, index, array) => {
      if (index < array.length - 1) {
        const c = matchValue.shift();
        return (
          <Box key={index} component="span">
            {symbol}
            <Box
              component="span"
              sx={{
                borderRadius: '5px',
                background: '#c31432',
              }}
            >
              {c}
            </Box>
          </Box>
        );
      }
      return symbol;
    });
  }
  return str;
}

export { filtered, Lighter, checkTheSame };
