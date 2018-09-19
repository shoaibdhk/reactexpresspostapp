import React from 'react';

const Textarea = props => {
    return (
        <div className="form-group">
            <textarea
                placeholder={props.placeholder}
                value={props.value}
                onChange={ props.textareaChangeHandler }
                name=""
                id=""
                cols="30"
                rows="3"
                className="form-control">
            </textarea>
        </div>
    );
}

export default Textarea;