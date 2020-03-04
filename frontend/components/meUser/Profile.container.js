import React, { Component } from 'react';
import User from './UserMe.component';
import ProfileEdit from './ProfileEdit.component';

class Profile extends Component {
  state = {
    edition: false
  };
  handleEdition = () => {
    this.setState({
      edition: !this.state.edition
    });
  };

  render() {
    const { edition } = this.state;
    return (
      <div>
        {!edition && (
          <>
            <button onClick={this.handleEdition}> Edit profile </button>
            <User>
              {({ data: { me } }) => {
                if (me)
                  return (
                    <div>
                      <p>Id: {me.id}</p>
                      <p>Name: {me.name}</p>
                      <p>Last Name: {me.lastname}</p>
                      <p>Type User: {me.typeUser.typeName}</p>
                      <p>Phone: {me.phone}</p>
                      <p>Email: {me.email}</p>
                    </div>
                  );
                return null;
              }}
            </User>
          </>
        )}
        {edition && (
          <div>
            <button onClick={this.handleEdition}> save profile </button>
            <ProfileEdit />
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
