import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Router from 'next/router';
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import Icons from '../../../lib/icons';
import { GET_ALL_COUNTRIES_QUERY } from '../../../lib/queries';
import { SAVE_PROJECT_MUTATION } from '../../../lib/mutations';
import UserContext from '../../../contexts/userContext';

import { SingleProjectStyles } from './styles';

const SingleProject = (props) => {
  const {
    title,
    costs,
    projectType,
    location,
    nations,
    activity,
    id,
    startDate,
    endDate,
    savedProjectUserIds,
    description,
    totalNumberOfParticipants,
    address,
  } = props.project;

  const { handleFormDisplay, loading: projectLoading } = props;
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES_QUERY);

  const user = useContext(UserContext);

  const currentUserId = user?.id;

  const [saveProject, { data: saveProjectData, loading: saveProjectLoading }] = useMutation(
    SAVE_PROJECT_MUTATION,
    {
      variables: { projectId: id },
    }
  );

  let isProjectSaved = saveProjectData
    ? saveProjectData.saveProject.isSaved
    : savedProjectUserIds.find((id) => id === parseInt(currentUserId));

  return projectLoading ? (
    <Skeleton height={350} style={{ marginTop: '2rem' }} />
  ) : (
    <SingleProjectStyles className={props.className}>
      <Link href={{ pathname: '/project', query: { id } }}>
        <a className="project__title">{title}</a>
      </Link>

      <div className="project__details">
        <h3 className="project__type">
          <span>Type: </span>
          {projectType && projectType.split('_').join(' ')}
        </h3>
        <h3 className="project__activity">
          <span>Activity: </span>
          {activity && activity.split('_').join(' ')}
        </h3>
      </div>
      <div className="project__nations">
        <h3 className="section-title">Participating countires</h3>
        <div className="project__nations__list">
          {nations?.map(({ name, numberOfParticipants }) => {
            return (
              <p key={name}>
                <span>
                  <img src={data?.countries.find((country) => country.name === name).image} />{' '}
                  {name}
                </span>
                <span>{numberOfParticipants} spots</span>
              </p>
            );
          })}
        </div>
      </div>
      {description && (
        <div className="project__description">
          <h3 className="section-title">Description</h3>
          {description}
        </div>
      )}

      {costs && (
        <div className="project__costs">
          <h3 className="section-title">Costs</h3>
          {costs}
        </div>
      )}

      {totalNumberOfParticipants && (
        <div className="project__total-participants">
          Total number of participants: {totalNumberOfParticipants}
        </div>
      )}

      <p className="project__location">
        {Icons.Location} Location: {address}
      </p>
      <div className="project__date">
        {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}
      </div>

      <button
        className="project__btn project__btn-save"
        onClick={() => saveProject()}
        disabled={saveProjectLoading}
      >
        {isProjectSaved ? Icons.SaveProjectFilled : Icons.SaveProject}
      </button>
      <button
        className="project__btn project__btn-apply"
        onClick={() => {
          if (handleFormDisplay) {
            handleFormDisplay();
          } else {
            Router.push({
              pathname: '/project',
              query: { id, apply: true },
            });
          }
        }}
      >
        Apply Now
      </button>
    </SingleProjectStyles>
  );
};
export default SingleProject;
