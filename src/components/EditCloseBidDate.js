import React, { useState } from 'react';
import { toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Endpoint from '../shared/Endpoint/Endpoint';

const baseUrl = Endpoint.url;


const EditCloseBidDate = (props) => {
    const [bidCloseDate, setBidCloseDate] = useState(new Date())
    const [category, setCategory] = useState('art')
    
    const updateDataEvent = async (e) => {

        // e.preventDefault();
        try {
            const body = {
                closeDate: bidCloseDate,
                category: category
            }

            const response = await fetch(`${baseUrl}/updateCloseDate`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
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
        window.location = '/events'
    }

    var message='Category selected: '+ category;

    return (
        
        <div>
            <button
                type="button"
                className="btn btn btn-danger mb-4  mt-5 d-flex justify-content-end"
                data-toggle="modal"
                data-target="#bidCloseDateModal">
                Change bid close date here</button>

            <div className="modal" id="bidCloseDateModal">
                <div className="modal-dialog">
                    <div className="modal-content">


                        <div className="modal-header">
                            <h4 className="modal-title modal-style">Edit close data</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body modal-style">

                        <div>
                        <label for="cars">Choose a category:</label>

                        <select 
                            value={category} 
                            onChange={e => setCategory(e.target.value)} 
                            name="products" id="shop" multiple>
                        <option value="art">art</option>
                        <option value="cds">cd</option>
                        <option value="dvds">dvd</option>
                        <option value="pictures">book</option>
                        <option value="photos">photos</option>
                        </select> 
                       <h3> {message}</h3>
                        </div>

                        <label for="cars">Choose a date</label>
                            <DatePicker
                                placeholder="yyyy-mm-dd"
                                className="form-control"
                                minDate={new Date()}
                                showTimeSelect
                                dateFormat={"yyyy-MM-dd hh:mm "}
                                selected={bidCloseDate}
                                onChange={e => setBidCloseDate(e)} />

    
                        </div>


                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-danger"
                                //data-dismiss="modal"
                                onClick={e => updateDataEvent(e.target.value)}
                            >Change</button>

                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCloseBidDate;