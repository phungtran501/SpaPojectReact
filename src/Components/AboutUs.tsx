import React, { useEffect, useState } from 'react';

const AboutUs = () => {


    useEffect(() => {


        return () => {

            console.log("Component unmount");
        }
    }, []);




    return(
        <div>
            <p>This is component about us</p>
            <ul>
                
            </ul>
        </div>
    );
};

export default AboutUs;