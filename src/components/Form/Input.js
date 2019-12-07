import React from 'react';

const Input = props =>{
    return (
        <div>
            <label for={props.id}>{props.name}</label>
            <br/>
            <input id={props.id}/>
        </div>
    )
}

export default Input;