import React from 'react'

const Input = ({ name, value, label, onChange, error }) => {
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
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
);
}
 
export default Input;