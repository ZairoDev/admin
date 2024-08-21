import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event,  number) => {
    onPageChange(number);
  };

  return (
    <Stack spacing={10}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
      />
    </Stack>

  );
};

export default PaginationComponent;