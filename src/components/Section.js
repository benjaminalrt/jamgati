import React from "react";
import '../styles/Section.css'

const Section = props => {

    return (
            <div className='edit-section'>
                <a href="#one">
                    <div className='edit-section__btn'>
                        <span>{props.label}</span>
                    </div>
                </a>    
            </div>
        );
    
  }

export default Section;