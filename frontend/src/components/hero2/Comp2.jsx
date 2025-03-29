import React from 'react';
import './Comp2.css';
import image from "../../assets/Home-Images/3d-render-graduation-cap-with-diploma-certificate_107791-16842-removebg-preview.png";

function Comp2() {
    return (
        <section className="hr2-hero-section">
            <div className="hr2-hero-wrapper">
                <div className="hr2-hero-content">
                    <div className="hr2-hero-text">
                        <h1 className="hr2-hero-heading">
                            Before they sold out<br className="hr2-hero-line-break" />
                            readymade gluten
                        </h1>
                        <p className="hr2-hero-description">
                            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant
                            cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag
                            selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.
                        </p>
                        <div className="hr2-hero-button-group">
                            <button className="hr2-hero-primary-btn">Primary Action</button>
                        </div>
                    </div>
                    <div className="hr2-hero-image-container">
                        <img
                            src={image}
                            alt="Hero"
                            className="hr2-hero-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Comp2;