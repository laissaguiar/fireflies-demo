"use client";
import { Grid } from "@mui/material";

interface InternalTemplateProps {
  children?: React.ReactNode;
}

const InternalTemplate = ({ children }: InternalTemplateProps) => {
  return (
    <Grid container display="flex" justifyContent={"center"}>
      <Grid container item maxWidth="1024px">
        {children}
      </Grid>
    </Grid>
  );
};

export default InternalTemplate;
