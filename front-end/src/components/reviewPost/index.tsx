import {
  Box,
  Divider,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useGlobalStore } from "@/globalStore";

interface ReviewPostProps {
  img?: any;
  name?: string;
  description?: string;
  rating: number;
  comment: string;
}

const ReviewPost = ({
  img,
  name,
  description,
  rating,
  comment,
}: ReviewPostProps) => {
  const theme = useTheme();
  const { user_id } = useGlobalStore();

  return (
    <Grid item xs={12} mb={2}>
      <Box display="flex" p={2}>
        <Box position={"relative"} height="120px" minWidth={"90px"}>
          <Image
            style={{ borderRadius: "0px" }}
            src={img}
            fill
            objectFit="contain"
            alt="Picture of the author"
          />
        </Box>

        <Box pl={2} display="flex" flexDirection="column">
          <Typography fontWeight={700}>{name}</Typography>

          <Typography fontWeight={300} fontSize={"14px"} pb="24px">
            {comment}
          </Typography>
          <Box display="flex">
            <Rating name="read-only" value={rating} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ paddingTop: "16px" }} />
    </Grid>
  );
};

export default ReviewPost;
