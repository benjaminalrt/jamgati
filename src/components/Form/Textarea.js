import React from 'react';

const TextArea = props =>{
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <br/>
            <textarea placeholder={props.placeholder} id={props.id}></textarea>
        </div>
    )
}

export default TextArea;