import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Arts from './Arts';
import Events from './Events';
import Assistance from './Assisstance/Assistance';
import Allbids from './Bids/Allbids';
import NavBar from './NavBar';

import { Button ,Tab ,Nav, Row, Col} from 'react-bootstrap';


const MenuItems = (props) => {
    const [name, setName] = useState("");
    console.log("setIfRegister in menu,", props.setIfRegister);

    const getName = async () => {
        try {
            const response = await fetch('http://157.245.184.202:8080/dashboard', {
                method: 'GET',
                headers: { token: localStorage.jwt }
            });
            const data = await response.json()

            setName(data.name)

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        getName();
    }, [])


    
    return (
        <>
        
        <style type="text/css">
        {`
        .nav {
        //background-color: white;
        color: white;
        }

        .nav-item {
        font-size: 1.0rem;
        
        }

        .nav-pills .nav-link.active{
            background-color: red;
        }
7
        `}
    </style>
            <NavBar setAuth={props.setAuth} name={name} />

            <h1 className="dashboard">Dashboard </h1>

            <Tab.Container id="left-tabs" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="first">Arts</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="second">Events</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="third">Assistance</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="fourth">Bids</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={9}>
                <Tab.Content>
                    <Tab.Pane eventKey="first">
                    <Arts />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Events />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Assistance />
                    </Tab.Pane>
                    <Tab.Pane eventKey="fourth">
                    <Allbids />
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
            </Tab.Container>


        </>
    )
}

export default MenuItems;