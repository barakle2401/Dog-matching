import React, { useState } from 'react';
import Loader from 'react-loader-spinner'
import "./loader.css"
function LoaderSpinner() {


    return (


        <div className="loader-wrapper border-danger d-flex justify-content-center">



            <div className="text-center ">
                <h1 className="loader-text" >Please wait, processing
                <Loader
                        type="ThreeDots"
                        color="#ff00b3 "
                        height={150}
                        width={250}
                    /></h1>

            </div>



        </div>
    );
}
export default LoaderSpinner