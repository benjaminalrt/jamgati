import React, { useState } from "react"
import '../styles/Form.css'
import Edit from './Form/Edit'
import Field from './Form/Field'


const Form = props => {

    /* STATES */
    /* Form states */
    const [titleCreatedForm, setTitleCreatedForm] = useState("Titre du formulaire");
    const [fields, setFields] = useState([]);
    const [keys, setKeys] = useState(0);
    const [pos,setPos] = useState(0);
    const testField = <Field key={10} getKey={1} format='input' type='text' label='Orange'/>

    const R = require('ramda');

    /* FUNCTIONS */

    // const updatePos = ()=>{
    //     let updatedFields = R.clone(fields);
    //     updatedFields.map((field, index)=>{
    //         field.props.pos = index;
    //     })
    //     setFields(updatedFields)
    // }

    const addField = (field)=>{
        setKeys(keys+1);
        let newField = <Field key={keys} pos={pos} getKey={keys} format={field.props.format} type={field.props.type} label={field.props.label} values={field.props.values}/>
        setPos(pos+1);
        setFields(fields.concat(newField));
    }

    const updateFields = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields[field.props.getKey] = field;
        setFields(updatedFields);
    }

    const deleteField = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields.splice(field.props.getKey,1);
        setFields(updatedFields);
    }

    const updatefieldsForm = ()=>{
        return(
        <>
            {fields}
        </>
        );
    }

    const moveFieldToId = (field,id)=>{
        let updatedFields = R.clone(fields);
        let fieldToAdd = R.clone(field);
        updatedFields.splice(field.props.getKey,1);
        updatedFields.splice(id,0,fieldToAdd);
        setFields(updatedFields);
    }

    return (
        <div className="Form">
            <div className="form-container">
                <Edit onClickAdd={addField} onClickUpdate={updateFields} onClickDelete={deleteField} fields={fields}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition formulaire</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">

                            <p>Formulaire</p>
                     
                            {updatefieldsForm()}
                            
                            <button onClick={()=>console.log(fields)}>fields</button>
                            <button onClick={()=>{moveFieldToId(testField,1);console.log(fields)}}>add</button>
                            <button onClick={()=>{moveFieldToId(testField,0);console.log(fields)}}>xchange</button>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Form;