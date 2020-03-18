import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SINGLE_ORGANIZATION_QUERY = gql`
  query SINGLE_ORGANIZATION_QUERY($id: ID) {
    organization(where: { id: $id }) {
      name
      email
      projectsCreated {
        id
        title
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

class Organization extends Component {
  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_ORGANIZATION_QUERY} variables={{ id }}>
        {({ data: { organization }, error, loading }) => {
          console.log(organization);
          const { name, email, projectsCreated } = organization;
          return (
            <div>
              <h1>
                {name}, {email}
              </h1>
              <div>
                <h2>Your currently active projects!</h2>
                <ul>
                  {projectsCreated.map(project => (
                    <li>
                      <h4>{project.title}</h4>
                      <h3>Applications from participants</h3>
                      <ul>
                        {project.applicants.map(applicant => (
                          <Applicant user={applicant} projectId={project.id} key={applicant.id} />
                        ))}
                      </ul>
                      <ul>
                        <h3>Accepted participants:</h3>
                        {project.participants.map(participant => (
                          <Participant participant={participant} key={participant.id} />
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
          <li>
            {error && <p>{error}</p>}
            <h4>
              {user.applicant.name}, {user.applicant.email}{' '}
            </h4>
            <p>Motivation letter: {user.motivation}</p>
            <p>Expectations from project: {user.expectations}</p>
            <div>
              <p>Status: {status}</p>
              <select value={status} onChange={e => this.handleChange(e, changeApplicantStatus)}>
                {applicantStatus.map(status => (
                  <option value={status} label={status} />
                ))}
              </select>
            </div>
          </li>
        )}
      </Mutation>
    );
  }
}

const Participant = props => (
  <li>
    <p>{props.participant.name}</p>
    <p>{props.participant.email}</p>
  </li>
);

export default Organization;
