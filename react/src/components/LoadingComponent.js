import React from 'react';
import loading from '../components/assests/images/goku.gif';

export const Loading = () => {
    return(
        <div className="col-12">
            
            <img class="manImg" src={loading}></img>
            
            <p>Wait for a few seconds . . .</p>
        </div>
    );
};