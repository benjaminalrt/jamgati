import React, { useState } from "react"
import '../styles/Form.css'
import Input from './Form/Input'
import Textarea from './Form/Textarea'
import Edit from './Form/Edit'



const Form = props => {

    /* STATES */
    /* Form states */
    const [titleCreatedForm, setTitleCreatedForm] = useState("Titre du formulaire");
    const [fields, setFields] = useState([]);
    const [idFields, setIdFields] = useState([]);


    /* FUNCTIONS */
    const saveTextChange = (event) =>{
        setTitleCreatedForm(event.target.value);
    }

    const addField = (type,label)=>{
        const keyId=fields.length;
        switch(type){
            case "textarea" :
                setFields(fields.concat(<Textarea key={keyId}/>));
            break;
            case "button" :
                setFields(fields.concat(<button key={keyId} type="submit">{label}</button>));
            break;
            default :
            setFields(fields.concat(<Input type={type} label={label} key={keyId}/>));
            console.log(label+keyId);
        }
        setIdFields(idFields.concat(label));
    }

    const updatefieldsForm = ()=>{
        return(
        <div>
            {fields}
        </div>
        );
    }


    return (
        <div className="Form">
            <div className="form-container">
                <Edit onClick={addField} idFields={idFields}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition formulaire</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">

                            <input className="form-created__h1" onChange={event => saveTextChange(event)} value={titleCreatedForm}/>
                    
                            <div>
                                {updatefieldsForm()}
                            </div>

                            

                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Form;