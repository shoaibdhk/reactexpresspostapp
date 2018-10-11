import React from 'react';

const Button = props => {
    return (
        <button
            onClick={ props.clickHandler }
            className={"btn btn-" + props.buttonType}>
            {props.children}
        </button>
    );
}

export default Button;