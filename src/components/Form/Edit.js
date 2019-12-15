import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Input from './Input'

const Edit = props =>{

    const [newField,setNewField] = useState('')
    const [updateField,setUpdateField] = useState('')
    const [newType,setNewType] = useState('')
    const [newLabel, setNewLabel] = useState('')

    const resetStates = ()=>{
        setNewField('');
        setNewType('');
        setNewLabel('');
    }

    const handleNewFieldChange = (e)=>{
        setNewField(e.target.value);
    }

    const handleUpdateFieldChange = (e)=>{
        setUpdateField(e.target.value);
    }


    const handleNewTypeChange = (e)=>{
        setNewType(e.target.value)
    }

    const handleNewLabelChange = (e)=>{
        setNewLabel(e.target.value)
    }


    const displayFieldCustomization = () =>{
        switch(newField){
            case "input": return (
                <div className="custom-field">
                    <label className="edit-card__type" htmlFor='select-type'>Format de valeur:</label>
                    <select className="" onChange={handleNewTypeChange}>
                        <option value="">--Selection du format de valeur--</option>
                        <option value="text">Texte simple</option>
                        <option value="textarea">Texte multi-ligne</option>
                        <option value="date">Date</option>
                        <option value="number">Nombre</option>
                        <option value="tel">Numéro de téléphone</option>
                        <option value="email">Addresse e-mail</option>
                        <option value="url">Lien hypertexte</option>
                        <option value="password">Mot de passe</option>
                        <option value="file">Fichier</option>
                        <option value="text-hidden">Caché</option>
                    </select>
                    <Input className="edit-card__label" placeholder="Saisir un nom" onChange={handleNewLabelChange} key='select-name' id='select-name' label='Choisir un nom de champ' class='edit-card__type'/>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClick(newType, newLabel);resetStates()}}>Ajouter</button>
                </div>
                
            );
            case "select": return (
                <div className="custom-field">
                    <label className="edit-card__type" htmlFor='select-type'>Format des valeurs:</label>
                    <select className="" onChange={handleNewTypeChange}>
                        <option value="">--Selection du format des valeurs--</option>
                        <option value="checkboxes">Cases à cocher</option>
                        <option value="radio">Boutons radio</option>
                        <option value="select">Menu déroulant</option>
                        <option value="list">Liste de valeurs</option>
                    </select>
                    <Input className="edit-card__label" placeholder="Saisir un nom" onChange={handleNewLabelChange} key='select-name' id='select-name' label='Choisir un nom de champ' class='edit-card__type'/>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClick(newType, newLabel);resetStates()}}>Ajouter</button>
                </div>
                
            );
            case "button": return (
                <div className="custom-field">
                    <Input className="edit-card__label" placeholder="Contenu du bouton" onChange={handleNewLabelChange} key='button-name' id='button-name' label='Contenu du bouton' class='edit-card__type'/>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClick('button', newLabel);resetStates()}}>Ajouter</button>
                </div>
            )
            default : return (true);
        }
    }

    return (
        <div className="form-edit">
            <div className="form-edit__header">
                <h2 className="form-edit__title">Titre formulaire</h2>
            </div>
            <Accordion defaultActiveKey="0">
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" eventKey="0">
                        <span className="edit-card__title">INSERER</span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="edit-card__body">
                            <div className="edit-card__section">            
                                <span className="edit-card__type">Type de champ:</span>
                                <div className="select-field">
                                    <select value={newField} onChange={handleNewFieldChange}>
                                        <option value="">--Selection du champ--</option>
                                        <option value="input">Champ de saisie</option>
                                        <option value="select" disabled>Champ de selection</option>
                                        <option value="button">Bouton</option>
                                    </select>
                                </div>
                                {displayFieldCustomization()}
                                

                            </div>
                            {/* <div className="edit-card__section">            
                                <span className="edit-card__content">MODIFIER</span>
                            </div>
                            <div className="edit-card__section">            
                                <span className="edit-card__content">DEPLACER</span>
                            </div> */}
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" eventKey="1">
                        <span className="edit-card__title">MODIFIER
                        </span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <div className="edit-card__body">
                            <div className="edit-card__section">            
                                <span className="edit-card__type">Champ à modifier:</span>
                                <div className="select-field">
                                    <select value={updateField} onChange={()=>{handleUpdateFieldChange();}}>
                                        <option value="">--Selection du champ--</option>
                                        {props.idFields.map((field)=>{
                                            return(
                                                <option key={field} value={field}>{field}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                    {/* <Section label="Champ de texte"/>
                    <Section label="Champ de selection"/>
                    <Section label="Bouton envoyer"/>
                    <Section label="reCapcha"/> */}
            </Accordion>
                    


                </div>
        )

}

export default Edit;