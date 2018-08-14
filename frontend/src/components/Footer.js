import React from 'react';
import { Grid, Nav, NavItem } from 'react-bootstrap';

function Footer() {
    return (
        <footer  style={{backgroundColor:'black'}}>
            <Grid>
                <Nav>
                    <NavItem
                        eventKey={1} >
                        Privacy policy
                    </NavItem>
                    <NavItem
                        eventKey={2}
                        title="Item" style={{marginLeft:"20px"}}>
                        Terms & Conditions
                    </NavItem>

                </Nav>

                <div className="text-center small copyright" style={{color:'white'}}>
                    © USA 2018
                </div>
            </Grid>
        </footer>
    );
}

export default Footer;