import React, { useEffect, useState } from "react";
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
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import TextsmsIcon from "@mui/icons-material/Textsms";
import EditIcon from "@mui/icons-material/Edit";
import { IDeal, IVotes } from "../Interface";
import intervalToDuration from "date-fns/intervalToDuration";
import { useNavigate, useParams } from "react-router-dom";

import { useSearchAllVotesByDealIdQuery } from "../features/api/votesSlice";
import { InsertEmoticon } from "@mui/icons-material";
import axios from "axios";

const positionSx = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

interface MediaCardDisplayOnlyProps {
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

const MediaCardDisplayOnly = ({ item }: MediaCardDisplayOnlyProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const today = new Date();
  const uploadTimeObject = intervalToDuration({
    start: new Date(item.dealPostedDate),
    end: today,
  });
  const [totalVotes, setTotalVotes] = useState(0);

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

  useEffect(() => {
    axios
      .get(`/api/votes/bydeal/${item.id}`)
      .then((res) => {
        let allVotes = 0;
        res.data.map((vote: IVotes) => (allVotes += vote.voteStatus));
        setTotalVotes(allVotes);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Card
      sx={{
        width: 250,
        height: 430,
      }}
    >
      <Grid container sx={{ mt: 2, mb: 2 }}>
        <Grid item xs={6} sx={{ pl: 1 }}>
          <Grid container sx={{ gap: 1 }}>
            {totalVotes > 0 ? (
              <SentimentSatisfiedAltIcon sx={{ color: "#a1c060" }} />
            ) : (
              <SentimentVeryDissatisfiedIcon sx={{ color: "#e9622a" }} />
            )}

            <Typography
              variant="body1"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: totalVotes > 0 ? "#a1c060" : "#e9622a",
              }}
            >
              {totalVotes}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ textAlign: "right", pr: 1 }}>
            {uploadedTimeString}
          </Typography>
        </Grid>
      </Grid>
      <CardMedia
        component="img"
        height="200"
        image={item?.DealImages[0]?.image}
        sx={{ mt: "5%", mb: "5%" }}
      />
      <CardContent sx={{ height: "113px" }}>
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
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "right",
              pr: 1,
            }}
          >
            <IconButton
              onClick={() => {
                navigate(`/deal/${item.id}`);
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default MediaCardDisplayOnly;
