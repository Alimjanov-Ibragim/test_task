import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface Props {
  page: number;
  handleChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationComp = ({ page, handleChange }: Props) => {
  return (
    <Stack spacing={2} style={{ margin: '20px 0' }}>
      <Pagination
        // boundaryCount={10}
        count={10}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationComp;
