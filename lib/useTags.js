import React from 'react';
import { useQuery } from 'react-apollo';

import { GET_ALL_TAGS_QUERY } from './queries';

const useTags = (type) => {
  const { loading, data } = useQuery(GET_ALL_TAGS_QUERY);

  const tags = data?.tags.filter((tag) => {
    if (tag.type === type) return tag;
  });

  return tags;
};

export default useTags;
