import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const JWT_SECRET = "your-secret-key"; // В реальном приложении должен быть в .env

app.use(cors());
app.use(json());
app.use(express.static("public"));

const users = [
  {
    id: 1,
    name: "Алексей Ветров",
    email: "alex@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava1.png",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
    genres: ["Поп", "Рок", "Электроника"],
    auditions: 0,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/alexvetrov",
      },
      {
        name: "Telegram",
        url: "https://t.me/alexvetrov",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@alexvetrov",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/alexvetrov",
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/artist/alexvetrov",
      },
    ],
    albums: [
      {
        id: 1,
        title: "Начало пути",
        year: 2023,
        coverUrl: "/previewAlbums/3.jpg",
        tracks: [1, 2, 3],
      },
      {
        id: 2,
        title: "Новые горизонты",
        year: 2024,
        coverUrl: "/previewAlbums/4.jpg",
        tracks: [4, 5, 6],
      },
    ],
  },
  {
    id: 2,
    name: "NEON BLVD",
    email: "neon@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava2.png",
    backgroundUrl:
      "https://i.pinimg.com/736x/dd/40/19/dd40196aedbbaa4512df9f5f77145dd8.jpg",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
    genres: ["Электроника", "EDM", "Хаус"],
    auditions: 430,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/neonblvd",
      },
      {
        name: "Telegram",
        url: "https://t.me/neonblvd",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@neonblvd",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/neonblvd",
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/artist/neonblvd",
      },
    ],
  },
  {
    id: 3,
    name: "Мирослава",
    email: "mira@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava3.png",
    backgroundUrl:
      "https://i.pinimg.com/originals/0e/10/b5/0e10b5dee4f4d73f7facac1fac79a9c9.png",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
    genres: ["Инди", "Альтернатива", "Фолк"],
    auditions: 300,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/miroslava",
      },
      {
        name: "Telegram",
        url: "https://t.me/miroslava",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@miroslava",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/miroslava",
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/artist/miroslava",
      },
    ],
  },
  {
    id: 4,
    name: "DJ Крутой",
    email: "dj@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava4.png",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
    genres: ["EDM", "Хаус", "Техно"],
    auditions: 100,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/djkrutoy",
      },
      {
        name: "Telegram",
        url: "https://t.me/djkrutoy",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@djkrutoy",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/djkrutoy",
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/artist/djkrutoy",
      },
    ],
  },
  {
    id: 5,
    name: "Звукозапад",
    email: "sound@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava5.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=40b15cd0bc96913ab03eccdac940f18905e05fde-5904855-images-thumbs&n=13",
    description:
      "Благодарим вас за проявленный интерес к нашей компании и добро пожаловать в нашу компанию. Кое-что из того, что я смеялся, кое-что из того, что я наряжал, и кое-что из того, что я хотел сделать. У нас тут очень весело, очень-очень прикольно. Общение максимально…",
    genres: ["Хип-хоп", "Рэп", "R&B"],
    auditions: 12,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/zvukozapad",
      },
      {
        name: "Telegram",
        url: "https://t.me/zvukozapad",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@zvukozapad",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/zvukozapad",
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/artist/zvukozapad",
      },
    ],
  },
  {
    id: 6,
    name: "Катя Лёд",
    email: "katya@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava1.png",
    backgroundUrl:
      "https://i.pinimg.com/originals/0e/10/b5/0e10b5dee4f4d73f7facac1fac79a9c9.png",
    description:
      "Электронный музыкант и продюсер, создающий атмосферную электронику и экспериментальные звуковые ландшафты. Моя музыка сочетает в себе элементы эмбиента, IDM и экспериментальной электроники, создавая уникальные звуковые пространства.",
    genres: ["Электроника", "Ambient", "IDM"],
    auditions: 250,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/katyaled",
      },
      {
        name: "SoundCloud",
        url: "https://soundcloud.com/katyaled",
      },
    ],
    albums: [
      {
        id: 11,
        title: "Ледяные сны",
        year: 2023,
        coverUrl: "/previewAlbums/2.jpg",
        tracks: [11, 12, 13],
      },
    ],
  },
  {
    id: 7,
    name: "ROTOR",
    email: "rotor@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava2.png",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Индустриальный рок проект, объединяющий жесткие гитарные риффы с механическими ритмами и электронными элементами. Наша музыка исследует темы технологий, урбанизации и взаимодействия человека с машиной.",
    genres: ["Индастриал", "Рок", "Электроника"],
    auditions: 180,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/rotor",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@rotor",
      },
      {
        name: "Bandcamp",
        url: "https://rotor.bandcamp.com",
      },
    ],
    albums: [
      {
        id: 12,
        title: "Механизмы",
        year: 2023,
        coverUrl: "/previewAlbums/1.jpg",
        tracks: [14, 15, 16],
      },
      {
        id: 13,
        title: "Цифровая эра",
        year: 2024,
        coverUrl: "/previewAlbums/5.jpg",
        tracks: [17, 18, 19],
      },
    ],
  },
  {
    id: 8,
    name: "Луна на Пульсе",
    email: "luna@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava3.png",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=d4afdd5a5d2a64efc38e9e52a71e297cceb28583-5430182-images-thumbs&n=13",
    description:
      "Экспериментальный проект на стыке электроники и живых инструментов. Мы создаем музыку, где органические звуки переплетаются с цифровыми, а джазовые импровизации встречаются с электронными битами.",
    genres: ["Экспериментальная", "Электроника", "Джаз"],
    auditions: 320,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/luna",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/luna",
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/artist/luna",
      },
    ],
    albums: [
      {
        id: 14,
        title: "Пульсар",
        year: 2023,
        coverUrl: "/previewAlbums/4.jpg",
        tracks: [20, 21, 22],
      },
    ],
  },
  {
    id: 9,
    name: "Слава Битмейкер",
    email: "slava@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava4.png",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=d4afdd5a5d2a64efc38e9e52a71e297cceb28583-5430182-images-thumbs&n=13",
    description:
      "Продюсер и битмейкер, специализирующийся на создании битов для рэп-исполнителей и электронной музыки. Мои работы отличаются глубокими басами, сложными ритмами и инновационным подходом к звуковому дизайну.",
    genres: ["Хип-хоп", "Электроника", "Trap"],
    auditions: 450,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/slavabeat",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@slavabeat",
      },
      {
        name: "SoundCloud",
        url: "https://soundcloud.com/slavabeat",
      },
    ],
    albums: [
      {
        id: 15,
        title: "Бит-мастер",
        year: 2023,
        coverUrl: "/previewAlbums/3.jpg",
        tracks: [23, 24, 25],
      },
      {
        id: 16,
        title: "Новые ритмы",
        year: 2024,
        coverUrl: "/previewAlbums/2.jpg",
        tracks: [26, 27, 28],
      },
    ],
  },
  {
    id: 10,
    name: "Ольга Янтарь",
    email: "olga@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/ava5.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description:
      "Фолк-рок исполнительница, создающая современную интерпретацию народной музыки. В моих песнях традиционные народные мотивы переплетаются с современными аранжировками, создавая уникальный звук, который соединяет прошлое и настоящее.",
    genres: ["Фолк", "Рок", "Этно"],
    auditions: 280,
    hasCompletedSetup: true,
    socialLinks: [
      {
        name: "VK",
        url: "https://vk.com/olgayantar",
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@olgayantar",
      },
      {
        name: "Instagram",
        url: "https://instagram.com/olgayantar",
      },
    ],
    albums: [
      {
        id: 17,
        title: "Янтарные сны",
        year: 2023,
        coverUrl: "/previewAlbums/1.jpg",
        tracks: [29, 30, 31],
      },
    ],
  },
];

const tracks = [
  {
    id: 1,
    title:
      "Навстречу ветру htkrjthkrtjh rtjhl rtjh krjth lkjrthkrtjhrltkhjlrth",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 2,
    title: "Неоновые сны",
    artistId: 2,
    artistName: "NEON BLVD trthjlr tkjh krtjhlrktjhktrlh",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
  {
    id: 3,
    title: "Тишина внутри",
    artistId: 3,
    artistName: "Мирослава",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 153,
  },
  {
    id: 4,
    title: "Энергия ночи",
    artistId: 4,
    artistName: "DJ Крутой",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 202,
  },
  {
    id: 5,
    title: "Улицы молчат",
    artistId: 5,
    artistName: "Звукозапад",
    imageUrl: "/previewMusic/5.png",
    audioUrl: "/tracks/Hero.mp3",
    duration: 153,
  },
  {
    id: 6,
    title: "Без остатка",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/6.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 202,
  },
  {
    id: 7,
    title: "Бензин",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/7.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 153,
  },
  {
    id: 8,
    title: "Гравитация",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/8.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
  },
  {
    id: 9,
    title: "На битах",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/9.png",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
  },
  {
    id: 10,
    title: "Берёзовая весна",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 202,
  },
  {
    id: 11,
    title: "Ледяной дождь",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 245,
  },
  {
    id: 12,
    title: "Арктика",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Hero.mp3",
    duration: 198,
  },
  {
    id: 13,
    title: "Северное сияние",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 312,
  },
  {
    id: 14,
    title: "Механический танец",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/5.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 267,
  },
  {
    id: 15,
    title: "Цифровой мир",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/6.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 234,
  },
  {
    id: 16,
    title: "Роботы",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/7.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 289,
  },
  {
    id: 17,
    title: "Новая эра",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/8.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 256,
  },
  {
    id: 18,
    title: "Киберпространство",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/9.png",
    audioUrl: "/tracks/Hero.mp3",
    duration: 278,
  },
  {
    id: 19,
    title: "Технологии будущего",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 245,
  },
  {
    id: 20,
    title: "Космический пульс",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 312,
  },
  {
    id: 21,
    title: "Лунная соната",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 289,
  },
  {
    id: 22,
    title: "Звездный путь",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 267,
  },
  {
    id: 23,
    title: "Бит-мастер",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/5.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 234,
  },
  {
    id: 24,
    title: "Новый ритм",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/6.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 245,
  },
  {
    id: 25,
    title: "Бит-бокс",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/7.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 198,
  },
  {
    id: 26,
    title: "Ритмы улиц",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/8.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 267,
  },
  {
    id: 27,
    title: "Бит-лаборатория",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/9.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 289,
  },
  {
    id: 28,
    title: "Новые звуки",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 256,
  },
  {
    id: 29,
    title: "Янтарный рассвет",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 312,
  },
  {
    id: 30,
    title: "Народная песня",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 289,
  },
  {
    id: 31,
    title: "Этнические ритмы",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 267,
  },
];

// Middleware для проверки JWT токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Требуется авторизация" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Недействительный токен" });
    }
    req.user = user;
    next();
  });
};

// Все музыканты
app.get("/musicians", authenticateToken, (req, res) => {
  res.json(users);
});

// Музыкант по ID
app.get("/musician/:id", authenticateToken, (req, res) => {
  const musician = users.find(u => u.id === parseInt(req.params.id));
  musician
    ? res.json(musician)
    : res.status(404).json({ message: "Музыкант не найден" });
});

// Все треки
app.get("/tracks", authenticateToken, (req, res) => {
  res.json(tracks);
});

// Регистрация
app.post("/auth/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Все поля обязательны" });

  const existingUser = users.find(user => user.email === email);
  if (existingUser)
    return res.status(409).json({ message: "Пользователь уже существует" });

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    avatarUrl: "/avatarUser/default.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
    description: "",
    genres: [],
    hasCompletedSetup: false,
    socialLinks: [],
  };
  users.push(newUser);

  // Генерация JWT токена
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name },
    JWT_SECRET,
    { expiresIn: "24h" },
  );

  res.status(201).json({
    token,
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatarUrl: newUser.avatarUrl,
      backgroundUrl: newUser.backgroundUrl,
      description: newUser.description,
      genres: newUser.genres,
      hasCompletedSetup: newUser.hasCompletedSetup,
      socialLinks: newUser.socialLinks,
    },
  });
});

// Вход
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Неверный email или пароль" });
  }

  // Генерация JWT токена
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "24h" },
  );

  res.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      backgroundUrl: user.backgroundUrl,
      description: user.description,
      genres: user.genres,
      hasCompletedSetup: user.hasCompletedSetup,
      socialLinks: user.socialLinks,
    },
  });
});

// Защищенный маршрут для проверки авторизации
app.get("/auth/me", authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      backgroundUrl: user.backgroundUrl,
      description: user.description,
      genres: user.genres,
      hasCompletedSetup: user.hasCompletedSetup,
      socialLinks: user.socialLinks,
    },
  });
});

// Трек по ID
app.get("/track/:id", (req, res) => {
  const track = tracks.find(t => t.id === parseInt(req.params.id));
  track ? res.json(track) : res.status(404).json({ message: "Трек не найден" });
});

// Завершение начальной настройки
app.post("/auth/complete-setup", authenticateToken, (req, res) => {
  const user = users.find(u => u.email === req.user.email);
  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  user.hasCompletedSetup = true;

  res.json({
    message: "Настройка завершена",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      hasCompletedSetup: true,
    },
  });
});

// Популярные треки музыканта (первые 8)
app.get("/musician/:id/popular-tracks", authenticateToken, (req, res) => {
  const musicianId = parseInt(req.params.id);
  const musicianTracks = tracks
    .filter(track => track.artistId === musicianId)
    .slice(0, 8);

  res.json(musicianTracks);
});

// Рекомендованные треки для пользователя
app.get("/tracks/recommended", authenticateToken, (req, res) => {
  const userId = req.user.id;
  // В реальном приложении здесь была бы логика рекомендаций
  // Сейчас просто возвращаем треки с учетом лимита
  let recommendedTracks = tracks;

  // Если есть параметр limit, ограничиваем количество треков
  const limit = parseInt(req.query.limit);
  if (limit) {
    recommendedTracks = recommendedTracks.slice(0, limit);
  }

  res.json(recommendedTracks);
});

// Отслеживаемые треки пользователя
app.get("/tracks/tracked", authenticateToken, (req, res) => {
  const userId = req.user.id;
  // В реальном приложении здесь была бы логика получения отслеживаемых треков
  let trackedTracks = tracks;

  // Если есть параметр limit, ограничиваем количество треков
  const limit = parseInt(req.query.limit);
  if (limit) {
    trackedTracks = trackedTracks.slice(0, limit);
  }

  res.json(trackedTracks);
});

// Чарт (топ треков)
app.get("/tracks/chart", authenticateToken, (req, res) => {
  // В реальном приложении здесь была бы логика получения самых популярных треков
  let chartTracks = tracks;

  // Если есть параметр limit, ограничиваем количество треков
  const limit = parseInt(req.query.limit);
  if (limit) {
    chartTracks = chartTracks.slice(0, limit);
  }

  res.json(chartTracks);
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
