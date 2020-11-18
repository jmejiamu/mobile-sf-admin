import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddArts = (props) => {
    const [artTitle, setArtTitle] = useState('')
    const [pictureResource, setPictureResource] = useState({ preview: "", raw: "" })
    const [pictureDescription, setPictureDescription] = useState('')
    const [descriptionData, setDescriptionData] = useState('');
    const [titleData, setTitleData] = useState('');
    const [bidData, setBidData] = useState('');
    //name?  phone_email? bid? contact?

    //form validation
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [pictureError, setPictureError] = useState('');
    const [bidError, setBidError] = useState('');

    const updateDataEvent = async (e) => {
        //e.preventDefault();

        var valid = formValidation()

        if (valid) {

            const formData = new FormData();
            formData.append("title", titleData);
            formData.append("description", descriptionData);
            formData.append("photo", pictureResource.raw);
            formData.append("minimunbid", bidData);
            try {
                await fetch("http://157.245.184.202:8080/addart", {
                    method: "POST",
                    headers: {
                        //remove content type for the system to generate boundary parameter
                        //"Content-Type": "multipart/form-data"  
                        //"Content-Type": "application/json"
                    },
                    body: formData

                });
                toast.success(" ✔️ New Art work added succesfully!")
                window.location = '/arts'
            } catch (error) {
                toast.warn("Fail to connect to the server")
                console.error(error);
            }


        }


    }

    const formValidation = () => {
        var validForm = true
        if (descriptionData.length <= 0) {
            setDescriptionError("The description cannot be empty")
            validForm = false
        } else { setDescriptionError('') }

        if (titleData.length <= 0) {
            setTitleError("The title cannot be empty")
            validForm = false
        } else { setTitleError('') }

        if (pictureResource.raw.length <= 0) {
            setPictureError("Please submit a picture")
            validForm = false
        } else { setPictureError('') }

        if (bidData.length <= 0) {
            setBidError("Please set up minimun bid")
            validForm = false
        } else { setBidError('') }

        return validForm
    }

    const onFileChange = e => {

        // Update the state 
        if (e.target.files.length) {
            console.log(e.target.files)
            setPictureResource({
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
                data-target="#addModal">
                Add Art work</button>

            <div className="modal" id="addModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title modal-style">Add Art</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body modal-style">

                            <label htmlFor="upload-button">

                                {pictureResource.preview ? (
                                    <img src={pictureResource.preview} alt="dummy" width="300" height="300" />) :
                                    (
                                        <h5 className="text-center">Upload your photo</h5>

                                    )}
                            </label>
                            
                            <label></label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="title"
                                value={titleData}
                                onChange={e => setTitleData(e.target.value)} ></textarea>

                            {titleError.length > 0 &&
                                <span className='error' style={{ color: 'red' }}>{titleError} </span>}


                            <label></label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={descriptionData}
                                onChange={e => setDescriptionData(e.target.value)} ></textarea>

                            {descriptionError.length > 0 &&
                                <span className='error' style={{ color: 'red' }}>{descriptionError} </span>}

                            <label></label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Set minimun bid"
                                value={bidData}
                                onChange={e => setBidData(e.target.value)} ></textarea>

                            {bidError.length > 0 &&
                                <span className='error' style={{ color: 'red' }}>{bidError} </span>}



                            <input
                                type="file"
                                name="file"
                                onChange={onFileChange} />

                            {pictureError.length > 0 &&
                                <span className='error' style={{ color: 'red' }}>{pictureError} </span>}

                        </div>


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
    )


}

export default AddArts;