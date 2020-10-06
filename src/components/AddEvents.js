import React, { useState } from 'react';

const AddEvents = (props) => {
    const [descriptionData, setDescriptionData] = useState('');
    const [notesData, setNotesData] = useState('');
    const [locationData, setLocationData] = useState('');
    const [durationData, setDurationData] = useState('');
    const [startData, setStartData] = useState('');
    const [endData, setEndData] = useState('');

    const updateDataEvent = async (e) => {

        // e.preventDefault();
        try {
            const body = {
                start_date: startData,
                end_date: endData,
                description: descriptionData,
                duration: durationData,
                notes: notesData,
                location: locationData,

            }

            const response = await fetch(`http://157.245.184.202:8080/addEvent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })
        } catch (error) {
            console.error(error);
        }
        window.location = '/events'
        // props.history.push('/events')
    }

    return (
        <div>
            <button
                type="button"
                className="btn btn btn-danger mb-4  mt-5 d-flex justify-content-end"
                data-toggle="modal"
                data-target="#addModal">
                Add Event</button>

            <div className="modal" id="addModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title modal-style">Add Event</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>


                        <div className="modal-body modal-style">
                            <label></label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={descriptionData}
                                onChange={e => setDescriptionData(e.target.value)} />
                            <label></label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={notesData}
                                onChange={e => setNotesData(e.target.value)} ></textarea>
                            <label></label>
                            <textarea
                                type="text"
                                placeholder="Location"
                                className="form-control"
                                value={locationData}
                                onChange={e => setLocationData(e.target.value)}></textarea>

                            <label>From</label>
                            <input
                                type="text"
                                placeholder="hh-mm - hh-mm"
                                className="form-control"
                                value={durationData}
                                onChange={e => setDurationData(e.target.value)} />
                            <label>Start Date</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="yyyy-mm-dd"
                                value={startData}
                                onChange={e => setStartData(e.target.value)} />
                            <label>End Date </label>
                            <input
                                type="text"
                                placeholder="yyyy-mm-dd"
                                className="form-control"
                                value={endData}
                                onChange={e => setEndData(e.target.value)} />
                        </div>


                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                                onClick={e => updateDataEvent(e.target.value)}>ADD</button>

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
export default AddEvents;