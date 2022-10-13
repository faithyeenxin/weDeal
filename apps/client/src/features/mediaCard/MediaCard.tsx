import {
  useGetAllDealsQuery,
  useAddDownvoteMutation,
  useAddUpvoteMutation,
} from "../api/apiSlice";

import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
  IconButton,
  Grid,
  CardHeader,
} from "@mui/material";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import TextsmsIcon from "@mui/icons-material/Textsms";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { IDeal } from "../../Interface";
import intervalToDuration from "date-fns/intervalToDuration";
import { useNavigate, useParams } from "react-router-dom";
const positionSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

interface MediaCardProps {
  item: IDeal;
}

const uploadTimeFormat = {
  years: 39,
  months: 2,
  days: 20,
  hours: 7,
  minutes: 5,
  seconds: 0,
};

const MediaCard = ({ item }: MediaCardProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date();
  const uploadTimeObject = intervalToDuration({
    start: new Date(item.dealPostedDate),
    end: today,
  });

  const [addUpvote] = useAddUpvoteMutation();
  const [addDownvote] = useAddDownvoteMutation();

  const years = uploadTimeObject.years;
  const months = uploadTimeObject.months;
  const days = uploadTimeObject.days;
  const hours = uploadTimeObject.hours;
  const minutes = uploadTimeObject.minutes;
  const seconds = uploadTimeObject.seconds;

  let uploadedTimeString;

  if (years !== 0) {
    if (years === 1) {
      uploadedTimeString = `${years} year ago`;
    } else {
      uploadedTimeString = `${years} years ago`;
    }
  } else if (months !== 0) {
    if (months === 1) {
      uploadedTimeString = `${months} month ago`;
    } else {
      uploadedTimeString = `${months} months ago`;
    }
  } else if (days !== 0) {
    if (days === 1) {
      uploadedTimeString = `${days} day ago`;
    } else {
      uploadedTimeString = `${days} days ago`;
    }
  } else if (hours !== 0) {
    if (hours === 1) {
      uploadedTimeString = `${hours} hour ago`;
    } else {
      uploadedTimeString = `${hours} hours ago`;
    }
  } else if (minutes !== 0) {
    if (minutes === 1) {
      uploadedTimeString = `${minutes} minute ago`;
    } else {
      uploadedTimeString = `${minutes} minutes ago`;
    }
  } else {
    if (seconds === 1) {
      uploadedTimeString = `${seconds} second ago`;
    } else {
      uploadedTimeString = `${seconds} seconds ago`;
    }
  }

  return (
    <Card
      sx={{
        width: 240,
        height: 410,
      }}
    >
      <Typography sx={{ textAlign: "right", mr: 1 }}>
        {uploadedTimeString}
      </Typography>
      <CardMedia
        component="img"
        height="200"
        image={item?.DealImages[0]?.image}
        sx={{ mt: "5%", mb: "5%" }}
      />
      <CardContent sx={{ height: "115px" }}>
        <Typography
          gutterBottom
          variant="h6"
          sx={{ fontFamily: "Arial", pb: 0, color: "#fbb002" }}
          component="div"
        >
          {item.name.slice(0, 40)}...
        </Typography>
        <Grid container spacing={1} sx={{ mb: 1 }}>
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Arial",
                textDecoration: "line-through",
                color: "gray",
              }}
            >
              ${item.retailPrice}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "Arial",

                color: "red",
              }}
            >
              ${item.discountedPrice}
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Typography
            variant="h6"
            sx={{ fontFamily: "Arial" }}
            color="text.secondary"
          >
            {item.location}
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container>
          <Grid item xs={6}>
            <Grid container>
              <Grid item md={4} sx={positionSx}>
                <IconButton onClick={() => addDownvote(item.id)}>
                  <ThumbDownOffAltIcon sx={{ color: "red" }} />
                </IconButton>
              </Grid>
              <Grid item md={4} sx={positionSx}>
                <Typography variant="h5" sx={{ fontFamily: "Arial" }}>
                  {item.totalUpvotes - item.totalDownvotes}
                </Typography>
              </Grid>
              <Grid item md={4} sx={positionSx}>
                <IconButton onClick={() => addUpvote(item.id)}>
                  <ThumbUpOffAltIcon sx={{ color: "green" }} />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              pr: 0.5,
            }}
          >
            <IconButton href={`/${id}/deal/${item.id}`}>
              <MoreHorizIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
