import express, { json } from "express";
import cors from "cors";
const app = express();
const PORT = 3001;

app.use(cors());
app.use(json());
app.use(express.static("public"));

const musicians = [
  {
    id: 1,
    name: "Алексей Ветров",
    genre: "Поп",
    imageUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 2,
    name: "NEON BLVD",
    genre: "Электроника",
    imageUrl: "/avatarUser/login2.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 3,
    name: "Мирослава",
    genre: "Инди",
    imageUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 4,
    name: "DJ Крутой",
    genre: "EDM",
    imageUrl: "/avatarUser/login2.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 5,
    name: "Звукозапад",
    genre: "Хип-хоп",
    imageUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 6,
    name: "Катя Лёд",
    genre: "Поп",
    imageUrl: "/avatarUser/login2.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 7,
    name: "ROTOR",
    genre: "Рок",
    imageUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 8,
    name: "Луна на Пульсе",
    genre: "Альтернатива",
    imageUrl: "/avatarUser/login2.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 9,
    name: "Слава Битмейкер",
    genre: "Бит",
    imageUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 10,
    name: "Ольга Янтарь",
    genre: "Фолк",
    imageUrl: "/avatarUser/login2.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
];

const tracks = [
  {
    id: 1,
    title:
      "Навстречу ветру htkrjthkrtjh rtjhl rtjh krjth lkjrthkrtjhrltkhjlrth",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/1.jpg",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 2,
    title: "Неоновые сны",
    artistId: 2,
    artistName: "NEON BLVD trthjlr tkjh krtjhlrktjhktrlh",
    imageUrl: "/previewMusic/2.jpg",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
  {
    id: 3,
    title: "Тишина внутри",
    artistId: 3,
    artistName: "Мирослава",
    imageUrl: "/previewMusic/3.jpg",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 4,
    title: "Энергия ночи",
    artistId: 4,
    artistName: "DJ Крутой",
    imageUrl: "/previewMusic/4.jpg",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
  {
    id: 5,
    title: "Улицы молчат",
    artistId: 5,
    artistName: "Звукозапад",
    imageUrl: "/previewMusic/5.jpg",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 6,
    title: "Без остатка",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/1.jpg",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
  {
    id: 7,
    title: "Бензин",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/2.jpg",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 8,
    title: "Гравитация",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/3.jpg",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
  {
    id: 9,
    title: "На битах",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/4.jpg",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 10,
    title: "Берёзовая весна",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/5.jpg",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
];

// Все артисты
app.get("/musicians", (req, res) => {
  res.json(musicians);
});

// Артист по ID
app.get("/musician/:id", (req, res) => {
  const artist = musicians.find(a => a.id === parseInt(req.params.id));
  artist
    ? res.json(artist)
    : res.status(404).json({ message: "Артист не найден" });
});

// Все треки
app.get("/tracks", (req, res) => {
  res.json(tracks);
});

// Трек по ID
app.get("/track/:id", (req, res) => {
  const track = tracks.find(t => t.id === parseInt(req.params.id));
  track ? res.json(track) : res.status(404).json({ message: "Трек не найден" });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
