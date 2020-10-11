import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddArts = (props) =>{
    const [artTitle , setArtTitle] = useState('')
    const [pictureResource, setPictureResource] = useState({ preview: "", raw: "" })
    const [pictureDescription, setPictureDescription] = useState('')
    //name?  phone_email? bid? contact?

    const updateDataEvent = async (e) => {
        //e.preventDefault();
        const formData = new FormData();
        formData.append("image", pictureResource.raw);
        try {
            await fetch("localhost:3001/addArt", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: formData
            });
            toast.success(" ✔️ New Art work added succesfully!")
            window.location = '/art'
        } catch(error){
            toast.warn("Fail to connect to the server")
            console.error(error);
        }
       
    }

    const onFileChange = e =>{

        // Update the state 
       if( e.target.files.length){
           console.log(e.target.files)
            setPictureResource({
                preview: URL.createObjectURL( e.target.files[0]),
                raw:  e.target.files[0]
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
                            { pictureResource.preview ? (
                            <img src={pictureResource.preview} alt="dummy" width="300" height="300" />) :
                            (
                                <h5 className="text-center">Upload your photo</h5>
                                
                            ) }
                            </label>

                            <input type="file" onChange={ onFileChange} /> 

                            
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