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
    image: "/avatarUser/login1.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 2,
    name: "NEON BLVD",
    genre: "Электроника",
    image: "/avatarUser/login2.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 3,
    name: "Мирослава",
    genre: "Инди",
    image: "/avatarUser/login1.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 4,
    name: "DJ Крутой",
    genre: "EDM",
    image: "/avatarUser/login2.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 5,
    name: "Звукозапад",
    genre: "Хип-хоп",
    image: "/avatarUser/login1.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 6,
    name: "Катя Лёд",
    genre: "Поп",
    image: "/avatarUser/login2.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 7,
    name: "ROTOR",
    genre: "Рок",
    image: "/avatarUser/login1.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 8,
    name: "Луна на Пульсе",
    genre: "Альтернатива",
    image: "/avatarUser/login2.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 9,
    name: "Слава Битмейкер",
    genre: "Бит",
    image: "/avatarUser/login1.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
  {
    id: 10,
    name: "Ольга Янтарь",
    genre: "Фолк",
    image: "/avatarUser/login2.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
  },
];

const tracks = [
  {
    id: 1,
    title: "Навстречу ветру",
    artistId: 1,
    artistName: "Алексей Ветров",
    image: "/previewMusic/1.jpg",
    audio: "/tracks/Numb The Pain.mp3",
    duration: "3:42",
  },
  {
    id: 2,
    title: "Неоновые сны",
    artistId: 2,
    artistName: "NEON BLVD",
    image: "/previewMusic/2.jpg",
    audio: "/tracks/ONLAP - Unstoppable.m4a",
    duration: "4:08",
  },
  {
    id: 3,
    title: "Тишина внутри",
    artistId: 3,
    artistName: "Мирослава",
    image: "/previewMusic/3.jpg",
    audio: "/tracks/Numb The Pain.mp3",
    duration: "2:57",
  },
  {
    id: 4,
    title: "Энергия ночи",
    artistId: 4,
    artistName: "DJ Крутой",
    image: "/previewMusic/4.jpg",
    audio: "/tracks/ONLAP - Unstoppable.m4a",
    duration: "5:14",
  },
  {
    id: 5,
    title: "Улицы молчат",
    artistId: 5,
    artistName: "Звукозапад",
    image: "/previewMusic/5.jpg",
    audio: "/tracks/Numb The Pain.mp3",
    duration: "3:26",
  },
  {
    id: 6,
    title: "Без остатка",
    artistId: 6,
    artistName: "Катя Лёд",
    image: "/previewMusic/1.jpg",
    audio: "/tracks/ONLAP - Unstoppable.m4a",
    duration: "4:01",
  },
  {
    id: 7,
    title: "Бензин",
    artistId: 7,
    artistName: "ROTOR",
    image: "/previewMusic/2.jpg",
    audio: "/tracks/Numb The Pain.mp3",
    duration: "3:50",
  },
  {
    id: 8,
    title: "Гравитация",
    artistId: 8,
    artistName: "Луна на Пульсе",
    image: "/previewMusic/3.jpg",
    audio: "/tracks/ONLAP - Unstoppable.m4a",
    duration: "3:58",
  },
  {
    id: 9,
    title: "На битах",
    artistId: 9,
    artistName: "Слава Битмейкер",
    image: "/previewMusic/4.jpg",
    audio: "/tracks/Numb The Pain.mp3",
    duration: "2:45",
  },
  {
    id: 10,
    title: "Берёзовая весна",
    artistId: 10,
    artistName: "Ольга Янтарь",
    image: "/previewMusic/5.jpg",
    audio: "/tracks/ONLAP - Unstoppable.m4a",
    duration: "3:33",
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
