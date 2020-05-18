import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Icons from '../../utils/icons';

import OrganizationHeader from './OrganizationHeader';

const SINGLE_ORGANIZATION_QUERY = gql`
  query SINGLE_ORGANIZATION_QUERY($id: ID) {
    organization(where: { id: $id }) {
      name
      email
      projectsCreated {
        id
        title
        costs
        totalNumberOfParticipants
        projectType
        activity
        nations {
          name
          numberOfParticipants
        }
        location {
          address
        }
        description
        participants {
          id
          name
          email
        }
        applicants {
          id
          motivation
          expectations
          status
          applicant {
            id
            name
            email
          }
        }
      }
    }
  }
`;

const CHANGE_APPLICANT_STATUS_MUTATION = gql`
  mutation CHANGE_APPLICANT_STATUS_MUTATION(
    $userId: ID!
    $projectId: ID!
    $applicantId: ID!
    $status: String!
  ) {
    changeApplicantStatus(
      userId: $userId
      projectId: $projectId
      applicantId: $applicantId
      status: $status
    ) {
      status
      id
    }
  }
`;

const applicantStatus = ['PENDING', 'ACCEPTED', 'REJECTED'];

const OrganizationStyles = styled.div`
  .organization-details {
    display: flex;
    flex-direction: column;

    border-bottom: 1px solid #ccc;
    padding-bottom: 3rem;
    margin-bottom: 3rem;

    .organization-header {
      width: 80%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name-details {
        display: flex;
        align-items: center;
      }
      img {
        margin-right: 1.5rem;
      }
    }

    .organization-description {
      width: 80%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      text-align: justify;
      div {
        width: 45%;
      }
    }
  }

  .projects-title {
    text-align: center;
  }

  .project-details {
    .project-header {
      padding-bottom: 2rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;

      border-bottom: 1px solid #ccc;
    }
    .description {
      width: 60%;
      h5 {
        font-size: 1.5rem;
      }
      p {
        text-align: justify;
        font-size: 1.3rem;
      }
    }

    &__container {
      display: flex;
      justify-content: space-between;
      .location-date {
        p {
          font-style: italic;
          text-align: right;
          font-size: 1.2rem;
        }
      }
    }
  }

  .project-rightpanel {
    /* min-height: 80vh; */

    border: 1px solid #ccc;
    &__header {
      button {
        width: 50%;
        outline: none;
        padding: 2rem;
        border: none;
        border-bottom: 1px solid #ccc;
        color: white;
        background: ${(props) => props.theme.red};
        font-size: 1.3rem;
        font-weight: 200;
        &:first-of-type {
          border-right: 1px solid #ccc;
          background: ${(props) => props.theme.blue};
        }
      }
    }
  }

  .rightpanel-title {
    padding-top: 1rem;
    text-align: center;
  }

  /* width: 80%;
  margin: 0 auto; */
  ul {
    /* padding: 20px; */
  }
`;

const ApplicantStyles = styled.li`
  /* border: 1px solid gray; */
  padding: 1rem;
  margin: 1rem 0;
  /* width: 50rem; */

  .applicant-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: ${({ status }) =>
        status === 'ACCEPTED' ? 'green' : status === 'REJECTED' ? 'red' : 'orange'};
    }
  }
  .applicant-footer {
    padding-top: 2rem;
    display: flex;
    justify-content: space-between;
    img {
      width: 12rem;
    }
    .read-more {
      text-align: right;
      color: ${(props) => props.theme.blue};
    }
  }
`;

const ParticipantStyles = styled.li`
  padding: 1rem;
  margin: 1rem 0;
`;

const ParticipatingCountires = styled.ul`
  margin: 1.5rem 0;
  padding: 20px;
  /* border: 1px solid #ccc; */
  width: fit-content;

  .participating-countries {
    &__title {
      color: ${(props) => props.theme.blue};
      font-size: 1.5rem;
      padding-bottom: 1rem;
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

const countriesList = (data) => {
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

class Organization extends Component {
  state = {
    displayApplicants: false,
    displayParticipants: false,
    activeProject: null,
  };

  // handleDisplayPanel = panelToDisplay => {
  //   this.setState(({ panelToDisplay }) => ({ panelToDisplay: !panelToDisplay }));
  // };

  handleDisplayApplicants = (project) =>
    this.setState(({ displayApplicants }) => ({
      displayApplicants: !displayApplicants,
      displayParticipants: false,
      activeProject: project,
    }));

  handleDisplayParticipants = (project) =>
    this.setState(({ displayParticipants }) => ({
      displayParticipants: !displayParticipants,
      displayApplicants: false,
      activeProject: project,
    }));

  // andleClick = () => this.setState(({isOpened}) => ({ isOpened: !isOpened }));

  render() {
    const { id } = this.props;
    const { displayParticipants, displayApplicants, activeProject } = this.state;

    return (
      <Query query={SINGLE_ORGANIZATION_QUERY} variables={{ id }}>
        {({ data: { organization }, error, loading }) => {
          console.log(organization);
          const { name, email, projectsCreated } = organization;
          return (
            <OrganizationStyles>
              <OrganizationHeader name={name} email={email} />
              {/* <div>
                <h2 className="projects-title">Your currently active projects!</h2>
                <ul>
                  {projectsCreated.map((project) => (
                    <li>
                      <div className="project-details">
                        <div className="project-header">
                          <h4>{project.title}</h4>
                          <p>Type of project: {project.projectType}</p>
                        </div>
                        <div className="project-details__container">
                          <div className="description">
                            <h5>Project description</h5>
                            <p>{project.description}</p>
                          </div>
                          <ParticipatingCountires>
                            <h5 className="participating-countries__title">
                              Pariticipating Countries
                            </h5>
                            {countriesList(project.nations)}
                          </ParticipatingCountires>
                        </div>
                        <div className="project-details__container">
                          <div>
                            <h5>Costs</h5>
                            <p>{project.costs}</p>
                          </div>
                          <div className="location-date">
                            <p>Location: {project.location.address}</p>
                            <p>Start Date: 12/02/2020 - End Date: 12/02/2020</p>
                          </div>
                        </div>
                      </div>

                      <div className="project-rightpanel">
                        <div className="project-rightpanel__header">
                          <button onClick={() => this.handleDisplayApplicants(project)}>
                            Show Applicants
                          </button>
                          <button onClick={() => this.handleDisplayParticipants(project)}>
                            Show Participants
                          </button>
                        </div>
                        {displayApplicants && (
                          <>
                            {activeProject.id === project.id && (
                              <div>
                                <h3 className="rightpanel-title">Applications from participants</h3>
                                {activeProject.applicants.length ? (
                                  activeProject.applicants.map((applicant) => (
                                    <Applicant
                                      user={applicant}
                                      projectId={activeProject.id}
                                      key={applicant.id}
                                    />
                                  ))
                                ) : (
                                  <h4 className="rightpanel-title">There are no applicants yet.</h4>
                                )}
                              </div>
                            )}
                          </>
                        )}
                        {displayParticipants && (
                          <div>
                            {activeProject.id === project.id && (
                              <>
                                <h3 className="rightpanel-title">Accepted participants</h3>
                                <ul>
                                  {activeProject.participants.map((participant) => (
                                    <Participant participant={participant} key={activeProject.id} />
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </OrganizationStyles>
          );
        }}
      </Query>
    );
  }
}

class Applicant extends Component {
  state = { status: this.props.user.status };

  handleChange = (e, changeApplicantStatus) => {
    this.setState({ status: e.target.value }, () => changeApplicantStatus());
  };

  render() {
    const { status } = this.state;
    const { user, projectId } = this.props;
    console.log(user);
    return (
      <Mutation
        mutation={CHANGE_APPLICANT_STATUS_MUTATION}
        variables={{ status, applicantId: user.id, projectId, userId: user.applicant.id }}
        refetchQueries={[{ query: SINGLE_ORGANIZATION_QUERY }]}
      >
        {(changeApplicantStatus, { error, loading }) => (
          <ApplicantStyles status={status}>
            {error && <p>{error}</p>}
            <h4>Name: {user.applicant.name}</h4>
            <h4>Email: {user.applicant.email}</h4>
            <div className="applicant-status">
              <p>
                Status: <span>{status}</span>
              </p>
              <select value={status} onChange={(e) => this.handleChange(e, changeApplicantStatus)}>
                {applicantStatus.map((status) => (
                  <option value={status} label={status} />
                ))}
              </select>
            </div>
            <div className="applicant-footer">
              <img src="https://www.sunsource.com.mt/wp-content/uploads/2019/09/Download-PDF-Button.png" />
              <p className="read-more">Read more</p>
            </div>
          </ApplicantStyles>
        )}
      </Mutation>
    );
  }
}

const Participant = (props) => (
  <ParticipantStyles>
    <p>{props.participant.name}</p>
    <p>{props.participant.email}</p>
  </ParticipantStyles>
);

export default Organization;
