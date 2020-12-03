import React from 'react';
import { useQuery } from 'react-apollo';
import Project from '../../components/Project';
import { endpoint, productionEndpoint } from '../../config';
import { ALL_PROJECT_TITLES_QUERY, SINGLE_PROJECT_QUERY } from '../../lib/queries';
import { apolloClient } from '../../lib/withData';

const project = (props) => {
  return <Project project={props.project} query={props.query} />;
};

export async function getStaticPaths() {
  const mutation = `
    mutation {
      updateProjectsIsStatic { id }
    }
  `;

  const updateProjects = await fetch(
    process.env.NODE_ENV === 'development' ? endpoint : productionEndpoint,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation }),
    }
  );

  const query = `
  query {
    projects(isStatic: true) {
      title
      id
    }
  }
`;

  return fetch(process.env.NODE_ENV === 'development' ? endpoint : productionEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      const paths = data.projects.map((project) => {
        return {
          params: {
            id: project.id.toString(),
          },
        };
      });
      // console.log(paths);
      return { paths, fallback: false };
    });

  // Call an external API endpoint to get posts
  // console.log(graphQlClient);
  // console.log(data, 'DATAA');
  // const paths = data.projects.map((project) => ({
  //   params: { id: project.id },
  // }));

  // console.log(paths, 'paths');
  // // // We'll pre-render only these paths at build time.
  // // // { fallback: false } means other routes should 404.
}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  // const { loading, data: { project } = {} } = useQuery(SINGLE_PROJECT_QUERY, {
  //   variables: { id: params.id },
  // });

  // console.log('static props');
  const { data } = await apolloClient.query({
    query: SINGLE_PROJECT_QUERY,
    variables: {
      id: params.id,
    },
  });

  // console.log(data);
  // // const post = await res.json()
  // // Pass post data to the page via props
  return { props: { project: data.project }, revalidate: 1 };
}

export default project;
