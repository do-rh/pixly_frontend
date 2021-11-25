import "./ImageBeingEdited.css";
const API_URL = 'https://pixly-dorish.herokuapp.com';

/** Card: displays current image edits.
 * 
 * Props:
 * - fileLocation - string of image location on server
 * State:
 * - none
 * 
 * Image includes key of Date.now to trigger re-render upon button click
 * 
 * ImagePage -> ImageBeingEdited
 */

function ImageBeingEdited({ fileLocation }) {
    console.log(fileLocation);
    const path = fileLocation.replace("../tmp", "");
    return (
        <div className="edit-container col-6">
            <img className="img-being-edited"
                src={`${API_URL}/editimages${path}`}
                alt="edited img"
                key={Date.now()} />
        </div>
    );
}

export default ImageBeingEdited;
