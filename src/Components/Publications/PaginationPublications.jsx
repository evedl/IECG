import React from 'react';
import Box from "@mui/material/Box";
import {Pagination} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const PaginationPublications = (props) => {
    const Publications = useSelector((state) => state.publication.TotalPublications)
    const [pageTotal, setPageTotal] = React.useState(1);
    const [page, setPage] = React.useState(1);
    const navigate = useNavigate();

    React.useEffect(()=>{
        if(isNaN(props.index)){
            setPage(1)
        }else {
            setPage(parseInt(props.index))
        }
    },[props.index])

    React.useEffect(() => {
        if(Publications.length%10 === 0){
            setPageTotal(Publications.length/10)
        }else{
            setPageTotal(parseInt(Publications.length/10)+1)

        }
    }, [Publications])



    const ChangePage = (e,page) => {
        navigate(`/${props.path}/${page}`)
    }

    return(
      <Grid item xs={12} >
          <Box sx={{
              my: 2,
              mx: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}>
              <Pagination page={parseInt(page)} count={pageTotal} onChange={(e,page)=>{ChangePage(e,page)}} color="primary" />
          </Box>
      </Grid>
  )
}

export default PaginationPublications;