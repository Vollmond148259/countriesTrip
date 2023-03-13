import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { setShowModal } from '../../redux/slice/slice';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import GoogleStreet from '../swipDrawer/googlestreet';
import SimpleMap from '../swipDrawer/googlemap';
import { useDispatch, useSelector } from 'react-redux';
import LitleCityList from '../swipDrawer/cityList';
import { StyledButton, StyledList } from '../../elements';

export default function SwipDrawer({ random, getRandomTown }) {
  let dispatch = useDispatch();
  let coordinates = [];
  const [toggleStreet, setToggleStreet] = useState(!false);
  const showModal = useSelector((state) => state.counter.showModal);
  const allCollection = useSelector((state) => state.counter.collection);
  const choiceCoordinates = useSelector((state) => state.counter.coordinates);
  const randomCoordinates = useSelector(
    (state) => state.counter.randomCoordinates
  );
  const [selectView, setView] = useState('none');

  if (random === true) {
    coordinates = randomCoordinates;
  } else {
    coordinates = choiceCoordinates;
  }

  useEffect(() => {
    setToggleStreet(!toggleStreet);
  }, [randomCoordinates]);

  const list = () => (
    <StyledList>
      {random && <LitleCityList />}
      {random && (
        <StyledButton
          variant="contained"
          onClick={() => {
            setToggleStreet(!toggleStreet);
            getRandomTown(allCollection);
          }}
        >
          refresh
        </StyledButton>
      )}
      {!random && (
        <Button
          fullWidth
          onClick={() => {
            setView('map');
          }}
          variant="contained"
        >
          show Map
        </Button>
      )}
      {!random ? (
        <Button
          fullWidth
          onClick={() => {
            setView('street');
          }}
          variant="contained"
        >
          show street
        </Button>
      ) : (
        <GoogleStreet coordinates={coordinates} toggleStreet={toggleStreet} />
      )}
      <Box role="presentation" onKeyDown={() => setShowModal(false)}>
        {selectView === 'map' && <SimpleMap coordinates={coordinates} />}
        {selectView === 'street' && <GoogleStreet coordinates={coordinates} />}
      </Box>
    </StyledList>
  );

  function handleInitialModal() {
    dispatch(setShowModal(false));
    setView('none');
  }

  return (
    <>
      <SwipeableDrawer
        open={showModal}
        anchor={'bottom'}
        onClose={() => handleInitialModal()}
        onOpen={() => dispatch(setShowModal(true))}
      >
        {list()}
      </SwipeableDrawer>
    </>
  );
}
