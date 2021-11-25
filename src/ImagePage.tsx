import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

import PixlyAPI from "./PixlyAPI"
import { ImageDataInterface } from './interfaces';

import EditPage from "./EditPage";
import Loading from "./Loading";
import ImageCard from "./ImageCard";
import ImageBeingEdited from './ImageBeingEdited';
import "./ImagePage.css";

/** Renders single image on page
 * 
 * Props: None
 * State: isLoading, image
 * 
 * Routes -> ImagePage -> {ImageCard, EditImage}
 * 
 * Location: /image/:id
 * 
 */
function ImagePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [image, setImage] = useState<ImageDataInterface | null>(null);
    const [fileLocation, setFileLocation] = useState(null);
    const [cueRender, setCueRender] = useState(false);

    const { id } = useParams('id');

    useEffect(() => {
        async function getImage() {
            let result = await PixlyAPI.getImage(id);
            setImage(result);
            setIsLoading(false);
        } getImage();
    }, [id])

    async function startEdit() {
        const result = await PixlyAPI.startEdit(id);
        setFileLocation(result);
        setIsEditing(true);
    }

    function handleEdit(fileLocation) {
        console.log("handleEdit ran", { fileLocation })
        setFileLocation(fileLocation);
        setCueRender(r => !r);
    }

    async function saveEdits() {
        const result = await PixlyAPI.saveEdits(id, fileLocation, '');
        setIsEditing(false);
        setImage(result);
        return <Redirect push to={`/image/${result.id}`} />;
    }

    async function cancelEdits() {
        setIsEditing(false);
        return <Redirect push to={`/image/${id}`} />;
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <div> {
            (!isEditing)
                ? <div>
                    <ImageCard src={image.imgUrl} caption={image.caption}></ImageCard>
                    <button className="btn btn-secondary" onClick={startEdit}>Edit Image</button>
                </div>
                : <React.Fragment>
                    <div className="image-being-editted row">
                        <div className="col-2"></div>
                        <EditPage id={id} handleEdit={handleEdit} fileLocation={fileLocation} />
                        <ImageBeingEdited fileLocation={fileLocation} />
                        <div className="col-2"></div>
                    </div>
                    <button
                        className="btn btn-success"
                        onClick={saveEdits}>
                        Save Edits
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={cancelEdits}>
                        Cancel Edits
                    </button>
                </React.Fragment>
        }
        </div >
    )

}

export default ImagePage;