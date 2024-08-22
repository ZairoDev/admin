import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event, number) => {
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
        renderItem={(item) => (
          <PaginationItem
            {...item}
            style={{
              color: item.page === currentPage ? '#EE368C' : '',
              fontWeight: item.page === currentPage ? 'bold' : 'normal',
            }}
          />
        )}
      />
    </Stack>
  );
};

export default PaginationComponent;