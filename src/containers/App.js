import React, { Component } from "react";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import Rank from "../components/Rank";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import Profile from "../components/Profile/Profile";
import Modal from "../components/Modal/Modal";
import "./App.css";
import Particles from "react-particles-js";

const initialState = {
  input: "",
  imageURL: "",
  boxes: [],
  route: "signIn",
  loggedIn: false,
  isProfileOpen: false,
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

  calculateFaceLocations = data => {
    const faces = data.outputs[0].data.regions;
    const faceBoxes = faces.map(face => face.region_info.bounding_box);
    const image = document.getElementById("inputImage");
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    const boxes = faceBoxes.map(faceBox => ({
      leftCol: faceBox.left_col * imageWidth,
      topRow: faceBox.top_row * imageHeight,
      rightCol: imageWidth - faceBox.right_col * imageWidth,
      bottomRow: imageHeight - faceBox.bottom_row * imageHeight
    }));
    return boxes;
  };

  displayFaceBoxes = boxes => {
    this.setState({ boxes: boxes });
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
        this.displayFaceBoxes(this.calculateFaceLocations(response));
      })
      .catch(err => console.log(err));
  };

  onRouteChange = route => {
    if (route === "signOut") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ loggedIn: true });
    }
    this.setState({ route: route });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }));
  };

  render() {
    const { loggedIn, imageURL, route, boxes, isProfileOpen } = this.state;
    return (
      <div className="App">
        <Particles params={particleOptions} className="particles" />
        <div className="center">
          <div className="w-20">
            <Logo />
          </div>
          <div className="w-40" />
          <div className="w-40">
            <Navigation
              status={loggedIn}
              onRouteChange={this.onRouteChange}
              toggleModal={this.toggleModal}
            />
            {isProfileOpen && (
              <Modal>
                <Profile
                  isProfileOpen={isProfileOpen}
                  toggleModal={this.toggleModal}
                />
              </Modal>
            )}
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
            <FaceRecognition boxes={boxes} imageURL={imageURL} />
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