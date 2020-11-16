import Link from 'next/link';
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import icons from '../../../utils/icons';
import Icons from '../../../utils/icons';
import { GET_ALL_COUNTRIES_QUERY } from '../../../utils/queries';

import { respondTo } from '../../../utils/respondTo';
// import icons from "../../../utils/icons";

// const Project = styled.div`
//   padding: 2rem;
//   /* width: 70vw; */
//   font-size: 1.4rem;

//   box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
//   /* height: 25rem; */
//   /* margin-bottom: 5rem; */

//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(max-content, 1fr));
//   align-items: center;
//   align-content: center;
//   width: 100%;
//   grid-gap: 2rem;

//   .project {
//     &__title {
//       grid-column: 1 / 3;
//       grid-row: 1/ 2;
//       justify-self: start;
//       font-size: 3.5rem;
//       font-weight: 200;
//     }
//     &__type {
//       grid-column: 1/ 2;
//       grid-row: 2/ 3;
//     }
//     &__activity {
//       grid-column: 2 / 3;
//       grid-row: 2 / 3;
//     }

//     &__nations {
//       grid-row: 3 / 4;
//       grid-column: 1 / 3;
//       display: grid;
//       grid-column-gap: 2rem;
//       grid-template-columns: max-content max-content;
//       align-items: center;

//       /* padding: 2rem; */
//       /* justify-items: center; */
//       h4 {
//         grid-column: 1 / 3;
//         font-size: 1.8rem;
//         font-weight: 200;
//       }

//       &__country {
//         display: flex;
//         justify-content: space-between;

//         span {
//           margin-left: 2rem;
//           svg {
//             height: 2.5rem;
//             width: 2.5rem;
//             box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
//             path {
//               border: 1px solid ${(props) => props.theme.borderColorPrimary};
//             }
//           }
//         }
//       }
//     }
//     &__location {
//       grid-row: 4 / 5;
//       grid-column: 1 / 3;
//       display: flex;
//       svg {
//         height: 2.5rem;
//         width: 2.5rem;
//         margin-right: 1rem;
//       }
//     }
//     &__date {
//       grid-column: 5 / 6;
//       grid-row: 4/ 5;
//       text-align: end;
//     }

//     &__btn {
//       outline: none;
//       border: none;
//       border-radius: none;
//       grid-column: 5 / 6;
//       align-self: stretch;

//       font-size: 2rem;
//       background-color: ${(props) => props.theme.blue};
//       color: #fff;
//       /* background-image: linear-gradient(rgba(#549bf0, 93%)); */

//       transform: translateX(2rem) translateY(-2rem);
//     }
//   }

/* grid-template-rows: 80vh min-content 40vw repeat(3, min-content); */

/* 
  .project {
    &__title {
      text-align: center;
      font-size: 3rem;
    }

    &__details-wrapper {
      display: flex;
      justify-content: space-between;
      div {
        width: 50%;
        text-align: justify;
      }
    }
    &__location {
      display: flex;
      /* width: 400px; */
/* justify-content: start;
      align-items: center;
      font-size: 1.5rem;
      svg {
        width: 30px;
        height: 30px;
        margin: 2rem 0;
        margin-right: 1rem;
      }
    }
    &__date {
      font-style: italic;
    }

    &__right-panel {
      position: relative;
    } */
// `;

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
        img {
          width: 3rem;
          height: 1.8rem;
          margin-right: 1rem;
        }
      }
      h3 {
        font-size: 1.8rem;
        font-weight: 400;
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
`;

const ParticipatingCountires = styled.ul`
  /* margin: 1.5rem 0; */
  padding: 2rem;

  /* box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1); */
  /* width: fit-content; */

  /* grid-row: 1 / 2;
  grid-column: 4 / 6; */
  background: #f7f7f7;

  .participating-countries {
    &__country {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 250px;
      font-size: 1.3rem;
      /* vertical-align: center; */
      /* span {
        margin-right: 1rem;
        margin-top: 5px;

        svg {
          border: 0.3px solid ${(props) => props.theme.borderColorPrimary};
          width: 40px;
        }
      } */
    }
  }
`;

const ReadMore = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 2rem;
  border: none;
  color: ${(props) => props.theme.blue};
  outline: none;

  &:hover {
    color: #497ac9;
  }
`;

// const countriesList = (data) => {
//   console.log(data);
//   return (
//     data &&
//     data.map(({ name, numberOfParticipants }) => (
//       <li>
//         <p className="participating-countries__country">
//           {name}: {numberOfParticipants} participants
//           <span>{Icons[name.split(' ')[0]]}</span>
//         </p>
//       </li>
//     ))
//   );
// };

const SingleProject = (props) => {
  const {
    title,
    costs,
    projectType,
    location,
    nations,
    activity,
    date,
    id,
    startDate,
    endDate,
    savedProjectUserIds,
  } = props.project;
  const { userId } = props;
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
    <Project>
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
        <h3>Participating countires</h3>
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
            {
              /* <span>{Icons[name.split(' ')[0]]}</span> */
            }
          })}
        </div>
      </div>
      {/* <ParticipatingCountires> */}
      {/* <p className="participating-countries__title">Participating countires</p> */}
      {/* {countriesList(nations)} */}
      {/* </ParticipatingCountires> */}
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
        {isProjectSaved ? icons.SaveProjectFilled : icons.SaveProject}
      </button>
      <button className="project__btn project__btn-apply">Apply Now</button>
    </Project>
  );
};
export default SingleProject;
