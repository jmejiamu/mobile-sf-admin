import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import Endpoint from '../shared/Endpoint/Endpoint';

const baseUrl = Endpoint.url;

const AddDetails = (props) => {
    const [longDescriptionData, setLongDescriptionData] = useState();
   
    const [authorPictureResource, setAuthorPictureResource] = useState({ preview: "", raw: "" })
    const [currentAuthorImageName, SetcurrentAuthorImageName] = useState(props.art.author_image)

    const [descriptionError, setDescriptionError] = useState('');
    const [pictureError, setPictureError] = useState('');

  
    const updateDataEvent = async (e) => {
        //e.preventDefault();

        var valid = formValidation()

        if (valid) {

            const formData = new FormData();        
            formData.append("long_description", longDescriptionData);
            formData.append("photo", authorPictureResource.raw);

            try {
                await fetch("http://157.245.184.202:8080/addetail", {
                    method: "POST",
                    headers: {
                        //remove content type for the system to generate boundary parameter
                    },
                    body: formData

                });
                toast.success(" ✔️ New Art work added succesfully!")
                //window.location = '/arts'
            } catch (error) {
                toast.warn("Fail to connect to the server")
                console.error(error);
            }


        }


    }
    const formValidation = () => {
        var validForm = true
        if (longDescriptionData.length <= 0) {
            setDescriptionError("The description cannot be empty")
            validForm = false
        } else { setDescriptionError('') }

        if (authorPictureResource.raw.length <= 0) {
            setPictureError("Please submit a picture")
            validForm = false
        } else { setPictureError('') }

        return validForm
    }

    
    const onFileChange = e => {

        // Update the state 
        if (e.target.files.length) {
            console.log(e.target.files)
            setAuthorPictureResource({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }

    }

    return (
        <div>
        <button
            type="button"
            className="btn btn btn-danger mb-4  mt-5 d-flex justify-content-end"
            data-toggle="modal"
            data-target="#detailModal">
            Add More Details</button>

            <div className="modal" id="detailModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title modal-style">Add Details</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body modal-style">

                            <label htmlFor="upload-button">
  
                                {authorPictureResource.preview ? (
                                    <img src={authorPictureResource.preview} alt="dummy" width="300" height="300" />) :
                                    (
                                        <h5 className="text-center">Upload author photo</h5>

                                    )}
                            </label>

                            <label></label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Author Bio"
                                value={longDescriptionData}
                                onChange={e => setLongDescriptionData(e.target.value)} ></textarea>

                            {descriptionError.length > 0 &&
                                <span className='error' style={{ color: 'red' }}>{descriptionError} </span>}

                            {currentAuthorImageName?
                            (<div>Currently the server has author image</div>)
                            :(<div>No author image in the server</div>) }

                            <input
                                type="file"
                                name="file"
                                onChange={onFileChange} />

                            {pictureError.length > 0 &&
                                <span className='error' style={{ color: 'red' }}>{pictureError} </span>}


                            <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-danger"
                                //data-dismiss="modal"
                                onClick={e => updateDataEvent(e.target.value)}
                            >Upload</button>

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddDetails;