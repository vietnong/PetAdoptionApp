// replace Details.js
import { Component } from "react";
import Carousel from "./Carousel";
import ThemeContext from "./ThemeContext";

class Details extends Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  async componentDidMount() {
    const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=1`);
    const json = await res.json();
    this.setState(Object.assign({ loading: false }, json.pets[0]));
  }

  render() {
    console.log(this.state);
    // const { animal, breed, city, state, description, name, images } = this.state;

    if (this.state.loading) {
      return <h2>loading … </h2>;
    }

    const { animal, breed, city, state, images, description, name } =
      this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>

          <p>{description}</p>
        </div>
        <Carousel images={images} />
      </div>
    );
  }
}

export default Details;
