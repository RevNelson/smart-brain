import React, { Component } from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import "./App.css";
import Particles from "react-particles-js";
import "tachyons";

const initialState = {
  input: "",
  imageURL: "",
  box: [],
  route: "signIn",
  loggedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

const particleOptions = {
  particles: {
    number: {
      value: 42
    },
    opacity: {
      value: 0.3,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.2,
      width: 1
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol: faceBox.left_col * imageWidth,
      topRow: faceBox.top_row * imageHeight,
      rightCol: imageWidth - faceBox.right_col * imageWidth,
      bottomRow: imageHeight - faceBox.bottom_row * imageHeight,
      loggedIn: false
    };
  };

  displayFaceBox = box => {
    this.setState({ box: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch(process.env.REACT_APP_NODE_SERVER + "/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(process.env.REACT_APP_NODE_SERVER + "/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(err => console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signOut") {
      console.log("Signing Out");
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ loggedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { loggedIn, imageURL, route, box } = this.state;
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <div className="center">
          <div className="w-20">
            <Logo />
          </div>
          <div className="w-40" />
          <div className="w-40">
            <Navigation status={loggedIn} onRouteChange={this.onRouteChange} />
          </div>
        </div>
        {route === "home" ? (
          <div>
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
        ) : route === "signIn" || route === "signOut" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;