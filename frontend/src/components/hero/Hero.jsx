import './hero.css';

function Hero() {
    return (
        <div className="mainHero-container">
            {/* Background Image Container */}
            <div className="mainHero-background-image"></div>

            {/* Content */}
            <div className="mainHero-content">
                <div className="mainHero-text">
                    <h1 className="mainHero-title"><pre>Innovate with Kuvvatly Eyyam</pre></h1>
                    <p className="mainHero-subtitle">
                        Empowering your digital journey with cutting-edge solutions
                        that transform ideas into reality.
                    </p>
                </div>

                {/* Logo Container */}
                <div className="mainHero-logo-container">
                    <img
                        src="BrandLogo.png"
                        alt="TmDev Logo"
                        className="mainHero-logo"
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;