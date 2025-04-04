import React from 'react'
import './Cloudinary.css'
import { assets } from '../../assets';


const Cloudinary = () => {
  return (
    <>
    <div id="pfp_change">
        <button id="close_pfp">X</button>

        <div id="pfp_preview_container">
            <img id="pfp_preview" alt="Loading...">
        </div>
            
        <span id="upload_new_pfp">
            <label for="file_upload" id="upload_text">
                Upload
            </label>
            <input type="file" id="file_upload" accept=".png, .jpg, .jpeg">
        </span>
        <button id="new_pfp_save" disabled>Save</button>
    </div>
    </>
  )
}

export default Cloudinary