import React from 'react';

const PaginationControls = ({ currentPage, totalPages, handlePreviousPage, handleNextPage }) => {
  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
      <span> Page {currentPage} of {totalPages} </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
    </div>
  );
};

export default PaginationControls;
