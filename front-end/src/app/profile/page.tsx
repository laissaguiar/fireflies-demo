"use client";
import React from "react";

import perfilImage from "@/assets/perfil.jpg";
import theTreeOfLife from "@/assets/treeOfLiffe.webp";
import ProfilePreview from "@/components/molecules/ProfilePreview";
import Menu from "@/components/menu";
import BasicTabs from "@/components/tab";
import Posts from "@/components/posts";
import Grid from "@mui/material/Grid";
import InternalTemplate from "@/components/organisms/internalTemplate";
import { Box } from "@mui/material";

const Profile = () => {
  return (
    <>
      <Menu />
      <InternalTemplate>
        <ProfilePreview name={"Laís"} img={perfilImage} />
        <BasicTabs />
        <Grid container>
          <Posts name={"The Tree Of Life"} img={theTreeOfLife} />
        </Grid>
      </InternalTemplate>
    </>
  );
};

export default Profile;
