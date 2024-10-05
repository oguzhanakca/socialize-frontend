import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
