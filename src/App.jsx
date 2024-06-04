import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ToDoList from "./components/ToDoList";
import Summary from "./components/Summary";

function App() {
  return (
    <>
      <Summary />
      <ToDoList />
    </>
  );
}

export default App;
