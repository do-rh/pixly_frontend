import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import './UploadImgForm.css';

/**Renders a form to upload an image and a caption
 * 
 * Props: handleImgUpload fn
 * State: caption, selectedFile
 * 
 * App -> UploadImgForm
 */

interface UploadImgFormProps {
    handleImgUpload: (image: File, caption: string) => Promise<void>;
}

function UploadImgForm({ handleImgUpload }: UploadImgFormProps) {
    const [caption, setCaption] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File>(new File([""], "emptyFile"));
    
    function handleSubmit(evt: React.FormEvent) {
        evt.preventDefault();
        console.log('handleSubmit running');
        handleImgUpload(selectedFile, caption);
    }

    return (
        <div className="upload-form">
            <form className="form-inline" onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="imageUpload">Upload your image here: </label>
                <input
                    type="file"
                    id="imageUpload"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSelectedFile(e.target.files[0])}
                />
                </div>
                <div className="form-group">
                <label htmlFor="caption">Caption: </label>
                <input
                    id="caption"
                    type="textarea"
                    value={caption}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)}
                    />
                </div>
                <button className="btn btn-primary btn-default">Upload!</button>
            </form>
        </div>
    );
}

export default UploadImgForm;

//Typescript needs updating on file input e.target.files
