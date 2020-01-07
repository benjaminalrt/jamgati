import React, { useState } from "react"
import Accordion from 'react-bootstrap/Accordion'
import Field from './Field'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'


const Edit = props =>{

    const [editState, setEditState] = useState('0')

    const R = require('ramda');
    const formats = {'input':'Champ de saisie', 'select':'Champ de selection', 'button':'Bouton'}
    const types ={
        'input': {'text' : 'Texte simple', 'textarea' : 'Texte multi-ligne', 'date' : 'Date', 'number' : 'Nombre' , 'tel' : 'Numéro de téléphone','email':'Addresse e-mail','url':'Lien hypertexte','password':'Mot de passe','file':'Fichier','text-hidden':'Caché'},
        'select':{'checkbox':'Cases à cocher', 'radio':'Boutons radios', 'list': 'Liste déroulante'}}

    /**
     * le champ qu'on est entrain de modifier
     */
    const [updatingField, setUpdatingField] = useState([<Field key={0} format='' label='' placeholder='' values={['Valeur 1','Valeur 2','Valeur 3']} pos={0} />,<Field getKey={-1} />])

    const initializeField= ()=>{
        let newPos = props.fields.length+1
        let init = [<Field key={0} format='' label='' placeholder='' values={['','','']} pos={newPos}/>,<Field getKey={-1} />];
        setUpdatingField(init);
    }

    /**
     * setteur id car tableau
     */
    const setUpdatingFieldId= (field, id)=>{
        let newUpdatingField = R.clone(updatingField);
        newUpdatingField[id] = field;
        setUpdatingField(newUpdatingField);
    }

    /**
     * stockage du champ à modifier dans updatingField
     */
    const handleChangeUpdatingField = (e)=>{
        if(e.target.value>(-1)) {setUpdatingFieldId(props.fields[e.target.value],1)}
        else {setUpdatingFieldId(<Field getKey={-1}/>,1)};
    }

    /**
     * changement des champs
     */
    const handleChangeUpdatingFieldFormat = (e)=>{
        let updatedField = R.clone(updatingField[editState]);
        updatedField.props.format = e.target.value;
        updatedField.props.type = '';
        setUpdatingFieldId(updatedField,editState);
    }
    const handleChangeUpdatingFieldType = (e)=>{
        let updatedField = R.clone(updatingField[editState]);
        updatedField.props.type = e.target.value;
        setUpdatingFieldId(updatedField,editState);
    }
    const handleChangeUpdatingFieldLabel = (e)=>{
        let updatedField = R.clone(updatingField[editState]);
        updatedField.props.label = e.target.value;
        setUpdatingFieldId(updatedField,editState);
    }
    const handleChangeUpdatingFieldPlaceholder = (e)=>{
        let updatedField = R.clone(updatingField[editState]);
        updatedField.props.placeholder = e.target.value;
        setUpdatingFieldId(updatedField,editState);
    }
    const handleChangeUpdatingFieldValuesId = (e,id)=>{
        let updatedField = R.clone(updatingField[editState]);
        updatedField.props.values[id] = e.target.value;
        setUpdatingFieldId(updatedField,editState);
    }
    const updateValuesId = (id,op)=>{
        let updatedField = R.clone(updatingField[editState]);
        op==='+'? updatedField.props.values.splice(id,0,'') : updatedField.props.values.splice(id,1);
        setUpdatingFieldId(updatedField,editState);
    }
    const handleChangeUpdatingFieldPos = (e)=>{
        let updatedField = R.clone(updatingField[editState]);
        updatedField.props.pos = e.target.value-1;
        setUpdatingFieldId(updatedField,editState);
    }

    /**
     * Permet de créér ou modifier un champ
     * 
     */
    const displayCustomizeField = (field) =>{
        return(
            <React.Fragment key={editState}>
                {/* Début : Selecteur de type de valeur */}
                <label className="edit-card__type">Type de champ:</label>
                <select value={field.format} onChange={handleChangeUpdatingFieldFormat}>
                    <option value="">--Selection du type de champ à insérer--</option>
                    {Object.keys(formats).map((key,id)=>{return <option key={id} value={key}>{formats[key]}</option>})}
                </select>
                {/* Fin : Selecteur de type de valeur */}

                {field.format==='' ? null :
                    <>
                        {/* Début : Selecteur de format de valeur */}
                        {field.format==='button' ? null :
                            <>
                                <label className="edit-card__type">Format de valeur:</label>
                                <select value={field.type} className="" onChange={handleChangeUpdatingFieldType}>
                                    <option value="">--Selection du format de valeur--</option>
                                    {field.format==='input'?
                                        Object.keys(types.input).map((key,id)=>{return <option key={id} value={key}>{types.input[key]}</option>}) :
                                        Object.keys(types.select).map((key,id)=>{return <option key={id} value={key}>{types.select[key]}</option>}) }
                                </select>
                            </>
                        }
                        {/* Fin : Selecteur de format de valeur */}

                        <br/>

                        {/* Début : Selecteur de nom de champ */}
                        <label className="edit-card__type">Saisir un nom:</label><br/>
                        <input key={editState+'label'} value={field.label} onChange={handleChangeUpdatingFieldLabel}/>
                         {/* Fin : Selecteur de nom de champ */}

                        <br/>
                        <br/>
                        <br/>

                        {/* Début : Selecteur de placeholder */}
                        <label className="edit-card__type">Saisir un libellé de champ:</label><br/>
                        <input key={editState+'placeholder'} value={field.placeholder} onChange={handleChangeUpdatingFieldPlaceholder}/>
                         {/* Fin : Selecteur de placeholder */}

                        <br/>
                        <br/>
                        <br/>

                        {/* Début : Selecteur de valeurs pour champs à choix multiple */}
                        {field.format==='select' ?
                            <>
                                <p className="edit-card__type" >Valeurs possibles:</p>
                                {field.values.map((value,id)=>{
                                    return (
                                    <React.Fragment key={id}>
                                        <input onChange={(e)=>{handleChangeUpdatingFieldValuesId(e,id)}} placeholder={'Valeur '+(id+1)} id={'value'+id} value={value}/>
                                        <button className="custom-fa" onClick={()=>{updateValuesId(id,'+')}}><FontAwesomeIcon className="custom-faplus" icon={faPlus}  /></button>
                                        <button className="custom-fa" onClick={()=>{updateValuesId(id,'-')}}><FontAwesomeIcon className="custom-faminus" icon={faMinus}  /></button>
                                    </React.Fragment>)
                                })}
                                <button onClick={()=>{updateValuesId(field.values.length,'+')}}>Valeur supplémentaire</button>
                                <br/>
                                <br/>
                                <br/>
                            </> : null
                        }
                        {/* Fin : Selecteur de valeurs pour champs à choix multiple */}

                        {/* Début : Selecteur de position */}
                        <label className="edit-card__type">Position du champ:</label><br/>
                        <input value={field.pos+1} type="number" onChange={handleChangeUpdatingFieldPos} min='1' max={props.fields.length+(editState==='0'? 1:0)}/>
                        {(editState==='0')? 
                            <>
                                <div className="info-bulle">
                                    {
                                        (field.pos===0)||(field.pos===(props.fields.length))?
                                            <p>Le champ sera déplacé en {field.pos===0?'première':'dernière'} position</p>
                                            :
                                            <p>Le champ sera déplacé entre le champ "{props.fields[field.pos-1].props.label}" et le champ "{props.fields[field.pos].props.label}".</p>
                                    }
                                </div>
                            </> : null
                        }
                        {(field.pos!==field.getKey)&&(editState==='1')? 
                            <>
                                <div className="info-bulle">
                                    {
                                        (field.pos===0)||(field.pos===(props.fields.length-1))?
                                            <p>Le champ sera déplacé en {field.pos===0?'première':'dernière'} position.</p>
                                            :
                                            <p>Le champ sera déplacé entre le champ "{props.fields[field.pos+(field.pos>field.getKey? 0:-1)].props.label}" et le champ "{props.fields[field.pos+(field.pos>field.getKey? 1:0)  ].props.label}".</p>
                                    }
                                </div>
                            </> : null
                        }
                        {/* Fin : Selecteur de position */}

                        <br/>
                        <br/>
                        <br/>
                    </>
                }
            </React.Fragment>)
    }

    return (
        <div className="form-edit">
            <div className="form-edit__header">
                <h2 className="form-edit__title">Titre formulaire</h2>
            </div>
            <Accordion defaultActiveKey='0'>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>setEditState('0')} eventKey="0">
                        <span className="edit-card__title">INSERER</span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <div className="edit-card__body">
                            <div className="edit-card__section">
                            {displayCustomizeField(updatingField[0].props)}
                            {updatingField[0].props.format==='' ? null : 
                                <>   
                                    <button onClick={()=>{props.onClickAdd(updatingField[0]);initializeField();}}>Ajouter au formulaire</button>  
                                </>}
                            </div>
                        </div>
                    </Accordion.Collapse>
                </div>
                <div className="edit-card">
                    <Accordion.Toggle className="edit-card__header" as="div" onClick={()=>setEditState('1')} eventKey="1">
                        <span className="edit-card__title">MODIFIER
                        </span>
                        <span className="edit-card__button">+</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <div className="edit-card__body">
                            <div className="edit-card__section">            
                                <span className="edit-card__type">Champ à modifier:</span>
                                <div className="select-field">
                                    <select value={updatingField[1].props.getKey} onChange={handleChangeUpdatingField}>
                                        <option value={-1}>--Selection du champ à modifier--</option>
                                        {props.fields.map((field,index)=>{
                                            return(
                                                <option key={index} value={index}>{field.props.label}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                
                                <div className="custom-field">
                                    {updatingField[1].props.getKey===-1 ? null : 
                                    <>   
                                        {displayCustomizeField(updatingField[1].props)}
                                        <button onClick={()=>{props.onClickUpdate(updatingField[1]);initializeField()}}>Mettre à jour</button>    
                                        <button onClick={()=>{props.onClickDelete(updatingField[1]);initializeField()}}>Supprimer</button>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </Accordion.Collapse>
                    <button onClick={()=>console.log(props.fields)}>C</button>
                </div>
            </Accordion>
        </div>
        )

}

export default Edit;