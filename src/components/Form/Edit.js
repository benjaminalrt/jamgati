import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Input from './Input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


const Edit = props =>{

    const [format,setFormat] = useState('')
    const [newType,setNewType] = useState('')
    const [newLabel, setNewLabel] = useState('')

    const [updateField,setUpdateField] = useState('')
    const [updateIdField, setUpdateIdField] = useState('');


    const [values, setValues] = useState(['','',''])
    
    const R = require('ramda');

    const resetStates = ()=>{
        setFormat('');
        setNewType('');
        setNewLabel('');
        setValues(['','','']);
        setUpdateField('');
        setUpdateIdField('');
    }

    const handleFormatChange = (e)=>{
        setNewType('');
        setValues(['','','']);
        setFormat(e.target.value);
    }

    const handleUpdateFieldChange = (e)=>{
        setUpdateIdField(e.target.value);
        setUpdateField(props.fields[e.target.value]);
    }

    const handleUpdatedTypeChange = (e)=>{
        let updatedField = R.clone(updateField);
        updatedField.props.type = e.target.value;
        setUpdateField(updatedField);
    }

    const handleUpdatedLabelChange = (e)=>{
        let updatedField = R.clone(updateField);
        updatedField.props.label = e.target.value;
        setUpdateField(updatedField);
    }

    const handleNewTypeChange = (e)=>{
        setNewType(e.target.value)
    }

    const handleNewLabelChange = (e)=>{
        setNewLabel(e.target.value)
    }

    const handleSelectChangeId = (e,id)=>{
        setValuesId(e.target.value,id)
    }

    const handleUpdateSelectChangeId = (e,id)=>{
        let updatedField = R.clone(updateField);
        updatedField.props.values[id] = e.target.value;
        setUpdateField(updatedField);
    }

    const handleUpdatedFormatChange = (e)=>{
        let updatedField = R.clone(updateField);
        updatedField.props.format = e.target.value;
        updatedField.props.type = '';
        setUpdateField(updatedField);
    }

    const setValuesId = (value,id)=>{
        let newValues = R.clone(values);
        newValues[id]=value;
        setValues(newValues);
    }

    const addValuesId = (id)=>{
        let newValues = R.clone(values);
        newValues.splice(id,0,'');
        setValues(newValues);
    }

    const delValuesId = (id)=>{
        let newValues = R.clone(values);
        newValues.splice(id,1);
        setValues(newValues);
    }
    const addUpdateValuesId = (id)=>{
        let updatedField = R.clone(updateField);
        updatedField.props.values.splice(id,0,'');
        setUpdateField(updatedField);
    }

    const delUpdateValuesId = (id)=>{
        let updatedField = R.clone(updateField);
        updatedField.props.values.splice(id,1);
        setUpdateField(updatedField);
    }

    

    /**
     * Permet de choisir quel type de champ faire apparaître
     * 
     */
    const displayFieldCustomization = () =>{
        switch(format){
            case "input": return (
                <div className="custom-field">
                    <label className="edit-card__type" htmlFor='select-type'>Format de valeur:</label>
                    <select value={newType} className="" onChange={handleNewTypeChange}>
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
                    <button onClick={()=>{props.onClick(newType, newLabel, format);resetStates()}}>Ajouter</button>
                </div>
                
            );
            case "select": return (
                <div className="custom-field">
                    <label className="edit-card__type" htmlFor='select-type'>Format des valeurs:</label>
                    <select value={newType} className="" onChange={handleNewTypeChange}>
                        <option  value="">--Selection du format des valeurs--</option>
                        <option value="checkbox">Cases à cocher</option>
                        <option value="radio">Boutons radio</option>
                        <option value="select">Menu déroulant</option>
                    </select>
                    <Input className="edit-card__label" placeholder="Saisir un nom" onChange={handleNewLabelChange} key='select-name' id='select-name' label='Choisir un nom de champ:' class='edit-card__type'/>
                    <br/>
                    <p className="edit-card__type" >Valeurs possibles:</p>
                    {values.map((value,id)=>{
                        return (
                        <React.Fragment key={id}>
                            <input onChange={(e)=>{handleSelectChangeId(e,id)}} placeholder={'Valeur '+(id+1)} id={'value'+id} value={value}/>
                            <button className="custom-fa" onClick={()=>{addValuesId(id)}}><FontAwesomeIcon className="custom-faplus" icon={faPlus}  /></button>
                            <button className="custom-fa" onClick={()=>{delValuesId(id)}}><FontAwesomeIcon className="custom-faminus" icon={faMinus}  /></button>
                            
                        </React.Fragment>)
                    })}
                    <button onClick={()=>{setValues(values.concat(''))}}>Valeur supplémentaire</button>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClick(newType, newLabel, format, values);resetStates()}}>Ajouter au formulaire</button>
                    <br/>
                </div>
                
            );
            case "button": return (
                <div className="custom-field">
                    <Input className="edit-card__label" placeholder="Contenu du bouton" onChange={handleNewLabelChange} key='button-name' id='button-name' label='Contenu du bouton' class='edit-card__type'/>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClick('button', newLabel, format);resetStates()}}>Ajouter</button>
                </div>
            )
            default : return (true);
        }
    }

    /**
     * Permet de modifier un champ
     * 
     */
    const displayFieldModification = () =>{
        switch(updateField.props.format){
            case "input" : return (
                <div className="custom-field">
                    <label className="edit-card__type">Type de champ:</label>
                    <select value={updateField.props.format} onChange={handleUpdatedFormatChange}>
                        <option value="">--Selection du type de champ à insérer--</option>
                        <option value="input">Champ de saisie</option>
                        <option value="select">Champ de selection</option>
                        <option value="button">Bouton</option>
                    </select>
                    <label className="edit-card__type">Format de valeur:</label>
                    <select value={updateField.props.type} className="" onChange={handleUpdatedTypeChange}>
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
                    <Input value={updateField.props.label} className="edit-card__label" placeholder="Saisir un nom" onChange={handleUpdatedLabelChange} key='select-name' id='select-name' label='Choisir un nom de champ:' class='edit-card__type'/>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClickUpdate(updateField);resetStates()}}>Mettre à jour</button>
                    <button onClick={()=>{props.onClickDelete(updateField);resetStates()}}>Supprimer</button>
                </div>
                
            );
            case "select" : return (
                <div className="custom-field">
                    <label className="edit-card__type">Type de champ:</label>
                    <select value={updateField.props.format} onChange={handleUpdatedFormatChange}>
                        <option value="">--Selection du type de champ à insérer--</option>
                        <option value="input">Champ de saisie</option>
                        <option value="select">Champ de selection</option>
                        <option value="button">Bouton</option>
                    </select>
                    <label className="edit-card__type" htmlFor='select-type'>Format des valeurs:</label>
                    <select value={updateField.props.type} className="" onChange={handleUpdatedTypeChange}>
                        <option  value="">--Selection du format des valeurs--</option>
                        <option value="checkbox">Cases à cocher</option>
                        <option value="radio">Boutons radio</option>
                        <option value="select">Menu déroulant</option>
                    </select>
                    <Input value={updateField.props.label} className="edit-card__label" placeholder="Saisir un nom" onChange={handleUpdatedLabelChange} key='select-name' id='select-name' label='Choisir un nom de champ:' class='edit-card__type'/>
                    <br/>
                    <p className="edit-card__type" >Valeurs possibles:</p>
                    {updateField.props.values.map((value,id)=>{
                        return (
                        <React.Fragment key={id}>
                            <input onChange={(e)=>{handleUpdateSelectChangeId(e,id)}} placeholder={'Valeur '+(id+1)} id={'value'+id} value={value}/>
                            <button className="custom-fa" onClick={()=>{addUpdateValuesId(id)}}><FontAwesomeIcon className="custom-faplus" icon={faPlus}  /></button>
                            <button className="custom-fa" onClick={()=>{delUpdateValuesId(id)}}><FontAwesomeIcon className="custom-faminus" icon={faMinus}  /></button>
                        </React.Fragment>)
                    })}
                    <button onClick={()=>{addUpdateValuesId(updateField.props.values.length)}}>Valeur supplémentaire</button>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClickUpdate(updateField);resetStates()}}>Mettre à jour</button>
                    <button onClick={()=>{props.onClickDelete(updateField);resetStates()}}>Supprimer</button>
                    <br/>
                </div>
                
            );
            case "button": return (
                <div className="custom-field">
                    <label className="edit-card__type">Type de champ:</label>
                    <select value={updateField.props.format} onChange={handleUpdatedFormatChange}>
                        <option value="">--Selection du type de champ à insérer--</option>
                        <option value="input">Champ de saisie</option>
                        <option value="select">Champ de selection</option>
                        <option value="button">Bouton</option>
                    </select>
                    <Input value={updateField.props.label} className="edit-card__label" placeholder="Contenu du bouton" onChange={handleUpdatedLabelChange} key='button-name' id='button-name' label='Contenu du bouton' class='edit-card__type'/>
                    <br/>
                    <br/>
                    <button onClick={()=>{props.onClickUpdate(updateField);resetStates()}}>Mettre à jour</button>    
                    <button onClick={()=>{props.onClickDelete(updateField);resetStates()}}>Supprimer</button>
                </div>
            )
            default : console.log('error');
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
                                    <select value={format} onChange={handleFormatChange}>
                                        <option value="">--Selection du type de champ à insérer--</option>
                                        <option value="input">Champ de saisie</option>
                                        <option value="select">Champ de selection</option>
                                        <option value="button">Bouton</option>
                                    </select>
                                </div>
                                {displayFieldCustomization()}
                            </div>
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
                                    <select value={updateIdField} onChange={handleUpdateFieldChange}>
                                        <option value=''>--Selection du champ à modifier--</option>
                                        {props.fields.map((field,index)=>{
                                            return(
                                                <option key={index} value={index}>{field.props.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                {updateField==='' ? null : displayFieldModification()}
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