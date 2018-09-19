import React from 'react';
import Button from '../Button/Button';

const Delete = props => {
    return (
        <Button buttonType="danger" clickHandler={props.deleteHandler}> Delete </Button>
    );
}

export default Delete;