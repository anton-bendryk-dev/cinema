import React from 'react';

const Pagination = props => {
  const { currentPage, totalPages, changeCurrentPage } = props;
  const pageNumbers = Array.from(Array(totalPages), (x, index) => index + 1);
  const renderPageNumbers = pageNumbers.map(value => {
    const setClassName = `${currentPage === value ? "btn btn-success" : ''}`;
    if (
      value === 1 ||
      value === totalPages ||
      (value >= currentPage - 2 && value <= currentPage + 2)
    ) {
      return (
        <button
          key={value}
          className={setClassName}
          onClick={() => changeCurrentPage(value)}
        >
          {value}
        </button>
      );
    }
  });

  return (
    <div className="pagination m-5">
      <span className="btn btn-secondary " onClick={() => changeCurrentPage(currentPage - 1)}>&laquo;</span>
      {renderPageNumbers}
      <span className="btn btn-secondary" onClick={() => changeCurrentPage(currentPage + 1)}>&raquo;</span>
    </div>
  );
};
export default Pagination;