import React from "react";
import "./gallery.css";
import DogCard from "./dogCard";
import { MDBRow } from "mdbreact";
//Temporarily store data here
const PostsData = [
  {
    category: "Balu",
    title: "CNN Acquire BEME",
    text: "CNN purchased Casey Neistat's Beme app for $25million.",
    image:
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=1440"
  },
  {
    category: "Travel",
    title: "Nomad Lifestyle",
    text: "Learn our tips and tricks on living a nomadic lifestyle",
    image:
      "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=2048"
  },
  {
    category: "Development",
    title: "React and the WP-API",
    text: "The first ever decoupled starter theme for React & the WP-API",
    image:
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=1440"
  },
  {
    category: "News",
    title: "CNN Acquire BEME",
    text: "CNN purchased Casey Neistat's Beme app for $25million.",
    image:
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=1440"
  },
  {
    category: "Travel",
    title: "Nomad Lifestyle",
    text: "Learn our tips and tricks on living a nomadic lifestyle",
    image:
      "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=2048"
  },
  {
    category: "Development",
    title: "React and the WP-API",
    text: "The first ever decoupled starter theme for React & the WP-API",
    image:
      "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=2048"
  },
  {
    category: "News",
    title: "CNN Acquire BEME",
    text: "CNN purchased Casey Neistat's Beme app for $25million.",
    image:
      "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/HB4AT3D3IMI6TMPTWIZ74WAR54.jpg&w=1440"
  },
  {
    category: "Travel",
    title: "Nomad Lifestyle",
    text: "Learn our tips and tricks on living a nomadic lifestyle",
    image:
      "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=2048"
  },
  {
    category: "Development",
    title: "React and the WP-API",
    text: "The first ever decoupled starter theme for React & the WP-API",
    image:
      "https://d17fnq9dkz9hgj.cloudfront.net/breed-uploads/2018/09/dog-landing-hero-lg.jpg?bust=1536935129&width=2048"
  }
];

// Start App

class Main extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: {}
    };
  }
  componentWillMount() {
    this.setState({
      posts: PostsData
    });
  }

  render() {
    return (
      <div>
        <MDBRow className="mt-5">
          {Object.keys(this.state.posts).map(key => (
            <DogCard key={key} index={key} details={this.state.posts[key]} />
          ))}
        </MDBRow>
      </div>
    );
  }
}

export default Main;
