"use client";
import React, { useEffect, useState } from "react";

import Menu from "@/components/menu";
import BasicTabs from "@/components/tab";
import Posts from "@/components/posts";
import Grid from "@mui/material/Grid";
import InternalTemplate from "@/components/organisms/internalTemplate";
import axios from "axios";
import { ApiResponse, baseURL } from "@/api";
import { useGlobalStore } from "@/globalStore";
import { ReviewDTO, ReviewList } from "../profile/page";

interface FilmDTO {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  trailer_url: string;
}

const HomePage = () => {
  const [movies, setMovies] = useState<FilmDTO[]>();
  const { user_id } = useGlobalStore();
  const [reviews, setReviews] = useState<ReviewDTO[]>();

  const handleGetMovies = async () => {
    const films: ApiResponse<Array<FilmDTO>> = await axios.get(
      baseURL + "/film"
    );
    setMovies(films.data.data);
  };

  const handleGetReviews = async () => {
    console.log("trying");
    const reviewsResponse: ApiResponse<Array<ReviewDTO>> = await axios.get(
      baseURL + "/review",
      {
        params: {
          user_id: user_id,
        },
      }
    );

    setReviews(reviewsResponse.data.data);
  };

  useEffect(() => {
    handleGetMovies();
    handleGetReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Menu />
      <InternalTemplate>
        <BasicTabs />
        <Grid container>
          {movies?.map((item) => (
            <Posts
              afterReviewing={() => {
                handleGetMovies();
                handleGetReviews();
              }}
              hasRating={
                !!reviews?.find((review) => review.film_id === item._id)
              }
              review={reviews?.find((review) => review.film_id === item._id)}
              filmId={item._id}
              key={item.title}
              name={item.title}
              img={item.image_url}
              description={item.description}
            />
          ))}
        </Grid>
      </InternalTemplate>
    </>
  );
};

export default HomePage;
