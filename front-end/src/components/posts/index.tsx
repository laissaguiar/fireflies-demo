import CustomButton from "@/components/atoms/CustomButton";
import { Box, Divider, Grid, Rating, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

interface PostsPreviewProps {
  img?: any;
  name?: string;
}

const Posts = ({ img, name }: PostsPreviewProps) => {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <Grid item xs={12} mb={2}>
      <Box display="flex" p={2}>
        <Box position={"relative"} height="100px" minWidth={"70px"}>
          <Image
            style={{ borderRadius: "0px" }}
            src={img}
            fill
            objectFit="contain"
            alt="Picture of the author"
          />
        </Box>

        <Box pl={2} display="flex" flexDirection="column">
          <Typography fontWeight={700} pb="8px">
            {name}
          </Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ paddingTop: "16px" }} />
    </Grid>
  );
};

export default Posts;
