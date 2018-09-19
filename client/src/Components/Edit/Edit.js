import React from 'react';
import Button from '../Button/Button';

const Edit = props => {
    return (
        <Button buttonType="warning mr-2" clickHandler={ props.editHandler }> Edit </Button>
    );
}

export default Edit;