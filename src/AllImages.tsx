import { useEffect, useState } from "react";
import Loading from "./Loading";
import ImageCard from "./ImageCard";
import PixlyAPI from "./PixlyAPI"
import { ImageDataInterface } from "./interfaces";


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
    < div >
      {images.length === 0
        ? <h3>No images uploaded</h3>
        : images.map((image) =>
          <ImageCard src={image.imgUrl} caption={image.caption}></ImageCard>)
      }
    </div >
  )
}

export default AllImages