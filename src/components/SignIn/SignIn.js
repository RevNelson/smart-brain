<<<<<<< HEAD
import React from 'react';
import './SignIn.css';
=======
import React from "react";
>>>>>>> 40fcaa653cf46fd016c7d12de2ec39dad1a4e4dd

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  saveAuthTokenInSession = token => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmit = () => {
    fetch(process.env.REACT_APP_NODE_SERVER + "/signin", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.userID && data.success === "true") {
          this.saveAuthTokenInSession(data.token);
          if (data && data.userID) {
            fetch(`${process.env.REACT_APP_NODE_SERVER}/profile/${data.userID}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                "Authorization": data.token
              }
            })
              .then(resp => resp.json())
              .then(user => {
                if (user && user.email) {
                  this.props.loadUser(user);
                  this.props.onRouteChange("home");
                }
              });
          }
        }
      });
  };

<<<<<<< HEAD
    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--gray dark-gray mv4 w-100 w-50-m w-25-l mw6 center">
                <main className="pa4 gray">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-black hover-bg-black hover-white w-100"
                                       type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba hover-black bg-transparent hover-bg-black hover-white w-100"
                                       type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                        </fieldset>
                        <div className="">
                            <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit" onClick={this.onSubmit}>Sign In</button>
                        </div>
                        <div className='lh-copy mt3'>
                            <p className='f6 link dim gray db pointer' onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
=======
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="br3 ba b--gray dark-gray mv4 w-100 w-50-m w-25-l mw6 center">
        <main className="pa4 gray">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <label className="pa0 ma0 lh-copy f6 pointer">
                <input type="checkbox" /> Remember me
              </label>
            </fieldset>
            <div className="">
              <button
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                onClick={this.onSubmit}
              >
                Sign In
              </button>
            </div>
            <div className="lh-copy mt3">
              <p
                className="f6 link dim gray db pointer"
                onClick={() => onRouteChange("register")}
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
>>>>>>> 40fcaa653cf46fd016c7d12de2ec39dad1a4e4dd
}

export default SignIn;