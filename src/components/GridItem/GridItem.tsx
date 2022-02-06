import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { fetchPhotos } from '../api';
import { PhotoItem } from '../dto/DTO';
import { mobStore } from '../../store/mobStore';
import ModalPhoto from './ModalPhoto';
import ModalDelete from './ModalDelete';

interface Props {
  photoItem: PhotoItem;
}

const GridItem = observer(({ photoItem }: Props) => {
  // set photo id
  const [photoId, setPhotoId] = useState(0);

  // delete handle
  const handleSubmit = () => {
    fetchPhotos.deletePhoto(photoId).then(() => {
      const params = new URLSearchParams();
      params.append('_limit', `13`);

      fetchPhotos.getAll(params).then(() => {
        const updatedPhotos = mobStore.getPhotos.filter(
          (photo: PhotoItem) => photo.id !== photoId
        );
        mobStore.setPhotos(updatedPhotos);
        setPhotoId(0);
      });
    });
  };

  // delete dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setPhotoId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // carousel
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  const handleClickOpenPhoto = (url: string) => {
    setModalIsOpen(true);
    setPhotoUrl(url);
  };
  const handleClickClose = () => {
    setModalIsOpen(false);
    setPhotoUrl('');
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={photoItem.thumbnailUrl}
          alt="green iguana"
          onClick={() => handleClickOpenPhoto(photoItem.url)}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {photoItem.id}: {photoItem.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="primary"
          onClick={() => handleClickOpen(photoItem.id)}
        >
          Delete
        </Button>
      </CardActions>
      <ModalDelete
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <ModalPhoto
        modalIsOpen={modalIsOpen}
        handleClickClose={handleClickClose}
        photoUrl={photoUrl}
      />
    </Card>
  );
});

export default GridItem;
