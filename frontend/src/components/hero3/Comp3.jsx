import React from 'react';
import './Comp3.css';
import image from "../../assets/Home-Images/3d-render-graduation-cap-with-diploma-certificate_107791-16842-removebg-preview.png";

function Comp3() {
    return (
        <section className="h3-hero-section">
            <div className="h3-hero-wrapper">
                <div className="h3-hero-content">
                    {/* Image container moved first */}
                    <div className="h3-hero-image-container">
                        <img
                            src={image}
                            alt="Hero"
                            className="h3-hero-image"
                        />
                    </div>
                    {/* Text content moved after image */}
                    <div className="h3-hero-text">
                        <h1 className="h3-hero-heading">
                            Before they sold out<br className="h3-hero-line-break" />
                            readymade gluten
                        </h1>
                        <p className="h3-hero-description">
                            Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant
                            cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag
                            selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.
                        </p>
                        <div className="h3-hero-button-group">
                            <button className="h3-hero-primary-btn">Primary Action</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Comp3;