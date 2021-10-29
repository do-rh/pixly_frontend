
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
    const path = fileLocation.replace("./temp_image_edits", "");
    return (
        <div className="Image-card">
            <img className="Image-card-image"
                src={`http://localhost:5000/editimages${path}`}
                alt="edited img"
                style={{ "width": "400px" }}
                key={Date.now()} />
        </div>
    );
}

export default ImageBeingEdited;