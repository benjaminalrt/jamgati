import React, { useState } from "react"
import '../styles/Form.css'
import Edit from './Form/Edit'
import Field from './Form/Field'


const Form = props => {

    /* STATES */
    /* Form states */
    const [fields, setFields] = useState([]);
    const [keys, setKeys] = useState(0);

    const testFields = [<Field key={0} getKey={0} pos={0} format='input' type='text' label='1'/>,
    <Field key={1} getKey={1} pos={1} format='input' type='text' label='2'/>,
    <Field key={2} getKey={2} pos={2} format='input' type='text' label='3'/>]


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
        let newField = <Field key={keys} pos={field.props.pos} getKey={field.props.pos} format={field.props.format} type={field.props.type} label={field.props.label} placeholder={field.props.placeholder} values={field.props.values}/>
        let updatedFields = R.clone(fields);
        updatedFields.splice(field.props.pos,0,newField)
        if(field.props.pos!==fields.length){
            updatedFields.forEach((cell,index)=>{
                if(index>field.props.pos){
                    console.log('EDITION')
                    let upField = <Field key={cell.key} pos={cell.props.pos+1} getKey={cell.props.getKey+1} format={cell.props.format} type={cell.props.type} label={cell.props.label} values={cell.props.values}/>;
                    updatedFields[index]=upField;
                    }
                })
            updatedFields.sort((a,b)=> a.props.pos-b.props.pos);
        }
        setFields(updatedFields);
    }

    const updateFields = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields[field.props.getKey] = field;
        let shuffling = Math.sign(field.props.getKey-field.props.pos);
        if(shuffling!==0){ //SI ON MONTE OU ON DESCEND
            updatedFields.forEach((cell,index)=>{ 
                if ((index<=field.props.pos&&index>field.props.getKey)||(index>=field.props.pos&&index<field.props.getKey)){
                    cell.props.pos+=shuffling;          
                }
                if (index!==field.props.getKey)
                    cell.props.getKey=cell.props.pos;
            })
            updatedFields.sort((a,b)=> a.props.pos-b.props.pos);
            updatedFields[field.props.pos].props.getKey=updatedFields[field.props.pos].props.pos;
        }
        setFields(updatedFields);
    }

    const deleteField = (field)=>{
        let updatedFields = R.clone(fields);
        updatedFields.splice(field.props.getKey,1);
        updatedFields.forEach((cell,index)=>{ 
            if (index>=field.props.pos){
                cell.props.pos-=1;
                cell.props.getKey-=1;          
            }
        })
        updatedFields.sort((a,b)=> a.props.pos-b.props.pos);
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
                <Edit onClickAdd={addField} onClickUpdate={updateFields} onClickDelete={deleteField} fields={fields}/>
                
                <div className="form-show">
                    <div className="form-show__header">
                        <h2 className="form-show__title">Edition formulaire</h2>
                    </div>
                    <div className="form-show__body">
                        <div className="form-show__typography">
                        </div>
                        <div className="form-show__preview">

                            <h3>Formulaire de contact</h3>
                     
                            {updatefieldsForm()}

                            <button onClick={()=>{
                                addField(testFields[keys]);
                            }}>ADD</button>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Form;