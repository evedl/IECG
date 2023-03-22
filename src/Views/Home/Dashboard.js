import React from 'react'
import Container from "@mui/material/Container"
import Buttons from "./ViewPublications";
const Dashboard = () => {

    return (
        <div>
            <Container fixed style={{paddingTop:22}}>
                <Buttons/>
            </Container>

        </div>
    )
}

export default Dashboard