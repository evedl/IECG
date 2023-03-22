import React from "react"
import { Typography, Container, Grid, Avatar, Divider, Chip, Badge } from "@mui/material"
import { blue } from "@mui/material/colors"
import { GetSelf } from "../../Service/UserService"
import { LocationOn } from "@mui/icons-material"
import TrayectoriaCard from "../../Components/Trayectoria/TrayectoriaCard"
import Options from "../../Components/Avatar/Options"
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "@mui/material/Link";
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RecommendIcon from '@mui/icons-material/Recommend';

const Account = () => {
  const [user, setUser] = React.useState({})
  const [loading,Setloading] = React.useState(true)

  React.useEffect(() => {
    GetSelf()
      .then((res) => {
        setUser(res.data)
        localStorage.setItem('UrlAvatar', res.data.UrlAvatar)
        Setloading(false)
      })
      .catch((err) => {
      })
  }, [])

  const Trayectoria = () => {

    return (
      <>
      <Divider>Estudio</Divider>
        {user.Trayectoria.map((trayectoria) => {
          if(trayectoria.Tipo === "Estudio") {
            return (
              <TrayectoriaCard key={trayectoria}
                                        title={trayectoria.Title}
                                        start={trayectoria.StartPeriod}
                                        end={trayectoria.EndPeriod}
                                        description={trayectoria.Description}
                                        card={true}
                                        icon={<SchoolIcon/>}/>
            )
          }
          return null
        })}
      <Divider>Logro</Divider>
        {user.Trayectoria.map((trayectoria) => {
          if(trayectoria.Tipo === "Logro") {
            return (
              <TrayectoriaCard key={trayectoria}
                                         title={trayectoria.Title}
                                         start={trayectoria.StartPeriod}
                                         end={trayectoria.EndPeriod}
                                         description={trayectoria.Description}
                                         card={true}
                                         icon={<EmojiEventsIcon/>}/>
                                         )
          }
          return null
        })}
      <Divider>Otros</Divider>
        {user.Trayectoria.map((trayectoria) => {
          if(trayectoria.Tipo === "Otro") {
            return (
              <TrayectoriaCard key={trayectoria}
                                         title={trayectoria.Title}
                                         start={trayectoria.StartPeriod}
                                         end={trayectoria.EndPeriod}
                                         description={trayectoria.Description}
                                         card={true}
                                         icon={<RecommendIcon/>}/>
                                         )         
          }
          return null
        })}
      </>
    )
  }

  return (
    <div>
      <Container>
        <Grid container flexDirection="column" justifyContent="center" sx={{ padding: 2 }}>
          <Grid align="center">
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Options />
              }
            >
              <Avatar
                variant="circular"
                src={user.UrlAvatar || "avatar1.jpg"}
                sx={{ width: 130, height: 130, marginTop: 2, marginBottom: 2 }}
              />   
            </Badge>
          </Grid>
          <Grid>
            <Typography gutterBottom variant="h4" component={"div"} textAlign={"center"}>
              {user.Nombre} {user.Apellidos}
            </Typography>
            <Typography variant="body" component={"div"} textAlign={"center"} sx={{ marginBottom: 2 }}>
              {user.Email}
            </Typography>
            <Typography variant="body" component={"div"} textAlign={"center"} sx={{ marginBottom: 2 }}>
              {user.Telefono}
            </Typography>
            <Typography textAlign="center" variant="body2" color="text.secondary">
              <LocationOn sx={{ color: blue[500] }} /> {user.Ubicacion}
            </Typography>
            <br />
            <Divider>
              <Typography gutterBottom variant="body1">
                Redes Sociales
              </Typography>
            </Divider>
            <Grid align={"center"}>
              {!loading && (
                <>
                {user.Social.Facebook.includes("https://") && (
                    <Link href={user.Social.Facebook}>
                      <FacebookIcon/>
                    </Link>
                )}
                {!user.Social.Facebook.includes("https://") && (
                    <Link href={"https://"+user.Social.Facebook}>
                      <FacebookIcon/>
                    </Link>
                )}
                </>
              )
              }

            </Grid>
            <br />
          </Grid>
          <Divider>
            <Typography gutterBottom variant="body1">
              Etiquetas
            </Typography>
          </Divider>
          <Grid container align={"center"}>
            {user.Etiquetas && (
              <>
                {user.Etiquetas.map((tag, index) => (
                  <Grid key={index} item xs={2}>
                    <Chip
                      color="success"
                      style={{ marginTop: 10, marginBottom: 10 }}
                      label={tag}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
          {user.Trayectoria && (
            <Trayectoria />
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Account;
