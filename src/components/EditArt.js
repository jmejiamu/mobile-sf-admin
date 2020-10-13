import React, { useState } from 'react';

const EditArt = (props) => {
    const [title, setTitle] = useState(props.art.title);
    const [cost, setCost] = useState(props.art.details); //cost
    const [contact, setContact] = useState(props.art.contact); // details

    const updateDataEvent = async (e) => {

        // e.preventDefault();
        try {
            const body = {
                title: title,
                deatils: cost, //cost
                contact: contact, //details
            }

            const response = await fetch(`http://157.245.184.202:8080/updateEvent/${props.event.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error(error);
        }
        window.location = '/events'
    }

    return (
        <div>
            <button
                type="button"
                className="btn btn-danger "
                data-toggle="modal"
                data-target={`#id${props.art.id}`}>
                Edit</button>

            <div className="modal" id={`id${props.art.id}`}>
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title modal-style">Edit Event</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


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
                            <label>Deatils</label>
                            <textarea
                                type="text"
                                className="form-control"
                                value={contact}
                                onChange={e => setContact(e.target.value)}></textarea>

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
export default EditArt;