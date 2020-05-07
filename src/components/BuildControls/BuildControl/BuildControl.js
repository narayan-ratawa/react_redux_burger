import React from 'react';
import './BuildControl.css'
const BuildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className="Label">{props.label}</div >
            <button className="Less" onClick={props.removed} disabled={props.disabled}>less</button>
            <button className="More" onClick={props.added}>add</button>
        </div>
    )
}

export default BuildControl;