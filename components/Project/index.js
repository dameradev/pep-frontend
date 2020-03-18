import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ButtonStyles from '../styles/ButtonStyled';
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
  width: 80%;
  margin: 0 auto;
`;

class Project extends Component {
  state = {
    formDisplay: false,
    motivation: '',
    expectations: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id } = this.props;
    const { formDisplay, motivation, expectations } = this.state;

    return (
      <Query query={SINGLE_PROJECT_QUERY} variables={{ id }}>
        {({ data, error, loading }) => {
          const {
            title,
            description,
            costs,
            totalNumberOfParticipants,
            projectType,
            activity,
            nations,
            location,
            user,
            participants
          } = data.project;
          console.log(data.project);
          return (
            <ProjectStyles>
              <h1>{title}</h1>
              <p>{description}</p>
              <p>{costs}</p>
              <p>{totalNumberOfParticipants}</p>
              <p>{projectType}</p>
              <p>{activity}</p>
              {nations.map(nation => (
                <div>
                  <h4>{nation.name}</h4>
                  <p>Number of participants: {nation.numberOfParticipants}</p>
                </div>
              ))}
              <p>{location.address}</p>
              <h3>
                {user.name}, {user.email}
              </h3>
              <ButtonStyles
                btnColor="#0394fc"
                color="black"
                background="#8aceff"
                onClick={() => this.setState({ formDisplay: true })}
              >
                Apply
              </ButtonStyles>
              {formDisplay && (
                <Mutation
                  mutation={APPLY_FOR_PROJECT_MUTATION}
                  variables={{ motivation, expectations, projectId: id }}
                >
                  {(applyForProject, { error, loading }) => (
                    <Form
                      onSubmit={async e => {
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
          );
        }}
      </Query>
    );
  }
}

export default Project;
