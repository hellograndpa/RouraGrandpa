/** @format */

import React, { Component } from 'react';

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
    const { edition } = this.state;
    return (
      <div>
        {!edition && (
          <>
            <button onClick={this.handleEdition}> Edit Elder </button>
            <User>
              {({ data: { me } }) => {
                if (me)
                  return (
                    <div>
                      <div>
                        <p>Id: {me.id}</p>
                        <p>Name: {me.name}</p>
                        <p>Last Name: {me.lastname}</p>
                        <p>Type User: {me.typeUser.typeName}</p>
                        <p>Phone: {me.phone}</p>
                        <p>Email: {me.email}</p>
                      </div>
                      <div>
                        <UserDataViewContainer me={me} />
                      </div>
                    </div>
                  );
                return null;
              }}
            </User>
          </>
        )}
        {edition && (
          <>
            <button onClick={this.handleEdition}>
              {' '}
              Cerrar edición de perfil{' '}
            </button>
            <ElderEdit />
          </>
        )}
      </div>
    );
  }
}

export default Elder;
