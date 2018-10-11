import React from 'react';
import Border from '../Border/Border';
import Button from '../Button/Button';

const LikeCommentpanel = props => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <Border borderColor="white">
                    <div className="d-flex">
                        <Button buttonType="light mr-2">
                            Like
                            <span>( 0 )</span>
                        </Button>
                        <Button buttonType="light">
                            Comment
                            <span>( 0 )</span>
                        </Button>
                    </div>
                </Border>
            </div>
        </div>
    );
}

export default LikeCommentpanel;