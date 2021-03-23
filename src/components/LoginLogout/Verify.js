import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const endpoint = 'http://localhost:3001';

const Verify = (props) =>{
    const path = window.location.pathname;
    const lastItem = path.substring(path.lastIndexOf('/') + 1);
 
    useEffect(()=>{
        console.log("useeffect");
        console.log("verify_account ", lastItem);
        
        const verify = async ()=>{
            const verify_account = await fetch(`${endpoint}/verifyEmail/${lastItem}`,{
                method: "GET"
            })
            
            const data = await verify_account.json();
            
            if (data.token) {
                    // document.cookie = `token=${data.token}`
                    toast.success(data.msg)
            } else {
                    //need to change the backend
                    toast.error(data.err)
            }
    
        }
        verify();
    }, []);
    
    return(
        <div className='container'>
            <div className='verify'>
                <h1 style={{color: 'white'}}>Your account has alread verified!</h1>
            </div>
        </div>
    )
}

export default Verify;