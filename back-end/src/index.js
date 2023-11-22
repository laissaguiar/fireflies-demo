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

app.get("/film", async (req, res) => {
  const films = await Film.find();

  res.send(films);
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
    profile_image_url: req.body.profile_image_url,
  });

  await user.save();

  res.send(user);
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

app.listen(port, () => {
  console.log("App is running");
});
