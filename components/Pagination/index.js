import React from 'react';
import styled from 'styled-components';
import MenuLink from '../Nav/MenuLink';

const PaginationStyles = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 auto;
  width: max-content;
  align-items: center;
  color: #5a5a5a;
  a {
    color: #5a5a5a;
    padding: 1rem;
    &[disabled] {
      color: #8a8a8a;
      pointer-events: none;
    }
  }
`;

const Pagination = ({ pages, currentPage }) => {
  const hasPrev = currentPage !== 1;
  const hasNext = pages.length !== currentPage;

  return (
    <PaginationStyles>
      <MenuLink
        scroll={false}
        disabled={!hasPrev}
        href={{ pathname: 'search', query: { page: currentPage - 1 } }}
      >
        Prev
      </MenuLink>
      {/* {pages.map((page) => (
        <MenuLink prefetch href={{ pathname: 'search', query: { page } }}>
          {page}
        </MenuLink>
      ))} */}
      <p>
        Page {currentPage} of <span className="totalPages">{pages.length}</span>
      </p>
      <MenuLink
        scroll={false}
        prefetch
        disabled={!hasNext}
        href={{ pathname: 'search', query: { page: currentPage + 1 } }}
      >
        Next
      </MenuLink>
    </PaginationStyles>
  );
};

export default Pagination;
