import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="flex">
        <img src={images[active]} alt="animal" />
        <div className="ml-4">
          <div className="grid gap-4 grid-cols-1 grid-cols-4 ">
            {images.map((photo, index) => (
              // eslint-disable-next-line
              <img
                key={photo}
                src={photo}
                alt="animal thumbnail"
                onClick={this.handleIndexClick}
                data-index={index}
                className={`rounded-full ${
                  index === active ? "" : "opacity-70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
