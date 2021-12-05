import { Component, ReactNode, MouseEvent } from "react";

interface IProps {
  images: string[];
}

class Carousel extends Component<IProps> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event: MouseEvent<HTMLElement>): void => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }
    if (event.target.dataset.index) {
      this.setState({
        active: +event.target.dataset.index,
      });
    }
  };

  render(): ReactNode {
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
