import CustomButton from "@/components/atoms/CustomButton";
import {
  Box,
  Divider,
  Grid,
  Rating,
  Typography,
  Dialog,
  useMediaQuery,
  useTheme,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useGlobalStore } from "@/globalStore";
import { baseURL } from "@/api";
import axios from "axios";
import { ReviewDTO } from "@/app/profile/page";

interface PostsPreviewProps {
  img?: any;
  name?: string;
  description?: string;
  hasRating?: boolean;
  filmId: string;
  review: ReviewDTO | undefined;
  afterReviewing: () => void;
}

const Posts = ({
  img,
  name,
  description,
  hasRating,
  review,
  filmId,
  afterReviewing,
}: PostsPreviewProps) => {
  const theme = useTheme();
  const [rating, setRating] = React.useState<number | null>(0);
  const [comment, setComment] = React.useState<string>("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openReviewDialog, setOpenReviewDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { user_id } = useGlobalStore();

  const handleReview = async () => {
    await axios
      .post(baseURL + "/review", {
        comment: comment,
        rating: rating,
        user_id: user_id,
        film_id: filmId,
      })
      .then((response) => {
        if (response.data.status === "success") {
          setOpenDialog(false);
          setOpen(true);
          afterReviewing();
        }
      });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

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
            {description}
          </Typography>
          <Box display="flex" justifyContent="end">
            {hasRating ? (
              <CustomButton
                onClick={() => setOpenReviewDialog(true)}
                title="Visualizar avaliação"
                variant="text"
                sx={{ maxWidth: "300px" }}
              />
            ) : (
              <CustomButton
                onClick={() => setOpenDialog(true)}
                title="Avaliar"
                variant="outlined"
                sx={{ maxWidth: "100px" }}
              />
            )}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ paddingTop: "16px" }} />

      <Dialog
        fullScreen={fullScreen}
        title="Avaliar filme"
        aria-labelledby="responsive-dialog-title"
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle id="responsive-dialog-title">
          {`Avaliar ${name}`}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <DialogContentText>Deixe sua avaliação</DialogContentText>
            </Grid>
            <Grid item xs={12} pt={4}>
              <TextField
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                multiline
                fullWidth
                label="Adicionar comentário"
              />
            </Grid>
            <Grid item xs={12} pt={2}>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            variant="outlined"
            title="Cancelar"
            onClick={() => setOpenDialog(false)}
          />
          <CustomButton
            variant="contained"
            title="Avaliar"
            onClick={handleReview}
          />
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        title="Avaliar filme"
        aria-labelledby="responsive-dialog-title"
        open={openReviewDialog}
        onClose={() => setOpenReviewDialog(false)}
      >
        <DialogTitle id="responsive-dialog-title">
          {`Sua avaliação do filme ${name}`}
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={12} pt={2}>
              <Typography>{review?.comment}</Typography>
            </Grid>
            <Grid item xs={12} pt={2}>
              <Rating
                name="simple-controlled"
                value={review?.rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <CustomButton
            variant="outlined"
            title="Fechar"
            onClick={() => setOpenReviewDialog(false)}
          />
        </DialogActions>
      </Dialog>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Avaliação salva com sucesso!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default Posts;
