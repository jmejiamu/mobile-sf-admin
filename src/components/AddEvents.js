import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

const AddEvents = (props) => {
    const [descriptionData, setDescriptionData] = useState('');
    const [notesData, setNotesData] = useState('');
    const [locationData, setLocationData] = useState('');
    const [durationData, setDurationData] = useState('');
    const [startData, setStartData] = useState('');
    const [endData, setEndData] = useState('');

    //form validation
    const [descriptionError, setDescriptionError ] = useState('');
    const [locationError, setLocationError ] = useState('');
    const [noteError, setNoteError ] = useState('');
    const [durationDateError, setDurationDateError ] = useState('')
    const [startDateError, setStartDateError ] = useState('')
    const [endDateError, setEndDateError ] = useState('');


    const formValidation = (ret) =>{
        var validForm = ret
        if (descriptionData.length <= 0){
            setDescriptionError("The title cannot be empty")
            validForm = false  
        } else {  setDescriptionError('') }

        if (descriptionData.length <= 0){
            setNoteError("The description cannot be empty")
            validForm = false  
        } else {  setNoteError('') }

        if ( locationData.length <= 0){ 
            setLocationError("The location cannot be empty")
            validForm = false 
           
        } else {setLocationError('')}

        var regex = /^((\d{2})?\d{1,2}-){2}\d{2}$/;
        if (  regex.test(startData) === false) {
            setStartDateError("Please match the format yyyy-mm-dd ")
            validForm = false
        } else {setStartDateError('')}

        if (  regex.test(endData) === false  ) {
            setEndDateError("Please match the format yyyy-mm-dd ")
            validForm = false
        } else {setEndDateError('')}

        var regex2 = /^(\d{1,2}-\d{1,2})\s-\s(\d{1,2}-\d{1,2})$/;
        if (regex2.test(durationData) === false){
            setDurationDateError('Please match the format hh-mm - hh-mm ')
            validForm = false
        }else {setDurationDateError('')}
    
        return validForm
    }


    const updateDataEvent = async (e) => {
        var valid = true;
        // e.preventDefault();
         
        valid = formValidation(valid)
        try {
            const body = {
                start_date: startData,
                end_date: endData,
                description: descriptionData,
                duration: durationData,
                notes: notesData,
                location: locationData,
                
            }
            
            if (valid === true){
                const response = await fetch(`http://157.245.184.202:8080/addEvent`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
                toast.success(" ✔️ New Event added succesfully!")
                window.location = '/events'
            }
        } catch (error) {
            console.error(error);
        }
        
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
                                data-tip="Please enter the description of the event"
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={descriptionData}
                                onChange={e => setDescriptionData(e.target.value)}  />
                            
                            <ReactTooltip effect="solid" />

                           {descriptionError.length> 0 &&
                            <span className='error' style={{color: 'red'}}>{descriptionError}</span>}


                            <label></label>
                            <textarea
                                type="text"
                                className="form-control"
                                placeholder="Description"
                                value={notesData}
                                onChange={e => setNotesData(e.target.value)} ></textarea>

                            {noteError.length> 0 &&
                            <span className='error'style={{color: 'red'}}>{noteError} </span>}

                            <label></label>
                            <textarea
                                type="text"
                                placeholder="Location"
                                className="form-control"
                                value={locationData}
                                onChange={e => setLocationData(e.target.value)}></textarea>
                            {locationError.length> 0 &&
                            <div className='error'style={{color: 'red'}}>{locationError}</div>}

                            <label>From</label>
                            <input
                                type="text"
                                placeholder="hh-mm - hh-mm"
                                className="form-control"
                                value={durationData}
                                onChange={e => setDurationData(e.target.value)}/>
                            {durationDateError.length> 0 &&
                            <div className='error'style={{color: 'red'}}>{durationDateError}</div>}


                            <label>Start Date</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="yyyy-mm-dd"
                                value={startData}
                                onChange={e => setStartData(e.target.value)}  />

                            {startDateError.length> 0 &&
                            <div className='error'style={{color: 'red'}}>{startDateError}</div>}

                            <label>End Date </label>
                            <input
                                type="text"
                                placeholder="yyyy-mm-dd"
                                className="form-control"
                                value={endData}
                                onChange={e => setEndData(e.target.value)}  />

                             {endDateError.length> 0 &&
                            <span className='error'style={{color: 'red'}}>{endDateError}</span>}
                    
                        </div>


                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-danger"
                                //data-dismiss="modal"
                                onClick={e => updateDataEvent(e.target.value)}
                                >ADD</button>

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}
export default AddEvents;