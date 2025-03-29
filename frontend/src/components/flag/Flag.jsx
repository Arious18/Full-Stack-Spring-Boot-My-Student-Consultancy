import React from 'react';
import './flag.css';
import image from '../../assets/Home-Images/TKM_Flag.png';

const servicesData = [
    {
        id: 1,
        title: 'Service 1',
        description: 'Short description of Service 1',
        image: image
    },
    {
        id: 2,
        title: 'Service 2',
        description: 'Short description of Service 2',
        image: image
    },
    {
        id: 3,
        title: 'Service 3',
        description: 'Short description of Service 3',
        image: image
    },
    {
        id: 4,
        title: 'Service 4',
        description: 'Short description of Service 4',
        image: image
    },
    {
        id: 5,
        title: 'Service 5',
        description: 'Short description of Service 5',
        image: image
    },
    {
        id: 6,
        title: 'Service 6',
        description: 'Short description of Service 6',
        image: image
    }
];

function Flag() {
    return (
        <div className="flagService-container">
            <div className="flagService-grid">
                {servicesData.map(merchantService => (
                    <a
                        key={merchantService.id}
                        href="#"
                        className="flagService-card"
                        style={{ backgroundImage: `url(${merchantService.image})` }}
                    >
                        <div className="flagService-overlay"></div>
                        <div className="flagService-content">
                            <h3 className="flagService-title">{merchantService.title}</h3>
                            <p className="flagService-description">{merchantService.description}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Flag;