import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { Button } from '@mui/material';
import { sortBy, isEqual } from 'lodash';
import { motion } from 'framer-motion';

import GridItem from '../GridItem/GridItem';
import { PhotoItem } from '../dto/DTO';
import { fetchPhotos } from '../api';
import { mobStore } from '../../store/mobStore';
import PaginationComp from './Pagination';

const GridContainer = observer(() => {
  // fetch data
  useEffect(() => {
    const params = new URLSearchParams();
    params.append('_limit', '12');
    fetchPhotos.getAll(params);
  }, []);

  const [list, setList] = useState<PhotoItem[]>(toJS(mobStore.getPhotos));
  useEffect(() => {
    setList(toJS(mobStore.getPhotos));
    return () => {
      setList([]);
    };
    // eslint-disable-next-line
  }, [mobStore.getPhotos]);

  // sorting
  const [activeKey, setActiveKey] = useState('NONE');
  const [active, setActive] = useState(false);
  const SORTS: any = {
    NONE: (list: PhotoItem[]) => list,
    ID: (list: PhotoItem[]) => sortBy(list, [o => o.id]),
    TITLE: (list: PhotoItem[]) => sortBy(list, [o => o.title])
  };
  const handleSort = (title: string) => {
    const reverseList = SORTS[title](list).reverse();
    setList(prevState =>
      isEqual(prevState, SORTS[title](list)) ? reverseList : SORTS[title](list)
    );
    setActiveKey(title);
    setActive(!active);
  };

  //   pagination
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    const params = new URLSearchParams();
    params.append('_limit', '12');
    params.append('_page', value.toString());
    fetchPhotos.getAll(params);
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <Box
        sx={{
          width: '100%',
          maxWidth: '980px',
          margin: '0 auto'
        }}
      >
        <div>
          <Button
            size="small"
            color={activeKey === 'ID' ? 'success' : 'primary'}
            onClick={() => handleSort('ID')}
          >
            ID
          </Button>
          <Button
            size="small"
            color={activeKey === 'TITLE' ? 'success' : 'primary'}
            onClick={() => handleSort('TITLE')}
          >
            TITLE
          </Button>
        </div>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {list.length > 0 &&
            list.map((item: PhotoItem) => (
              <Grid item xs={12} sm={4} md={3} key={item.id}>
                <motion.div style={{ height: '100%' }} layout>
                  <GridItem photoItem={item} />
                </motion.div>
              </Grid>
            ))}
        </Grid>
        <PaginationComp handleChange={handleChange} page={page} />
      </Box>
    </div>
  );
});

export default GridContainer;
