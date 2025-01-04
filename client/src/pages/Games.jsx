// src/components/Games.jsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../styles/gameStyles.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import snake from '../assets/images/fun_image.jpg';
import ttt from '../assets/images/tic_tac_toe.jpg';
import piano from '../assets/images/piano.jpg';

// // Styled components for layout
// const Header = styled.header`
//   position: absolute;
//   width: 100%;
// `;

// const Nav = styled.nav`
//   background-color: white;
//   border-bottom: 1px solid gray;
//   padding: 0.5rem;
// `;

// const NavContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 1rem;
// `;

// const Logo = styled.img`
//   height: 2rem;
//   margin-right: 1rem;
// `;

// const Title = styled.h1`
//   font-weight: 700;
//   font-size: larger;
// `;

// const CardContainer = styled.section`
//   background-color: white;
//   padding: 2rem 1rem;
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1rem;
//   justify-content: center;
// `;

// const Card = styled.div`
//   width: 100%;
//   max-width: 300px;
//   border: 1px solid gray;
//   border-radius: 8px;
//   overflow: hidden;
//   text-align: center;
// `;

// const CardImage = styled.img`
//   width: 100%;
//   height: auto;
// `;

// const CardHeader = styled.div`
//   padding: 1rem;
//   background-color: #f9f9f9;
// `;



const Games = () => {
  return (
    <>
      
      <section className="bg-white dark:bg-gray-900">
        <div className="grid-container">
          <div className="col-sm-4">
            <Link to="/snake">
              <div className="card">
                <div className="image">
                  <img src={snake} />
                </div>
                <div className="card-inner">
                  <div className="header">
                    <h2>Fun Snake</h2>
                  </div>
                </div>
              </div>   
              </Link>         
          </div>
          <div className="col-sm-4">
            <Link to='/ttt'>
              <div className="card">
                <div className="image">
                  <img src={ttt} />
                </div>
                <div className="card-inner">
                  <div className="header">
                    <h2>Tic Tac Toe</h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-sm-4">
            <Link to='/piano'>
              <div className="card">
                <div className="image">
                  <img src={piano} />
                </div>
                <div className="card-inner">
                  <div className="header">
                    <h2>Piano</h2>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
 
    </>
  );
};

export default Games;
