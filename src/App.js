import React from "react";
import "./App.css";
import NewDog from "./components/newDog/newDog";
import DogGallery from "./components/viewDogs/dogsGallery";
function App() {
  return (
    <div>
      <NewDog />
      {/* <DogGallery /> */}
    </div>
  );
}

export default App;
