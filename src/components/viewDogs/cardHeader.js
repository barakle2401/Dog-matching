import React from "react";
import "./gallery.css";
class CardHeader extends React.Component {
  render() {
    const { image, category } = this.props;
    var style = {
      backgroundImage: "url(" + image + ")"
    };
    return (
      <header style={style} className="card-dog-header">
        <h4 className="card-dog-header--title">{category}</h4>
      </header>
    );
  }
}
export default CardHeader;
