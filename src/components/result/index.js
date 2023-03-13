import React, { forwardRef, useDeferredValue, useEffect } from 'react';
import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  putCollection,
  putShowCollection,
  setShowModal,
} from '../../redux/slice/slice';
import { filtered } from './utils';
import SwipDrawer from '../swipDrawer';
import Papa from 'papaparse';
import SearchBar from '../search';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ResultItem from './resultItem';

const innerElementType = forwardRef(({ style, ...rest }, ref) => {
  return (
    <Container>
      <SearchBar />
      <div
        ref={ref}
        style={{
          ...style,
          height: `${parseFloat(style.height) + 300 * 2}px`,
        }}
        {...rest}
      />
    </Container>
  );
});
innerElementType.displayName = 'insert';
function Result() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.counter.showModal);
  const searchingValue = useSelector((state) => state.counter.searchValue);
  const showFavorite = useSelector((state) => {
    state.counter.showFavorite;
  });
  const allCollection = useSelector((state) => state.counter.collection);
  const favoriteCollection = useSelector(
    (state) => state.counter.favoriteCollection
  );
  const countries = useSelector((state) => state.counter.showCollection);
  const defferedValue = useDeferredValue(searchingValue);

  useEffect(() => {
    const getCountries = async () => {
      const response = await fetch(
        'https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/0635f14817ec634833bb904a47594cc2f5f9dbf8/worldcities_clean.csv'
      );
      const data = await response.text();
      const parsedData = Papa.parse(data, { header: true });
      dispatch(putCollection(parsedData.data));
      dispatch(putShowCollection(parsedData.data));
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (!showFavorite) {
      dispatch(putShowCollection(filtered(allCollection, defferedValue)));
    } else {
      dispatch(putShowCollection(filtered(favoriteCollection, defferedValue)));
    }
  }, [defferedValue, favoriteCollection, showFavorite]);

  return (
    <>
      <Container
        sx={{
          width: '1200px',
          height: '100vh',
        }}
      >
        <div id="top"></div>
        <AutoSizer>
          {({ height, width }) => (
            <List
              sx={{ background: 'background.default', border: '1px solid red' }}
              height={height}
              itemCount={countries.length}
              innerElementType={innerElementType}
              itemSize={200}
              width={width}
            >
              {ResultItem}
            </List>
          )}
        </AutoSizer>
      </Container>
      <SwipDrawer showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Result;
