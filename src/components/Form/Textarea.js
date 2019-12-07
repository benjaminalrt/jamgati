import React from 'react';

const TextArea = props =>{
    return (
        <div>
            <label for={props.id}>{props.name}</label>
            <br/>
            <textarea id={props.id}></textarea>
        </div>
    )
}

export default TextArea;