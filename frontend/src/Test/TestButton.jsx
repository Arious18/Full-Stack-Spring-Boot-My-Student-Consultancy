import React, {Fragment} from "react";
import {useNavigate} from "react-router-dom";
import "./test.css"

function TestButton(){

    const navigate=useNavigate();

    return (

        <>
            <button  className="button" onClick={() => navigate('/EndPointTester')}>
                TestPage
            </button>


        </>
    )
}

export default TestButton;