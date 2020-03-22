import React from "react";
import "./dogCard.css";
import CardHeader from "./cardHeader";
import CardBody from "./cardBody";
class DogCard extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    fetch("https://dog.ceo/api/breeds/image/random")
      .then(response => response.json())
      .then(data => this.setState({ imageSrc: data.message }));
  }
  render() {
    return (
      <article className="card">
        <CardHeader
          category={this.props.details.category}
          image={this.props.details.image}
        />
        <CardBody
          title={this.props.details.title}
          text={this.props.details.text}
        />
      </article>
    );
  }
}
export default DogCard;
