import {
  Avatar,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../Interface";
import format from "date-fns/format";
import MediaCard from "../components/MediaCard";
import { Box } from "@mui/system";
import { IDeal, IVotes } from "../Interface";
import MediaCardEdittable from "../components/MediaCardEdittabe";
const UserPage = () => {
  const { userid } = useParams();
  const [upvotes, setUpvotes] = useState(0);
  const [user, setUser] = useState<IUser>({
    id: "",
    username: "",
    password: "",
    name: "",
    image: "",
    email: "",
    dateJoined: new Date(),
    Deals: [],
  });

  useEffect(() => {
    axios
      .get(`/api/user/${userid}`)
      .then((res) => {
        setUser(res.data);
        console.log(res.data)
        return axios.get(`/api/votes/byuser/${userid}`).then((res)=>{
          console.log(res.data)
          let totalUpvotes = 0
          res.data.forEach((vote: IVotes)=>vote.voteStatus===1&&totalUpvotes++)
          console.log(totalUpvotes)
          setUpvotes(totalUpvotes)}
          // setUpvotes(
          // res.data.Deals.reduce((acc: number, obj: IDeal) => {
          //   return acc + obj.totalUpvotes;
          // }, 0))
          );
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          mt: 5,
          mb: 5,
          p: 2,
          backgroundColor: "#efe0d3",
          borderRadius: "2%",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar src={user.image} sx={{ width: 130, height: 130 }} />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "left",
            }}
          >
            <Grid container rowSpacing={1} sx={{ m: 3 }}>
              <Grid item xs={12}>
                <Typography variant="body2">Username</Typography>
                <TextField
                  disabled
                  size="small"
                  value={user.username}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Joined On</Typography>
                <TextField
                  disabled
                  size="small"
                  value={format(new Date(user.dateJoined), "dd MMMM yyyy")}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2">Deals Created</Typography>
                <TextField
                  disabled
                  size="small"
                  value={user?.Deals?.length}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2"> Total Upvotes-To-Date</Typography>
                <TextField
                  disabled
                  size="small"
                  value={upvotes}
                  sx={{
                    width: "100%",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {user?.Deals?.length !== 0 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: "3rem",
            mb: "3rem",
            p: 3,
            borderRadius: "1%",
            backgroundColor: "#efe0d3",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontFamily: "Futura",
              color: "#fbb002",
              fontWeight: "bold",
              letterSpacing: 6,
              pb: 5,
            }}
            align="center"
          >
            Deals Contributed
          </Typography>
          <Grid container rowSpacing={3} columnSpacing={1}>
            {user?.Deals?.map((deal, index) => {
              return (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MediaCard item={deal} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default UserPage;
