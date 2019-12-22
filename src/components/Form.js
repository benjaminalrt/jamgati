import React, { useState } from "react"
import '../styles/Form.css'
import Edit from './Form/Edit'
import Field from './Form/Field'


const Form = props => {

    /* STATES */
    /* Form states */
    const [titleCreatedForm, setTitleCreatedForm] = useState("Titre du formulaire");
    const [fields, setFields] = useState([]);
    const [idFields, setIdFields] = useState([]);
    const [keys, setKeys] = useState(0);

    const R = require('ramda');

    /* FUNCTIONS */
    const saveTextChange = (event) =>{
        setTitleCreatedForm(event.target.value);
    }


    const addField = (type,label,format,values=[])=>{
        setKeys(keys+1);
        setFields(fields.concat(<Field format={format} type={type} label={label} key={keys} keyId={keys} values={values}/>));
        setIdFields(idFields.concat(label)); 
    }

    const updateFields = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields[field.props.keyId] = field;
        setFields(updatedFields);
    }

    const deleteField = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields.splice(field.props.keyId,1);
        setFields(updatedFields);
    }

    const updatefieldsForm = ()=>{
        return(
        <>
            {fields}
        </>
        );
    }


    return (
        <div className="Form">
            <div className="form-container">
                <Edit onClick={addField} onClickUpdate={updateFields} onClickDelete={deleteField} fields={fields}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition formulaire</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">

                            <input className="form-created__h1" onChange={event => saveTextChange(event)} value={titleCreatedForm}/>
                    
                            {updatefieldsForm()}

                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Form;