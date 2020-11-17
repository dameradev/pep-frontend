import React from 'react';

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

class Applicant extends Component {
  state = { status: this.props.user.status };

  handleChange = (e, changeApplicantStatus) => {
    this.setState({ status: e.target.value }, () => changeApplicantStatus());
  };

  render() {
    const { status } = this.state;
    const { user, projectId } = this.props;
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
