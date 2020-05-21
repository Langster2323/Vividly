import React from 'react'

const Input = ({ name, value, label, onChange }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{ label }</label>
            <input  
            className="form-control" 
            onChange={onChange}
            name={name}
            value={value}
            id={name} 
            type="text" />
        </div>
);
}
 
export default Input;