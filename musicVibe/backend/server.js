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
    avatarUrl: "/avatarUser/login1.jpg",
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
  },
  {
    id: 2,
    name: "NEON BLVD",
    email: "neon@mail.ru",
    password: "123456",
    avatarUrl: "/avatarUser/login2.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
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
    avatarUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
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
    avatarUrl: "/avatarUser/login2.jpg",
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
    avatarUrl: "/avatarUser/login1.jpg",
    backgroundUrl:
      "https://avatars.mds.yandex.net/i?id=2d0ed205049cd9c3b56db4cab9f02b9d_l-4255743-images-thumbs&n=13",
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

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
