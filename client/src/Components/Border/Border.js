import React from 'react';

const Border = props => {
    return (
        <div className={ "border border-" + props.borderColor }>
            { props.children }
        </div>
    );
}

export default Border;