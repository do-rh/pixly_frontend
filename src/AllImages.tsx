import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loading from "./Loading";
import ImageCard from "./ImageCard";
import PixlyAPI from "./PixlyAPI"
import { ImageDataInterface } from "./interfaces";
import "./AllImages.css"


/** Renders loading or grid of all images
 * 
 * Props: None
 * State: images = [{id, caption, imageUrl, width, length}, ...]
 *        isLoading = boolean
 * 
 * Routes -> AllImages -> {ImageCard, Loading}
 * 
 * Location: /all
 * 
 */
function AllImages() {
  const [images, setImages] = useState<ImageDataInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getImages() {
      let results = await PixlyAPI.getAllImages();
      setImages(results);
      setIsLoading(false);
    } getImages();
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="container AllImages">
      <div className="row">
        {images.length === 0
          ? <h3>No images uploaded</h3>
          : images.map(image =>
            <div key={image.id} className="AllImages-imageCard col-sm">
              <Link to={`/image/${image.id}`}>
                <ImageCard src={image.imgUrl} caption={image.caption} dims={{ 'width': image.width, 'length': image.length }} />
              </Link>
            </div>)
        }
      </div>
    </div >
  )
}

export default AllImages