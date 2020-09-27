import React from 'react';

const Register = () => {
    return (
        <div>
            <h1 className="events-section">Register</h1>

            <label className="text-white">User Name</label>
            <input
                type="text"
                placeholder="User name"
                className="form-control"
            // value={startData}
            // onChange={e => setStartData(e.target.value)} 
            />

            <label className="text-white">Email</label>
            <input
                type="text"
                placeholder="Email"
                className="form-control"
            // value={startData}
            // onChange={e => setStartData(e.target.value)} 
            />

            <label className="text-white">Password</label>
            <input
                type="text"
                placeholder="Password"
                className="form-control"
            // value={startData}
            // onChange={e => setStartData(e.target.value)} 
            />
            <button type="button" className="btn btn-danger btn-sm mt-5">Register</button>
        </div>
    );
};

export default Register;