import React, { useState } from "react";
import styled from "styled-components";
import LogoImg from "../assets/images/frame.png";
import { Link as LinkR, NavLink } from "react-router-dom";
import { MenuRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const Nav = styled.div`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + 20};
`;

const NavContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLogo = styled(LinkR)`
  display: flex;
  align-items: center;
  gap: 16px;
  font-weight: 600;
  font-size: 18px;
  text-decoration: none;
  color: ${({ theme }) => theme.text_primary};
`;

const Logo = styled.img`
  height: 42px;
`;

const Mobileicon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 32px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }

  &.active {
    color: ${({ theme }) => theme.primary};
    border-bottom: 1.8px solid ${({ theme }) => theme.primary};
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TextButton = styled.div`
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const MobileMenu = styled.ul`
  display: none;
  flex-direction: column;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 12px 40px;
  background: ${({ theme }) => theme.bg};
  position: absolute;
  top: 80px;
  right: 0;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 1000;

  transform: ${({ $isOpen }) => ($isOpen ? "translateY(0)" : "translateY(-100%)")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Navbar = ({ currentUser }) => {
  const dispatch = useDispatch();
  const [$isOpen, set$isOpen] = useState(false);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/profile");
  };

  return (
    <Nav>
      <NavContainer>
        <Mobileicon onClick={() => set$isOpen(prev => !prev)}>
          <MenuRounded />
        </Mobileicon>
        <NavLogo to="/">
          <Logo src={LogoImg} />
          KTB
        </NavLogo>
        <NavItems>
          <Navlink to="/chatroom">Chatroom</Navlink>
          <Navlink to="/ttt">Tic Tac Toe</Navlink>
          <Navlink to="/snake">Fun Snake</Navlink>
          <Navlink to="/memory">Memory Match</Navlink>
          <Navlink to="/memes">Memes</Navlink>
        </NavItems>
        <MobileMenu $isOpen={$isOpen}>
          <Navlink to="/chatroom">Chatroom</Navlink>
          <Navlink to="/ttt">Tic Tac Toe</Navlink>
          <Navlink to="/snake">Fun Snake</Navlink>
          <Navlink to="/memory">Memory Match</Navlink>
          <Navlink to="/memes">Memes</Navlink>
        </MobileMenu>
        <UserContainer>
          <Avatar onClick={handleAvatarClick}>
            {currentUser.username ? currentUser.username[0] : ""}
          </Avatar>
          <TextButton onClick={() => dispatch(logout())}>Logout</TextButton>
        </UserContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
