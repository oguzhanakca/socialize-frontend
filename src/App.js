import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUpForm from "./pages/auth/SignUpForm";
import { Container } from "react-bootstrap";
import "./api/axiosDefaults";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<h1>Sign In</h1>} />
          <Route path="*" element={<p1>Page Not Found</p1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
