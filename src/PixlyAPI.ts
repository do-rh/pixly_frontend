import axios from 'axios';
import { ImageDataInterface } from './interfaces';

const API_URL = 'https://pixly-dorish.herokuapp.com';

/** List of API calls for Pixly App */
class PixlyAPI {

  /** Method for uploading images. Takes in formData object and 
   * returns {id, caption, imageUrl, width, length} */

  static async uploadImage(formData): Promise<ImageDataInterface> {
    try {
      const resp = await axios.post(`${API_URL}/upload`, formData);
      return (resp.data);
    }
    catch (err) {
      throw err;
    }
  }

  /** Method for getting all images in db. 
   * Returns [image, image,...] where image = {id, caption, imageUrl, width, length} 
   * */

  static async getAllImages(): Promise<ImageDataInterface[]> {
    try {
      const resp = await axios.get(`${API_URL}/all`)
      return resp.data.images;
    }
    catch (err) {
      throw err;
    }
  }

  /** Method for getting all images in db. 
   * Returns [image, image,...] where image = {id, caption, imageUrl, width, length} 
   * */

  static async getImage(id): Promise<ImageDataInterface> {
    try {
      const resp = await axios.get(`${API_URL}/image/${id}`)
      return resp.data.image;
    }
    catch (err) {
      throw err;
    }
  }

  /** Method for starting image edit. 
   *  Returns file_location of image on the server
   * */

  static async startEdit(id): Promise<string> {
    try {
      const resp = await axios.post(`${API_URL}/image/${id}/start_edit`)
      return resp.data.file_location;
    }
    catch (err) {
      throw err;
    }
  }

  /** Method for editing an image with by editType. 
   *  Returns file_location of image on the server
   * */

  static async edit(id, fileLocation, editType) {
    try {
      const resp = await axios.post(
        `${API_URL}/image/${id}/edit`,
        {
          'edit_type': editType,
          'file_location': fileLocation
        })
      console.log('in edit api', resp.data);
      return resp.data.file_location; //Need to confirm
    }
    catch (err) {
      throw err;
    }
  }


  /** Method for saving an editted image. 
   *  Returns the image details object and uploads the new image to AWS.
   * */

  static async saveEdits(id, fileLocation, caption): Promise<ImageDataInterface> {
    try {
      console.log('in saveEdits', { id, fileLocation, caption });
      const resp = await axios.post(
        `${API_URL}/image/${id}/save_edits`,
        {
          'caption': caption,
          'file_location': fileLocation
        })
      console.log('resp.data is:', resp.data);
      return resp.data; //Need to confirm
    }
    catch (err) {
      throw err;
    }
  }

}

export default PixlyAPI;