import React from 'react';
import styled from 'styled-components';
import MenuLink from '../Nav/MenuLink';

const PaginationStyles = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 auto;
  width: max-content;
  a {
    padding: 1rem;
  }
`;

const Pagination = ({ pages, currentPage }) => {
  const hasPrev = currentPage !== 1;
  const hasNext = pages.length !== currentPage;

  console.log(pages.length);
  return (
    <PaginationStyles>
      {hasPrev && (
        <MenuLink href={{ pathname: 'search', query: { page: currentPage - 1 } }}>Prev</MenuLink>
      )}
      {pages.map((page) => (
        <MenuLink href={{ pathname: 'search', query: { page } }}>{page}</MenuLink>
      ))}
      {hasNext && (
        <MenuLink href={{ pathname: 'search', query: { page: currentPage + 1 } }}>Next</MenuLink>
      )}
    </PaginationStyles>
  );
};

export default Pagination;
