import React from 'react';

const Input = props => {
    return (
        <div className="form-group">
            <label htmlFor={ props.inputId }>{ props.labelName }</label>
            <input
                type="text"
                id={ props.inputId }
                value={ props.value }
                onChange={ props.inputChangeHandler }
                placeholder={ props.inputplaceholder }
                className="form-control" />
        </div>
    );
}

export default Input;