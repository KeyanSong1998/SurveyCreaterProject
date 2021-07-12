// SurveyField contains logic to render a single label and text input. 

import React from 'react';

//redux-form would pass some props to its component
//meta 
export default ({input,label,meta: {error, touched}}) => {
    return(
        <div>
            <label>{label}</label>
            <input {...input} style = {{marginBottom:'5px'}}/>

            <div className = "red-text" style= {{marginBottom:'20px'}}>
                {touched && error}
            </div>
            
        </div>
    );
};
