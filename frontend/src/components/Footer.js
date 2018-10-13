import React from 'react';
import {Grid} from 'react-bootstrap';

function Footer() {
    return (
        <footer  style={{backgroundColor:'black'}}>
            <Grid>
                <div className="text-center small copyright" style={{color:'white'}}>
                    © USA 2018
                </div>
            </Grid>
        </footer>
    );
}

export default Footer;
