import React from 'react';

const Input = props =>{
    return (
        <div className={props.className}>
            <label className={props.class} htmlFor={props.id}>{props.label}</label>
            <br/>
            <input placeholder={props.placeholder} onChange={props.onChange} id={props.id}/>
        </div>
    )
}

export default Input;