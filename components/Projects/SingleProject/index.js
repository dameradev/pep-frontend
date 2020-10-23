import Link from 'next/link';
import styled from 'styled-components';
import Icons from '../../../utils/icons';
// import icons from "../../../utils/icons";

const Project = styled.div`
  padding: 2rem;
  /* width: 70vw; */
  font-size: 1.4rem;

  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
  /* height: 25rem; */
  /* margin-bottom: 5rem; */

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(max-content, 1fr));
  align-items: center;
  align-content: center;
  width: 100%;
  grid-gap: 2rem;

  .project {
    &__title {
      grid-column: 1 / 3;
      grid-row: 1/ 2;
      justify-self: start;
      font-size: 3.5rem;
      font-weight: 200;
    }
    &__type {
      grid-column: 1/ 2;
      grid-row: 2/ 3;
    }
    &__activity {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }

    &__nations {
      grid-row: 3 / 4;
      grid-column: 1 / 3;
      display: grid;
      grid-column-gap: 2rem;
      grid-template-columns: max-content max-content;
      align-items: center;

      /* padding: 2rem; */
      /* justify-items: center; */
      h4 {
        grid-column: 1 / 3;
        font-size: 1.8rem;
        font-weight: 200;
      }

      &__country {
        display: flex;
        justify-content: space-between;

        span {
          margin-left: 2rem;
          svg {
            height: 2.5rem;
            width: 2.5rem;
            box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1);
            path {
              border: 1px solid ${(props) => props.theme.borderColorPrimary};
            }
          }
        }
      }
    }
    &__location {
      grid-row: 4 / 5;
      grid-column: 1 / 3;
      display: flex;
      svg {
        height: 2.5rem;
        width: 2.5rem;
        margin-right: 1rem;
      }
    }
    &__date {
      grid-column: 5 / 6;
      grid-row: 4/ 5;
      text-align: end;
    }

    &__btn {
      outline: none;
      border: none;
      border-radius: none;
      grid-column: 5 / 6;
      align-self: stretch;

      font-size: 2rem;
      background-color: ${(props) => props.theme.blue};
      color: #fff;
      /* background-image: linear-gradient(rgba(#549bf0, 93%)); */

      transform: translateX(2rem) translateY(-2rem);
    }
  }

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
`;

const ParticipatingCountires = styled.ul`
  /* margin: 1.5rem 0; */
  padding: 2rem;

  /* box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.1); */
  /* width: fit-content; */

  grid-row: 1 / 2;
  grid-column: 4 / 6;
  .participating-countries {
    &__country {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 250px;
      font-size: 1.3rem;
      /* vertical-align: center; */
      span {
        margin-right: 1rem;
        margin-top: 5px;

        svg {
          border: 0.3px solid ${(props) => props.theme.borderColorPrimary};
          width: 40px;
        }
      }
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

const countriesList = (data) => {
  console.log(data);
  return (
    data &&
    data.map(({ name, numberOfParticipants }) => (
      <li>
        <p className="participating-countries__country">
          {name}: {numberOfParticipants} participants
          <span>{Icons[name.split(' ')[0]]}</span>
        </p>
      </li>
    ))
  );
};

const SingleProject = (props) => {
  const { title, costs, projectType, location, nations, activity, date, id } = props.project;
  console.log(props.project);
  return (
    <Project>
      <Link href={{ pathname: '/project', query: { id } }}>
        <a className="project__title">{title}</a>
      </Link>

      <h3 className="project__type">
        Type of project: {projectType && projectType.split('_').join(' ')}
      </h3>
      <h3 className="project__activity">Activity: {activity && activity.split('_').join(' ')}</h3>
      <div className="project__nations">
        <h4>Participating countires</h4>
        {nations.map(({ name, numberOfParticipants }) => (
          <div className="project__nations__country">
            {name}: {numberOfParticipants} participants
            <span>{Icons[name.split(' ')[0]]}</span>
          </div>
        ))}
      </div>
      {/* <ParticipatingCountires> */}
      {/* <p className="participating-countries__title">Participating countires</p> */}
      {/* {countriesList(nations)} */}
      {/* </ParticipatingCountires> */}
      <p className="project__location">
        {Icons.Location} Location: {location && location.address}
      </p>
      <div className="project__date">Start date: 12/02/2020 - End date: 12/02/2020</div>

      <button className="project__btn">Apply Now</button>
    </Project>
  );
};
export default SingleProject;
