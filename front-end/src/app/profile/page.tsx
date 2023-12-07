"use client";
import React, { useEffect, useState } from "react";

import perfilImage from "@/assets/perfil.png";
import ProfilePreview from "@/components/molecules/ProfilePreview";
import Menu from "@/components/menu";
import BasicTabs from "@/components/tab";
import Posts from "@/components/posts";
import Grid from "@mui/material/Grid";
import InternalTemplate from "@/components/organisms/internalTemplate";
import axios from "axios";
import { ApiResponse, baseURL } from "@/api";
import { useGlobalStore } from "@/globalStore";
import ReviewPost from "@/components/reviewPost";

interface FilmDTO {
  title: string;
  description: string;
  image_url: string;
  trailer_url: string;
  _id: string;
}

export interface ReviewDTO {
  comment: string;
  rating: number;
  user_id: string;
  film_id: string;
}

export interface ReviewList {
  review: ReviewDTO;
  film: FilmDTO;
}

const Profile = () => {
  const [movies, setMovies] = useState<FilmDTO[]>();
  const [reviews, setReviews] = useState<ReviewDTO[]>();
  const [reviewList, setReviewList] = useState<ReviewList[]>();
  const { user_id, user_name } = useGlobalStore();

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

  useEffect(() => {
    console.log(movies);
    console.log(reviews);
    if (movies && reviews) {
      const items: any = reviews.map((review) => {
        return {
          review,
          film: movies.find((movie) => movie._id === review.film_id),
        };
      });

      setReviewList(items);
    }
  }, [movies, reviews]);

  return (
    <>
      <Menu />
      <InternalTemplate>
        <ProfilePreview name={user_name} img={perfilImage} />
        <BasicTabs />
        <Grid container>
          {reviewList?.map((item) => (
            <ReviewPost
              comment={item.review.comment}
              rating={item.review.rating}
              key={item.film.title}
              name={item.film.title}
              img={item.film.image_url}
              description={item.film.description}
            />
          ))}
        </Grid>
      </InternalTemplate>
    </>
  );
};

export default Profile;
