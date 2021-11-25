import { Redirect } from 'react-router-dom';

import PixlyAPI from './PixlyAPI';
import "./EditPage.css";
import React from 'react';

const EDIT_TYPES = [['rotate', 'Rotate'], ['bw', 'Black & White'], ['resize', 'Resize'],
['side_flip', 'Horizontal Flip'], ['top_flip', 'Vertical Flip'],
['color_split', 'Color Split'], ['contrast', 'Contrast'], ['border', 'Border'], ['blur', 'Blur']];

/** Renders editting function for image
 * 
 * Props: id
 * State: isEditing, image
 * 
 * ImagePage -> {Edit}
 * 
 * Location: /image/:id
 * 
 */

function EditPage({ id, handleEdit, fileLocation }) {

    async function handleClick(evt) {
        evt.preventDefault();
        const resp = await PixlyAPI.edit(id, fileLocation, evt.target.id) //"successful"
        handleEdit(resp)
    }

    return (
        <React.Fragment>
            <div className="list-group image-mutations col-4"> {
                EDIT_TYPES.map(editType => (
                    <button
                        className="btn list-group-item list-group-item-primary"
                        onClick={handleClick}
                        id={editType[0]}
                        key={editType[0]}>
                        {editType[1]}
                    </button>
                ))
            }
            </div >
        </React.Fragment>
    )

}

export default EditPage;