import Endpoint from '../Endpoint/Endpoint';

const baseUrl = Endpoint.url;

export default {
    addLog: (username, event, category) => {
        console.log("add,", username, event, category);
        return fetch(`${baseUrl}/insertLog/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.jwt
            },
            
           body: JSON.stringify({
               username: username,
               event: event,
               category: category
           })
        })
    }
}