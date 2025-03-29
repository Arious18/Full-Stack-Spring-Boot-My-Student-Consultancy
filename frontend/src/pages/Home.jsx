import Hero from "../components/hero/Hero.jsx";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";import React from "react";
import Comp2 from "../components/hero2/Comp2.jsx";
import Comp3 from "../components/hero3/Comp3.jsx";
import Flag from "../components/flag/Flag.jsx";
import LogoCarusel from "../components/logoCarusel/LogoCarusel.jsx";

import TestPage from "../Test/TestPage.jsx";
import TestButton from "../Test/TestButton.jsx";
import UniversitiesGrid from "../components/card/UniversitiesGrid.jsx";

function Home() {
    return (
        <>
            {/*<DashboardApp />*/}
            <Header/>
            <Hero/>
            <UniversitiesGrid/>


            <Comp2/>
            <Comp3/>
            <Flag/>
            <LogoCarusel/>

            <TestButton/>
            <Footer/>
        </>
    );
}

export default Home;
