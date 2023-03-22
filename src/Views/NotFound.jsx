import { Grid, Typography, Container, Button } from "@mui/material"
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <Container sx={{ paddingTop: '200px' }}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={4}>
          <img src="https://i.imgur.com/3iPgkFE.png" width={350} alt="" />
        </Grid>
        <Grid item xs={8} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontWeight: 'bold', fontSize: '50px', paddingBottom: '20px' }}>PÁGINA NO ENCONTRADA.</Typography>
          <Typography sx={{ fontSize: '20px', paddingBottom: '20px'}}>
            Al parecer la página que estás buscando no existe, revisa que la dirección que buscas sea la correcta.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/home')}>
            Volver al inicio
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound;
