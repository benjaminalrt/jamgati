import React from 'react';

const Input = props =>{
    return (
        <div key={props.keyId} className={props.className ? props.className : 'form-group'}>
            <label className={props.class} htmlFor={props.id}>{props.label+(props.type==='text-hidden'?' (Champ caché pour l\'utilisateur)':'')}</label>
            <br/>
            <input type={props.type} placeholder={props.placeholder} onChange={props.onChange} id={props.id}/>
        </div>
    )
}

export default Input;