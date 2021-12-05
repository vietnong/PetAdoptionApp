import { PetAPIResponse, Animal } from "./APIResponsesTypes";
import { Component, lazy } from "react";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";
// import Modal from "./Modal";

const Modal = lazy(() => import("./Modal"));

class Details extends Component {
  state = {
    loading: true,
    showModal: false,
    animal: "",
    breed: "",
    city: "",
    state: "",
    description: "",
    name: "",
    images: [] as string[],
  };

  async componentDidMount() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=1`);
    const json = (await res.json()) as PetAPIResponse;
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  toggleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };
  adopt = () => (window.location.href = "http://bit.ly/pet-adopt");

  render() {
    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, images, description, name, showModal } =
      this.state;

    return (
      <div className="p-10 mb-10">
        <div className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center">
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
                className="rounded px-6 py-2 color text-white hover:opacity-50 border-none"
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
