// replace Details.js
import { Component } from "react";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
import Modal from "./Modal";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true, showModal: false };
  }

  async componentDidMount() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=1`);
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  adopt = () => (window.location = "http://bit.ly/pet-adopt");

  render() {
    console.log(this.state);
    // const { animal, breed, city, state, description, name, images } = this.state;

    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, images, description, name, showModal } =
      this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>No</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
        <Carousel images={images} />
      </div>
    );
  }
}

export default Details;