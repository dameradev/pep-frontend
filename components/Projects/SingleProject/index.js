import Link from 'next/link';
import styled from 'styled-components';
import Icons from '../../../utils/icons';
// import icons from "../../../utils/icons";

const Project = styled.div`
  /* border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
   */
  /* border-radius: 20px */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 7px;

  text-align: left;
  padding: 10px 30px;
  color: #151515;
  /* width: 70%; */
  margin: 2rem auto;

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
      justify-content: start;
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
    }
  }
`;

const ParticipatingCountires = styled.ul`
  margin: 1.5rem 0;
  padding: 20px;
  border: 1px solid #ccc;
  width: fit-content;

  .participating-countries {
    &__title {
      color: ${props => props.theme.blue};
      font-size: 1.5rem;
    }

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
          border: 0.3px solid #ccc;
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
  color: ${props => props.theme.blue};
  outline: none;

  &:hover {
    color: #497ac9;
  }
`;

const countriesList = data => {
  console.log(data);
  return (
    data &&
    data.map(({ name, numberOfParticipants }) => (
      <li>
        <p className="participating-countries__country">
          <span>{Icons[name.split(' ')[0]]}</span>
          {name}: {numberOfParticipants} participants
        </p>
      </li>
    ))
  );
};

const SingleProject = props => {
  const { title, costs, projectType, location, nations, activity, date, id } = props.project;
  console.log(props.project);
  return (
    <Project>
      <Link href={{ pathname: '/project', query: { id } }}>
        <a className="project__details">
          <h2 className="project__title">{title}</h2>
          <div className="project__details-wrapper">
            <div>
              <h3>Type of project: {projectType && projectType.split('_').join(' ')}</h3>
              <h3>Activity: {activity && activity.split('_').join(' ')}</h3>
              <ParticipatingCountires>
                <p className="participating-countries__title">Participating countires</p>
                {countriesList(nations)}
              </ParticipatingCountires>
              <p className="project__location">
                {Icons.Location} Location: {location && location.address}
              </p>
              <p className="project__date">Starting date: 12/02/2020</p>
            </div>
            <div className="project__right-panel">
              <h3>Covered costs by erasmus!</h3>
              {costs}
              <ReadMore>Read More</ReadMore>
            </div>
          </div>
        </a>
      </Link>
    </Project>
  );
};
export default SingleProject;
