import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, styled } from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Memes from "./pages/Memes";
import Chatroom from "./pages/Chatroom";
import Register from "./components/Register";
import Login from "./components/Login";
import Authenticate from "./pages/Authenticate";
import Snakepage from "./pages/Snakepage";
import Ttt from "./pages/Ttt";
import RoomEntry from "./pages/RoomEntry";
import Profile from "./components/Profile";
import Memorygame from "./pages/Memorygame";
import Leaderboard from "./components/Leaderboard";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;
const Content = styled.div`
  flex: 1;
  overflow-y: auto;
`;

function PrivateRoute({ element, ...rest }) {
  // Use the currentUser from Redux to check if the user is logged in
  const { currentUser } = useSelector((state) => state.user);

  return currentUser ? element : <Navigate to="/login" />;
}

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <Router>
      {currentUser ? (
        <Container>
          <Navbar currentUser={currentUser} />
          <Content>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/memes"
                element={<PrivateRoute element={<Memes />} />}
              />
              <Route
                path="/memory"
                element={<PrivateRoute element={<Memorygame />} />}
              />
              <Route
                path="/chatroom"
                element={<PrivateRoute element={<RoomEntry />} />}
              />
              <Route
                path="/chat/:room"
                element={<PrivateRoute element={<Chatroom />} />}
              />
              <Route
                path="/snake"
                element={<PrivateRoute element={<Snakepage />} />}
              />
              <Route path="/ttt" element={<PrivateRoute element={<Ttt />} />} />
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Content>
        </Container>
      ) : (
        <Container>
          <Authenticate />
        </Container>
      )}
    </Router>
  );
}

export default App;
