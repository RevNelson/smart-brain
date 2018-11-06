import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3 gray'>
                {'This Magic Brain will detect faces in your pictures. Give it a try.'}
            </p>
            <div className='center'>
                <div className='form pa4 br3 box center'>
                    <input className='f4 pa2 br3 b--none mr2 pr5 w-80 light-gray input' type='text' onChange={onInputChange}/>
                    <button className='w-20 grow f4 link ph3 b--none pv2 br3 pl2 dib light-gray' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;