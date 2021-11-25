import "./ImageCard.css"

interface CardPropsInterface {
    src: string;
    caption: string;
    dims?: {width: number, length:number}
}
/** Card: displays image.
 * 
 * Props:
 * - caption: string describing the image
 * - src: url for image
 * 
 * State:
 * - none
 * 
 * {ImageUpload, AllImages} -> ImageCard
 */

function ImageCard({ src, caption, dims }: CardPropsInterface) {

    return (
        <div className="Image-card">
            <img className="Image-card-image" src={src} alt="uploaded img" style={{ "width": "400px" }} />
            <i className="Image-card-caption">{caption}</i>
            {(dims?.width) && <b className="Image-card-dimensions">{dims.width}x{dims.length}px</b>}
            
        </div>
    );
}

export default ImageCard;
