import React, { useState } from "react";
import '../styles/Form.css';
import Input from './Form/Input'
import Textarea from './Form/Textarea'
import Popup from './Popup'



const Form = props => {

    /* STATES */
    /* Form states */
    const [titleCreatedForm, setTitleCreatedForm] = useState("Titre du formulaire");

    const [content, setContent] = useState([]);
    
    /* Edit states */
    const [showPopup, setShowPopup] = useState(false);
    const [labelInput, setLabelInput] = useState('')
    const [selectInput, setSelectInput] = useState('')

    /* FUNCTIONS */
    const saveTextChange = (event) =>{
        setTitleCreatedForm(event.target.value);
    }

    const addInput = (type,name)=>{
        switch(type){
            case "Input" : setContent(content.concat(<Input name={name}/>)); break;
            case "Textarea" : setContent(content.concat(<Textarea name={name}/>)); break;
            default : setContent(content.concat("error"));
        }
    }

    const updateContentForm = ()=>{
        return(
        <div>
            {content}
        </div>
        );
    }

    const togglePopup= ()=> {
        setShowPopup(!showPopup);
    }
    const handleLabelChange = (event)=>{
        setLabelInput(event.target.value)
    }
    const handleSelectChange = (event)=>{
        setSelectInput(event.target.value)
    }

    return (
        <div className="Form">
            <div className="form-container">
                <div className="form-edit">
                    <div className="form-edit__header">
                        <h2 className="form-edit__title">Titre formulaire</h2>
                    </div>
                    <div>
                        <button className="edit-button" onClick={()=>togglePopup()}>Ajouter un champ</button>
                        {showPopup ? 
                            <Popup
                                labelChange={event=>handleLabelChange(event)}
                                selectChange={event=>handleSelectChange(event)}
                                closePopup={()=>{
                                    togglePopup();
                                    addInput(selectInput,labelInput);
                                    setLabelInput("");
                                }}
                                value={labelInput}
                                placeholder="Entrez le nom de votre champ"
                                close={()=> {togglePopup();setLabelInput("");}}
                            />
                            : null
                        }
                    </div>
                </div>
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition formulaire</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                            Zone de choix typographique
                        </div>
                        <div className="form-show__preview">

                            <input className="form-created__h1" onChange={event => saveTextChange(event)} value={titleCreatedForm}/>
                    
                            <div>
                                {updateContentForm()}
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Form;