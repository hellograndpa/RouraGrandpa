/** @format */

import React, { Component } from 'react';

import { Query } from 'react-apollo';
import ElderView from './ElderView.component';
import ElderEdit from './ElderEdit.component';

import { SINGLE_USERGRANDPA_QUERY } from './ElderView.component';

class Elder extends Component {
  state = {
    edition: false,
  };
  handleEdition = () => {
    this.setState({
      edition: !this.state.edition,
    });
  };

  render() {
    const { id } = this.props;
    const { edition } = this.state;
    return (
      <div>
        {!edition ? (
          <ElderView id={id} action={this.handleEdition} />
        ) : (
          <Query
            query={SINGLE_USERGRANDPA_QUERY}
            variables={{
              id: this.props.id,
            }}>
            {({ data, loading, error }) => {
              if (error) return <Error error={error} />;
              if (loading) return <p>Loading...</p>;
              if (!data.userGrandpa)
                return <p>No Item Found for {this.props.id} </p>;
              return (
                <ElderEdit
                  id={id}
                  action={this.handleEdition}
                  userGrandpa={data.userGrandpa}
                />
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default Elder;
