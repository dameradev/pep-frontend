import Link from 'next/link';
import Router from 'next/router';
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Icons from '../../../utils/icons';

import { GET_ALL_COUNTRIES_QUERY } from '../../../utils/queries';

import { respondTo } from '../../../utils/respondTo';

const SAVE_PROJECT_MUTATION = gql`
  mutation SAVE_PROJECT_MUTATION($projectId: Int) {
    saveProject(projectId: $projectId) {
      isSaved
    }
  }
`;

const Project = styled.article`
  color: #95989d;
  background: #fff;
  padding: 3rem;
  border-radius: 10px;
  box-shadow: -1px -1px 3px #ffffff29;
  margin-bottom: 2rem;
  position: relative;
  font-size: 1.4rem;
  /* min-height: 40vh; */

  ${respondTo.mobilePortrait` 
    padding: 2rem;
  `}
  .project {
    &__title {
      color: ${(props) => props.theme.blue};
      font-size: 2.4rem;
      border-bottom: 1px solid grey;
      width: 100%;
      display: block;
      padding-top: 2rem;
    }
    &__location {
      display: flex;
      align-items: center;
      padding-bottom: 1rem;
      svg {
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
      }
    }

    &__details {
      display: flex;
      justify-content: space-between;
      h3 {
        span {
          font-weight: 100;
          font-style: italic;
        }
      }
    }
    &__description {
      text-align: justify;
    }
    &__nations {
      background: #f7f7f7;
      margin: 2rem -3rem;
      padding: 1.5rem 3rem !important;

      &__list {
        max-height: 10rem;
        overflow-y: scroll;
        display: grid;
        justify-content: space-between;
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
        column-gap: 1rem;
        img {
          width: 3rem;
          height: 1.8rem;
          margin-right: 1rem;
        }
      }
      p {
        font-weight: 300;
        width: 30rem;
        ${respondTo.mobilePortrait` 
          width: 25rem;
        `}
        /* padding-left: 1.5rem; */
        display: flex;
        justify-content: space-between;
        span {
          display: flex;
          align-items: center;
        }
      }
    }

    &__date {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.5rem 1rem !important;
      background: ${(props) => props.theme.blue};
      color: white;
      font-weight: bold;
      border-bottom-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &__costs {
      background: #f7f7f7;
      margin: 2rem -3rem;
      padding: 1.5rem 3rem !important;
    }
    &__total-participants {
      padding: 0 0 2rem 0;
      font-size: 1.8rem;
    }
    &__location {
      margin-bottom: 3rem;
    }
    &__btn {
      border: none;
      text-transform: uppercase;
      color: #fff;
      outline: none;
      &-apply {
        background: ${(props) => props.theme.blue};
        font-size: 1.6rem;
        width: 20rem;
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 1.5rem;
        font-weight: bold;
        border-bottom-right-radius: 10px;
        border-top-left-radius: 10px;
      }
      &-save {
        background: ${(props) => props.theme.red};
        font-size: 1.6rem;
        width: 6rem;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 1.2rem;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 10px;
        svg {
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }
  .section-title {
    font-size: 1.8rem;
    font-weight: 400;
  }
`;
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
  } = props.project;
  const { userId, handleFormDisplay } = props;
  const { loading, error, data } = useQuery(GET_ALL_COUNTRIES_QUERY);

  const [saveProject, { data: saveProjectData, loading: saveProjectLoading }] = useMutation(
    SAVE_PROJECT_MUTATION,
    {
      variables: { projectId: id },
    }
  );

  let isProjectSaved = saveProjectData
    ? saveProjectData.saveProject.isSaved
    : savedProjectUserIds.find((id) => id === parseInt(userId));

  return (
    <Project className={props.className}>
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
        {Icons.Location} Location: {location && location.address}
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
    </Project>
  );
};
export default SingleProject;
