import Dialog from '@mui/material/Dialog';

interface Props {
  modalIsOpen: boolean;
  handleClickClose: () => void;
  photoUrl: string;
}

const ModalPhoto = ({ modalIsOpen, handleClickClose, photoUrl }: Props) => {
  return (
    <Dialog
      open={modalIsOpen}
      onClose={handleClickClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <img src={photoUrl} alt="" />
    </Dialog>
  );
};

export default ModalPhoto;
