import React, { useState } from 'react';
import { Link } from "react-router-dom";

import ImageCard from './ImageCard';
import UploadImgForm from './UploadImgForm';
import PixlyAPI from './PixlyAPI';

import { ImageDataInterface } from './interfaces';
import './ImageUpload.css';


/** Renders image upload form or displays uploaded image
 * 
 * State: imageUrl - url string
 * Props: none
 * Functions: handleImgUpload passed down to UploadImgForm
 * 
 * Routes -> ImageUpload -> {ImageCard, UploadImgForm}
 * 
 * Location: /upload
 */


function ImageUpload() {

  const [image, setImage] = useState<ImageDataInterface | null>(null);

  async function handleImgUpload(image: File, caption: string): Promise<void> {
    const formData = new FormData();
    formData.append(
      'file',
      image,
      image.name
    );

    formData.append('caption', caption);

    const imgData = await PixlyAPI.uploadImage(formData);

    setImage(imgData);

    // return <Redirect push to='imageLoaction'
    //add loading spinner 
  }

  return (
    <div>
      {image
        ? (
          <React.Fragment>
            <ImageCard src={image.imgUrl} caption={image.caption} />
            <Link to={`/image/${image.id}`}>
              <button className="btn btn-secondary">Edit Image</button>
            </Link>
          </React.Fragment>
        )
        : <UploadImgForm handleImgUpload={handleImgUpload} />
      }
    </div >
  );
}

export default ImageUpload;