import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

interface Props {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}

const ModalDelete = ({ open, handleClose, handleSubmit }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Вы уверены что хотите удалить?
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Нет</Button>
        <Button onClick={handleSubmit} autoFocus>
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
