const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const port = 3000;

mongoose.connect(
  "mongodb+srv://lalaguiar582:0wFpa0xaqVSO0f0C@fireflies-api.mdd3ozi.mongodb.net/?retryWrites=true&w=majority"
);

const Film = mongoose.model("Film", {
  title: String,
  description: String,
  image_url: String,
  trailer_url: String,
});

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
  profile_image_url: String,
});

const Review = mongoose.model("Review", {
  comment: String,
  rating: Number,
  user_id: mongoose.Types.ObjectId,
  film_id: mongoose.Types.ObjectId,
});

app.get("/film", async (req, res) => {
  const films = await Film.find();

  res.send({ status: "success", data: films });
});

app.post("/film", async (req, res) => {
  const film = new Film({
    title: req.body.title,
    description: req.body.description,
    image_url: req.body.image_url,
    trailer_url: req.body.trailer_url,
  });

  await film.save();

  res.send(film);
});

app.post("/user", async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  });

  await user.save();

  res.send({ status: "success", data: user });
});

app.get("/user", async (req, res) => {
  const users = await User.find();

  res.send(users);
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  if (user.password === req.body.password) {
    res.send({ status: "success", data: user });
  } else {
    res
      .status(200)
      .send({ status: "error", message: "Senha ou usuário incorretos." });
  }
});

app.post("/review", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.body.user_id);
  const filmId = new mongoose.Types.ObjectId(req.body.film_id);

  const review = new Review({
    comment: req.body.comment,
    rating: req.body.rating,
    user_id: userId,
    film_id: filmId,
  });

  await review.save();

  res.send({ status: "success", data: review });
});

app.get("/review", async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.query.user_id);

  const review = await Review.find({ user_id: userId });

  res.send({ status: "success", data: review });
});

app.listen(port, () => {
  console.log("App is running");
});
