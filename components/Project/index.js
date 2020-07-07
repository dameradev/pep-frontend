import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Form from '../styles/Form';

import Error from '../ErrorMessage';

const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: ID!) {
    project(where: { id: $id }) {
      title
      description
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
      user {
        name
        email
      }
      # participants {
      #   name
      # }
    }
  }
`;

const APPLY_FOR_PROJECT_MUTATION = gql`
  mutation APPLY_FOR_PROJECT_MUTATION(
    $motivation: String!
    $expectations: String!
    $projectId: ID!
  ) {
    applyForProject(motivation: $motivation, expectations: $expectations, projectId: $projectId) {
      id
    }
  }
`;

const ProjectStyles = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns:
    [full-start]
    minmax(6rem, 1fr) [center-start]repeat(8, [col-start] minmax(min-content, 18rem) [col-end])
    [center-end] minmax(6rem, 1fr) [full-end];
  grid-gap: 3rem;
  .project {
    &__details {
      padding: 3rem;

      grid-column: center-start / col-end 6;

      border-radius: 5px;
      background: #fff;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
      border: 1px solid ${(props) => props.theme.borderColorPrimary};
      color: ${(props) => props.theme.darkGrey1};
    }

    &__header {
      margin: -3rem;
      padding: 3rem;
      h1 {
        line-height: 5rem;
        font-weight: 400;
      }
      p {
        font-size: 1.8rem;
        color: ${(props) => props.theme.lightGrey1};
      }
      border-bottom: 1px solid ${(props) => props.theme.borderColorPrimary};
    }

    &__description,
    &__costs {
      margin-top: 4rem;
      text-align: justify;

      h2 {
        font-weight: 400;
        padding: 2rem 0;

        /* font-size: 2.2rem; */
      }
    }
    &__costs {
      margin-top: 0;
    }

    &__nations {
      margin-top: 3rem;
    }

    &__totalParticipants {
      display: flex;
      align-items: center;
      font-size: 2rem;
      padding-bottom: 1rem;
      h3 {
        margin-right: 2rem;
        font-weight: 400;
      }
    }

    &__countries-table {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

      h4 {
        font-size: 2rem;
        font-weight: 500;
      }
      p {
        font-weight: 400;
        color: ${(props) => props.theme.lightGrey1};
      }
    }

    &__organization {
      grid-column: col-start 7 / center-end;
      border-radius: 5px;
      background: #fff;
      box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.1);
      border: 1px solid ${(props) => props.theme.borderColorPrimary};
      color: ${(props) => props.theme.darkGrey1};
      height: max-content;

      & > * {
        padding: 0 3rem;
      }

      .description {
        font-size: 1.4rem;
        margin: 1rem 0;
      }

      .buttons-container {
        margin-top: 2rem;
        width: 100%;
        padding: 0;
        button {
          width: 50%;
          padding: 2rem 3.5rem;
          font-size: 2rem;
          outline: none;
          border: none;
          color: #fff;
          cursor: pointer;
          border-bottom-left-radius: 5px;

          background: ${(props) => props.theme.blue};
          &:not(:first-of-type) {
            background: ${(props) => props.theme.red};
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 5px;
          }
        }
      }
    }
  }
`;

class Project extends Component {
  state = {
    formDisplay: false,
    motivation: '',
    expectations: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id } = this.props;
    const { formDisplay, motivation, expectations } = this.state;

    return (
      <Query query={SINGLE_PROJECT_QUERY} variables={{ id }}>
        {({ data: { project } = {}, error, loading }) => {
          return project ? (
            <ProjectStyles>
              <div className="project__details">
                <div className="project__header">
                  <h1>{project.title}</h1>
                  <p>{project.projectType.split('_').join(' ')}</p>
                </div>
                <div className="project__description">
                  <h2>Description</h2>
                  <p>{project.description}</p>
                </div>

                <div className="project__costs">
                  <h2>This project relates to</h2>
                  <p>{project.costs}</p>
                </div>
                {/* <p>{project.activity}</p> */}

                <div className="project__nations">
                  <div className="project__totalParticipants">
                    <h3>Total number of participants</h3>
                    <p>{project.totalNumberOfParticipants}</p>
                  </div>
                  <div className="project__countries-table">
                    {project.nations.map((nation) => (
                      <div>
                        <h4>{nation.name}</h4>
                        <p>Spots left: {nation.numberOfParticipants}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p>{project.location && project.location.address}</p>
              </div>
              <div className="project__organization">
                <h1>{project.user.name}</h1>
                <p className="description">
                  yEUth is seated in the beautiful city of Leiden, a city full of young people and
                  students which is actually the target group of our work: Youth Empowerment.
                </p>
                <p>Contact Person: Dame Radev</p>
                <p>{project.user.email}</p>

                <div className="buttons-container">
                  <button>Apply</button>
                  <button>View Profile</button>
                </div>
              </div>
              {/* <ButtonStyles
                btnColor="#0394fc"
                color="black"
                background="#8aceff"
                onClick={() => this.setState({ formDisplay: true })}
              >
                Apply
              </ButtonStyles> */}
              {formDisplay && (
                <Mutation
                  mutation={APPLY_FOR_PROJECT_MUTATION}
                  variables={{ motivation, expectations, projectId: id }}
                >
                  {(applyForProject, { error, loading }) => (
                    <Form
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const res = await applyForProject();

                        console.log(res);
                        this.setState({ expectations: '', motivation: '' });
                      }}
                    >
                      >
                      <fieldset>
                        {error && <Error error={error} />}
                        <label htmlFor="motivation">
                          <h3>Motivation letter</h3>
                          <textarea
                            type="motivation"
                            name="motivation"
                            id="motivation"
                            placeholder="Enter here what motivaties you to join this project"
                            onChange={this.handleChange}
                          >
                            {motivation}
                          </textarea>
                        </label>
                        <label htmlFor="expectations">
                          <h3>Project expectations</h3>
                          <textarea
                            type="expectations"
                            name="expectations"
                            id="expectations"
                            placeholder="What do you expect to gain from this project"
                            onChange={this.handleChange}
                          >
                            {expectations}
                          </textarea>
                        </label>
                        <button type="submit">Submit Application</button>
                      </fieldset>
                    </Form>
                  )}
                </Mutation>
              )}
            </ProjectStyles>
          ) : (
            'Loading..'
          );
        }}
      </Query>
    );
  }
}

export default Project;
