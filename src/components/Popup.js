import React from "react";
import '../styles/Popup.css'

const Popup = props => {

    return (
            <div className='popup'>
              <div className='popup_inner'>
              <form onSubmit={props.closePopup}>
                  <h1>Ajouter un champ de saisie</h1>

                  <label for="typeChose">Nom du champ: </label><br/>
                  <select required id="typeChose" onChange={props.selectChange}>
                      <option value="">--Please choose an option--</option>
                      <option value="Input">Input</option>
                      <option value="Textarea">Textarea</option>
                      {/* <option value="Select">Select</option>
                      <option value="Radio">Radio</option>
                      <option value="Checkboxes">Checkboxes</option> */}
                  </select>
                  <br/>
                  
                  <label for="labelChose">Nom du champ: </label><br/>
                  <input required id="labelChose" type="text" placeholder={props.placeholder} value={props.value} onChange={props.labelChange}/>

                  <br/>
                  <br/>
                  <br/>
                  <button type="submit">Ajouter</button>
                  <button onClick={props.close}>Annuler</button>
                </form>
                
              </div>
            </div>
        );
    
  }

export default Popup;