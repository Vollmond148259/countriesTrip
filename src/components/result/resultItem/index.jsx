import { Lighter, checkTheSame, filtered } from '../utils';
import { useCallback, useEffect } from 'react';
import { Container, Box, Grid, Typography, Stack, Button } from '@mui/material';
import {
  putChoiceCoordinates,
  putFavoriteCities,
  putShowCollection,
  removeFavoriteCities,
  setShowModal,
} from '../../../redux/slice/slice';
import { useDispatch, useSelector } from 'react-redux';

const ResultItem = ({ index, style }) => {
  const dispatch = useDispatch();
  const favoriteCollection = useSelector(
    (state) => state.counter.favoriteCollection
  );
  const countries = useSelector((state) => state.counter.showCollection);
  const showModal = useSelector((state) => state.counter.showModal);
  const searchingValue = useSelector((state) => state.counter.searchValue);
  const allCollection = useSelector((state) => state.counter.collection);
  const showFavorite = useSelector((state) => state.counter.showFavorite);

  useEffect(() => {
    showFavorite &&
      dispatch(putShowCollection(filtered(favoriteCollection, searchingValue)));
    !showFavorite &&
      dispatch(putShowCollection(filtered(allCollection, searchingValue)));
  }, [searchingValue, favoriteCollection, showFavorite]);

  const light = useCallback(
    (str) => {
      return <Lighter filter={searchingValue} str={str} />;
    },
    [searchingValue]
  );
  return (
    <Container
      style={{
        ...style,
        top: `${parseFloat(style.top) + 200}px`,
        height: `${parseFloat(style.height) + 50}px`,
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(90deg,#21163B,#15142B)',
          borderRadius: '10px',
          height: '180px',
        }}
      >
        <Grid
          pl={2}
          pr={2}
          container
          spacing={{ xs: 0.5, sm: 2 }}
          justifyContent="space-between"
        >
          <Grid item xs={10} sm={4} md={5} lg={7} mt={{ xs: 0, sm: 2, md: 4 }}>
            <Typography color="text.main" variant="h5">
              {light(countries[index].city)}
            </Typography>
            <Stack
              direction={{ xs: 'row', sm: 'column', md: 'row' }}
              spacing={1}
            >
              <Typography variant="h5" color="text.additional">
                {countries[index].population}
              </Typography>
              <Typography variant="h5" color="text.additional">
                {light(countries[index].country)}
              </Typography>
            </Stack>
          </Grid>
          <Stack direction="column" spacing={1} mt={3} mr={7}>
            <Button
              onClick={() => {
                console.log('scroll');
                console.log({ window });
              }}
            >
              hello
            </Button>
            <Button
              onClick={() => {
                dispatch(setShowModal(true));
                dispatch(
                  putChoiceCoordinates([
                    countries[index].lat,
                    countries[index].lng,
                  ])
                );
              }}
              variant="outlined"
            >
              See on map
            </Button>
            {showFavorite ? (
              <Button
                onClick={() => {
                  dispatch(removeFavoriteCities(countries[index]));
                }}
                variant="outlined"
              >
                Move to bin
              </Button>
            ) : checkTheSame(favoriteCollection, countries[index]) ? (
              <Button
                onClick={() => {
                  dispatch(removeFavoriteCities(countries[index]));
                }}
                variant="outlined"
              >
                Delete
              </Button>
            ) : (
              <Button
                onClick={() => {
                  dispatch(putFavoriteCities(countries[index]));
                }}
                variant="outlined"
              >
                I want to visit
              </Button>
            )}
          </Stack>
        </Grid>
      </Box>
    </Container>
  );
};
export default ResultItem;
