import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Endpoint from '../shared/Endpoint/Endpoint';

const baseUrl = Endpoint.url;

const EditCd = (props) => {
    const [title, setTitle] = useState(props.cd.title);
    const [cost, setCost] = useState(props.cd.details); //cost
    const [contact, setContact] = useState(props.cd.contact); // details
    const [currentPicturePath, setCurrentPicturePaht] = useState(props.cd.path);
    const [pictureResource, setPictureResource] = useState({ preview: "", raw: "" });

    const [longDescriptionData, setLongDescriptionData] = useState(props.cd.long_description);
    const [authorPictureResource, setAuthorPictureResource] = useState({ preview: "", raw: "" })

    const updateDataEvent = async (e) => {

        try {

            const formData = new FormData();
            formData.append("title", title)
            formData.append("details", cost)
            formData.append("contact", contact)
            formData.append("photo", pictureResource.raw)

            formData.append("long_description", longDescriptionData)
            formData.append("author_image", authorPictureResource )

            const response = await fetch(`${baseUrl}/updateCd/${props.cd.id}`, {
                method: 'PUT',
                headers: {
                    // 'Content-Type': 'application/json'
                },
                body: formData
            })

            const data = await response.json()
            if (data.data) {
                toast.success("✔️ succesfully Updated")
            } else {
                toast.error("❌ Error occur")

            }

        } catch (error) {
            console.error(error);
        }
        window.location = '/Cds'
    }

    const onFileChange = e => {
        if (e.target.files.length) {
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
                className="btn btn-danger "
                data-toggle="modal"
                data-target={`#id${props.cd.id}`}>
                Edit</button>

            <div className="modal" id={`id${props.cd.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title modal-style">Edit Event</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <label htmlFor="upload-button">
                            
                            {pictureResource.preview ? (
                                <img src={pictureResource.preview} alt="updated-pic-view" width="100%" height="300" />) :
                                (
                                    <h5 className="text-center">Upload your photo</h5>

                                )}
                        </label>



                        <div className="modal-body modal-style">
                            <label>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={title}
                                onChange={e => setTitle(e.target.value)} />
                            <label>Cost</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={cost}
                                onChange={e => setCost(e.target.value)} ></textarea>
                            <label>Details</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={contact}
                                onChange={e => setContact(e.target.value)}></textarea>
                            {currentPicturePath?
                            (<div>Currently the server has image for the piece</div>)
                            :(<div>No available image for the piece. Please upload one</div>) }
                            <input className="my-3"
                                type="file"
                                name="file"
                                onChange={onFileChange}
                            />

                            

                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={e => updateDataEvent(e.target.value)}>Edit</button>

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default EditCd;