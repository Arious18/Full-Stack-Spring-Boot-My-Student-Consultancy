import React from 'react';
import './LogoCarusel.css';

import logo from '../../assets/BrandLogo.png';

const logos = [
    { id: 1, name: 'Logo 1', link: '#', image: logo },
    { id: 2, name: 'Logo 2', link: '#', image: logo },
    { id: 3, name: 'Logo 3', link: '#', image: logo },
    { id: 4, name: 'Logo 4', link: '#', image: logo },
    { id: 5, name: 'Logo 5', link: '#', image: logo },
    { id: 6, name: 'Logo 6', link: '#', image: logo },
    { id: 7, name: 'Logo 7', link: '#', image: logo },
    { id: 8, name: 'Logo 8', link: '#', image: logo },
    { id: 9, name: 'Logo 9', link: '#', image: logo },
    { id: 10, name: 'Logo 10', link: '#', image: logo },
    { id: 11, name: 'Logo 11', link: '#', image: logo },
    { id: 12, name: 'Logo 12', link: '#', image: logo },
    { id: 20, name: 'Logo 20', link: '#', image: logo }
];

function LogoCarousel() {
    return (
        <div className="lcr-logo-carousel">
            <div className="lcr-logo-track">
                {[...logos, ...logos].map((logo, index) => (
                    <a
                        key={`${logo.id}-${index}`} // Ensures uniqueness
                        href={logo.link}
                        className="lcr-logo-item"
                    >
                        <div className="lcr-logo-wrapper">
                            <img
                                src={logo.image}
                                alt={logo.name}
                                className="lcr-logo-image"
                            />
                        </div>
                        <h2 className="lcr-logo-title">{logo.name}</h2>
                    </a>
                ))}

                ))
            </div>
        </div>
    );
}

export default LogoCarousel;