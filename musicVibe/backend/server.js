import express, { json } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 3001;
const JWT_SECRET = "your-secret-key"; // Должен лежать в .env

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
        tracks: [1, 15, 16],
        description:
          "Дебютный альбом, отражающий первые шаги в музыкальной карьере. Сочетание современного звучания с искренними текстами.",
      },
      {
        id: 2,
        title: "Новые горизонты",
        year: 2024,
        coverUrl: "/previewAlbums/4.jpg",
        tracks: [24, 25],
        description:
          "Экспериментальный альбом, исследующий новые музыкальные направления и звучания.",
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
        description:
          "Атмосферный электронный альбом, погружающий слушателя в мир холодных синтезаторов и мечтательных мелодий.",
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
        description:
          "Индустриальный альбом, сочетающий тяжелые гитарные риффы с электронными элементами.",
      },
      {
        id: 13,
        title: "Цифровая эра",
        year: 2024,
        coverUrl: "/previewAlbums/5.jpg",
        tracks: [17, 18, 19],
        description:
          "Концептуальный альбом о влиянии технологий на современное общество.",
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
        description:
          "Экспериментальный джаз-электронный альбом с космической тематикой.",
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
        description: "Коллекция инновационных битов и электронных композиций.",
      },
      {
        id: 16,
        title: "Новые ритмы",
        year: 2024,
        coverUrl: "/previewAlbums/2.jpg",
        tracks: [26, 27, 28],
        description:
          "Свежий взгляд на современную электронную музыку с элементами хип-хопа.",
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
        description:
          "Фолк-рок альбом, переосмысляющий традиционные народные мотивы в современном звучании.",
      },
    ],
  },
];

const tracks = [
  {
    id: 1,
    title: "Навстречу ветру",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
    plays: 1250,
  },
  {
    id: 2,
    title: "Неоновые сны",
    artistId: 2,
    artistName: "NEON BLVD trthjlr tkjh krtjhlrktjhktrlh",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
    plays: 3400,
  },
  {
    id: 3,
    title: "Тишина внутри",
    artistId: 3,
    artistName: "Мирослава",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 153,
    plays: 1250,
  },
  {
    id: 4,
    title: "Энергия ночи",
    artistId: 4,
    artistName: "DJ Крутой",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 202,
    plays: 3400,
  },
  {
    id: 5,
    title: "Улицы молчат",
    artistId: 5,
    artistName: "Звукозапад",
    imageUrl: "/previewMusic/5.png",
    audioUrl: "/tracks/Hero.mp3",
    duration: 153,
    plays: 1250,
  },
  {
    id: 6,
    title: "Без остатка",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/6.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 202,
    plays: 3400,
  },
  {
    id: 7,
    title: "Бензин",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/7.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 153,
    plays: 1250,
  },
  {
    id: 8,
    title: "Гравитация",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/8.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 202,
    plays: 3400,
  },
  {
    id: 9,
    title: "На битах",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/9.png",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 153,
    plays: 1250,
  },
  {
    id: 10,
    title: "Берёзовая весна",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 202,
    plays: 3400,
  },
  {
    id: 11,
    title: "Ледяной дождь",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 245,
    plays: 1250,
  },
  {
    id: 12,
    title: "Арктика",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Hero.mp3",
    duration: 198,
    plays: 3400,
  },
  {
    id: 13,
    title: "Северное сияние",
    artistId: 6,
    artistName: "Катя Лёд",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 312,
    plays: 1250,
  },
  {
    id: 14,
    title: "Механический танец",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/5.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 267,
    plays: 3400,
  },
  {
    id: 15,
    title: "Цифровой мир",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/6.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 234,
    plays: 1250,
  },
  {
    id: 16,
    title: "Электронные сны",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/7.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 289,
    plays: 3400,
  },
  {
    id: 17,
    title: "Новая эра",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/8.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 256,
    plays: 1250,
  },
  {
    id: 18,
    title: "Киберпространство",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/9.png",
    audioUrl: "/tracks/Hero.mp3",
    duration: 278,
    plays: 3400,
  },
  {
    id: 19,
    title: "Технологии будущего",
    artistId: 7,
    artistName: "ROTOR",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 245,
    plays: 1250,
  },
  {
    id: 20,
    title: "Космический пульс",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 312,
    plays: 3400,
  },
  {
    id: 21,
    title: "Лунная соната",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Numb%20The%20Pain.mp3",
    duration: 289,
    plays: 1250,
  },
  {
    id: 22,
    title: "Звездный путь",
    artistId: 8,
    artistName: "Луна на Пульсе",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 267,
    plays: 3400,
  },
  {
    id: 23,
    title: "Бит-мастер",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/5.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 234,
    plays: 1250,
  },
  {
    id: 24,
    title: "Новый ритм",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/6.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 245,
    plays: 3400,
  },
  {
    id: 25,
    title: "Глубина звука",
    artistId: 1,
    artistName: "Алексей Ветров",
    imageUrl: "/previewMusic/7.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 198,
    plays: 1250,
  },
  {
    id: 26,
    title: "Ритмы улиц",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/8.png",
    audioUrl: "/tracks/My%20Way.mp3",
    duration: 267,
    plays: 3400,
  },
  {
    id: 27,
    title: "Бит-лаборатория",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/9.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 289,
    plays: 1250,
  },
  {
    id: 28,
    title: "Новые звуки",
    artistId: 9,
    artistName: "Слава Битмейкер",
    imageUrl: "/previewMusic/1.png",
    audioUrl: "/tracks/Awake%20and%20Alive.mp3",
    duration: 256,
    plays: 3400,
  },
  {
    id: 29,
    title: "Янтарный рассвет",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/2.png",
    audioUrl: "/tracks/In%20The%20End.mp3",
    duration: 312,
    plays: 1250,
  },
  {
    id: 30,
    title: "Народная песня",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/3.png",
    audioUrl: "/tracks/Fight%20Back.mp3",
    duration: 289,
    plays: 3400,
  },
  {
    id: 31,
    title: "Этнические ритмы",
    artistId: 10,
    artistName: "Ольга Янтарь",
    imageUrl: "/previewMusic/4.png",
    audioUrl: "/tracks/ONLAP%20-%20Unstoppable.m4a",
    duration: 267,
    plays: 1250,
  },
];

const comments = [
  {
    id: 1,
    userId: 1,
    mediaType: "track",
    mediaId: 1,
    text: "Отличный трек! Очень понравился бит и аранжировка.",
    createdAt: "2024-03-20T10:30:00Z",
  },
  {
    id: 2,
    userId: 2,
    mediaType: "track",
    mediaId: 1,
    text: "Классная работа! Давно следил за вашим творчеством.",
    createdAt: "2024-03-20T11:15:00Z",
  },
  {
    id: 3,
    userId: 3,
    mediaType: "album",
    mediaId: 1,
    text: "Альбом просто огонь! Каждый трек уникален.",
    createdAt: "2024-03-19T15:45:00Z",
  },
  {
    id: 4,
    userId: 4,
    mediaType: "track",
    mediaId: 2,
    text: "Неоновые сны - это что-то невероятное! Атмосфера просто космическая.",
    createdAt: "2024-03-21T09:30:00Z",
  },
  {
    id: 5,
    userId: 5,
    mediaType: "track",
    mediaId: 2,
    text: "Звучание очень современное, но при этом есть своя изюминка.",
    createdAt: "2024-03-21T10:45:00Z",
  },
  {
    id: 6,
    userId: 6,
    mediaType: "album",
    mediaId: 11,
    text: "Ледяные сны - лучший альбом этого года! Каждый трек пробирает до мурашек.",
    createdAt: "2024-03-22T14:20:00Z",
  },
  {
    id: 7,
    userId: 7,
    mediaType: "track",
    mediaId: 11,
    text: "Ледяной дождь - мой любимый трек с альбома. Эти синтезаторы просто космос!",
    createdAt: "2024-03-22T15:30:00Z",
  },
  {
    id: 8,
    userId: 8,
    mediaType: "album",
    mediaId: 12,
    text: "Механизмы - отличный дебютный альбом. Жду следующих работ!",
    createdAt: "2024-03-23T11:15:00Z",
  },
  {
    id: 9,
    userId: 9,
    mediaType: "track",
    mediaId: 14,
    text: "Механический танец заставляет двигаться! Отличный бит и звук.",
    createdAt: "2024-03-23T12:45:00Z",
  },
  {
    id: 10,
    userId: 10,
    mediaType: "track",
    mediaId: 20,
    text: "Космический пульс - это просто нечто! Такого звучания я еще не слышала.",
    createdAt: "2024-03-24T16:20:00Z",
  },
  {
    id: 11,
    userId: 1,
    mediaType: "album",
    mediaId: 14,
    text: "Пульсар - альбом, который открывает новые горизонты в музыке. Браво!",
    createdAt: "2024-03-24T17:30:00Z",
  },
  {
    id: 12,
    userId: 2,
    mediaType: "track",
    mediaId: 23,
    text: "Бит-мастер показывает высший класс! Продакшн на высоте.",
    createdAt: "2024-03-25T13:15:00Z",
  },
  {
    id: 13,
    userId: 3,
    mediaType: "album",
    mediaId: 15,
    text: "Бит-мастер - альбом, который должен быть в плейлисте каждого любителя качественной музыки.",
    createdAt: "2024-03-25T14:45:00Z",
  },
  {
    id: 14,
    userId: 4,
    mediaType: "track",
    mediaId: 29,
    text: "Янтарный рассвет возвращает к корням, но звучит очень современно!",
    createdAt: "2024-03-26T10:20:00Z",
  },
  {
    id: 15,
    userId: 5,
    mediaType: "album",
    mediaId: 17,
    text: "Янтарные сны - прекрасное сочетание традиций и современного звучания.",
    createdAt: "2024-03-26T11:30:00Z",
  },
];

const genres = [
  { id: 1, name: "Поп", imageUrl: "/genres/pop.jpg" },
  { id: 2, name: "Рок", imageUrl: "/genres/rock.jpg" },
  { id: 3, name: "Электроника", imageUrl: "/genres/electronic.jpg" },
  { id: 4, name: "Хип-хоп", imageUrl: "/genres/hiphop.jpg" },
  { id: 5, name: "R&B", imageUrl: "/genres/rnb.jpg" },
  { id: 6, name: "Джаз", imageUrl: "/genres/jazz.jpg" },
  { id: 7, name: "Классика", imageUrl: "/genres/classic.jpg" },
  { id: 8, name: "Фолк", imageUrl: "/genres/folk.jpg" },
  { id: 9, name: "Метал", imageUrl: "/genres/metal.jpg" },
  { id: 10, name: "Инди", imageUrl: "/genres/indie.jpg" },
  { id: 11, name: "Альтернатива", imageUrl: "/genres/alternative.jpg" },
  { id: 12, name: "EDM", imageUrl: "/genres/edm.jpg" },
  { id: 13, name: "Хаус", imageUrl: "/genres/house.jpg" },
  { id: 14, name: "Техно", imageUrl: "/genres/techno.jpg" },
  { id: 15, name: "Транс", imageUrl: "/genres/trance.jpg" },
  { id: 16, name: "Драм-н-бейс", imageUrl: "/genres/dnb.jpg" },
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

// Популярные треки музыканта (сортировка по количеству прослушиваний)
app.get("/musician/:id/popular-tracks", authenticateToken, (req, res) => {
  const musicianId = parseInt(req.params.id);

  // Находим все треки музыканта
  const musicianTracks = tracks
    .filter(track => track.artistId === musicianId)
    // Сортируем по количеству прослушиваний (по убыванию)
    .sort((a, b) => b.plays - a.plays);

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

// Новые треки
app.get("/tracks/new", authenticateToken, (req, res) => {
  // В реальном приложении здесь была бы сортировка по дате добавления
  // Сейчас просто возвращаем треки в обратном порядке (как будто последние добавленные)
  let newTracks = [...tracks].reverse();

  // Если есть параметр limit, ограничиваем количество треков
  const limit = parseInt(req.query.limit);
  if (limit) {
    newTracks = newTracks.slice(0, limit);
  }

  res.json(newTracks);
});

// Поиск треков
app.get("/tracks/search", authenticateToken, (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  if (!query) {
    return res.json([]);
  }

  // Поиск по названию трека и имени исполнителя
  const searchResults = tracks.filter(
    track =>
      track.title.toLowerCase().includes(query) ||
      track.artistName.toLowerCase().includes(query),
  );

  // Если есть параметр limit, ограничиваем количество результатов
  const limit = parseInt(req.query.limit);
  if (limit) {
    return res.json(searchResults.slice(0, limit));
  }

  res.json(searchResults);
});

// Получение всех альбомов
app.get("/albums", authenticateToken, (req, res) => {
  // Собираем все альбомы из пользователей
  const allAlbums = users.reduce((albums, user) => {
    if (user.albums) {
      const userAlbums = user.albums.map(album => ({
        ...album,
        artistId: user.id,
        artistName: user.name,
      }));
      return [...albums, ...userAlbums];
    }
    return albums;
  }, []);

  // Если есть параметр limit, ограничиваем количество альбомов
  const limit = parseInt(req.query.limit);
  if (limit) {
    return res.json(allAlbums.slice(0, limit));
  }

  res.json(allAlbums);
});

// Рекомендованные альбомы
app.get("/albums/recommended", authenticateToken, (req, res) => {
  // Собираем все альбомы
  const allAlbums = users.reduce((albums, user) => {
    if (user.albums) {
      const userAlbums = user.albums.map(album => ({
        ...album,
        artistId: user.id,
        artistName: user.name,
      }));
      return [...albums, ...userAlbums];
    }
    return albums;
  }, []);

  // В реальном приложении здесь была бы логика рекомендаций
  // Сейчас просто возвращаем альбомы в случайном порядке
  const shuffledAlbums = [...allAlbums].sort(() => Math.random() - 0.5);

  // Если есть параметр limit, ограничиваем количество альбомов
  const limit = parseInt(req.query.limit);
  if (limit) {
    return res.json(shuffledAlbums.slice(0, limit));
  }

  res.json(shuffledAlbums);
});

// Новые альбомы
app.get("/albums/new", authenticateToken, (req, res) => {
  // Собираем все альбомы
  const allAlbums = users.reduce((albums, user) => {
    if (user.albums) {
      const userAlbums = user.albums.map(album => ({
        ...album,
        artistId: user.id,
        artistName: user.name,
      }));
      return [...albums, ...userAlbums];
    }
    return albums;
  }, []);

  // Сортируем по году (в реальном приложении была бы сортировка по дате добавления)
  const sortedAlbums = [...allAlbums].sort((a, b) => b.year - a.year);

  // Если есть параметр limit, ограничиваем количество альбомов
  const limit = parseInt(req.query.limit);
  if (limit) {
    return res.json(sortedAlbums.slice(0, limit));
  }

  res.json(sortedAlbums);
});

// Поиск альбомов
app.get("/albums/search", authenticateToken, (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  if (!query) {
    return res.json([]);
  }

  // Собираем все альбомы
  const allAlbums = users.reduce((albums, user) => {
    if (user.albums) {
      const userAlbums = user.albums.map(album => ({
        ...album,
        artistId: user.id,
        artistName: user.name,
      }));
      return [...albums, ...userAlbums];
    }
    return albums;
  }, []);

  // Поиск по названию альбома и имени исполнителя
  const searchResults = allAlbums.filter(
    album =>
      album.title.toLowerCase().includes(query) ||
      album.artistName.toLowerCase().includes(query),
  );

  // Если есть параметр limit, ограничиваем количество результатов
  const limit = parseInt(req.query.limit);
  if (limit) {
    return res.json(searchResults.slice(0, limit));
  }

  res.json(searchResults);
});

// Получение комментариев для трека или альбома
app.get("/comments/:mediaType/:mediaId", authenticateToken, (req, res) => {
  const { mediaType, mediaId } = req.params;
  const mediaComments = comments
    .filter(
      comment =>
        comment.mediaType === mediaType &&
        comment.mediaId === parseInt(mediaId),
    )
    .map(comment => {
      const user = users.find(u => u.id === comment.userId);
      return {
        id: comment.id,
        text: comment.text,
        createdAt: comment.createdAt,
        user: {
          id: user.id,
          name: user.name,
          avatarUrl: user.avatarUrl,
        },
      };
    });

  res.json(mediaComments);
});

// Добавление комментария
app.post("/comments/:mediaType/:mediaId", authenticateToken, (req, res) => {
  const { mediaType, mediaId } = req.params;
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ message: "Текст комментария обязателен" });
  }

  // Проверяем существование медиа (трека или альбома)
  let mediaExists = false;
  if (mediaType === "track") {
    mediaExists = tracks.some(t => t.id === parseInt(mediaId));
  } else if (mediaType === "album") {
    mediaExists = users.some(
      u => u.albums && u.albums.some(a => a.id === parseInt(mediaId)),
    );
  }

  if (!mediaExists) {
    return res.status(404).json({ message: "Медиа не найдено" });
  }

  const newComment = {
    id: comments.length + 1,
    userId: req.user.id,
    mediaType,
    mediaId: parseInt(mediaId),
    text,
    createdAt: new Date().toISOString(),
  };

  comments.push(newComment);

  const user = users.find(u => u.id === req.user.id);

  res.status(201).json({
    id: newComment.id,
    text: newComment.text,
    createdAt: newComment.createdAt,
    user: {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    },
  });
});

// Удаление комментария
app.delete("/comments/:commentId", authenticateToken, (req, res) => {
  const commentIndex = comments.findIndex(
    c => c.id === parseInt(req.params.commentId) && c.userId === req.user.id,
  );

  if (commentIndex === -1) {
    return res.status(404).json({
      message: "Комментарий не найден или у вас нет прав на его удаление",
    });
  }

  comments.splice(commentIndex, 1);
  res.json({ message: "Комментарий успешно удален" });
});

// Получение альбома по ID
app.get("/album/:id", authenticateToken, (req, res) => {
  const albumId = parseInt(req.params.id);

  // Ищем альбом среди всех пользователей
  for (const user of users) {
    if (user.albums) {
      const album = user.albums.find(a => a.id === albumId);
      if (album) {
        // Добавляем информацию об исполнителе
        return res.json({
          ...album,
          artistId: user.id,
          artistName: user.name,
          artistAvatarUrl: user.avatarUrl,
        });
      }
    }
  }

  res.status(404).json({ message: "Альбом не найден" });
});

// Получение треков альбома
app.get("/album/:id/tracks", authenticateToken, (req, res) => {
  const albumId = parseInt(req.params.id);

  // Ищем альбом и его владельца
  for (const user of users) {
    if (user.albums) {
      const album = user.albums.find(a => a.id === albumId);
      if (album) {
        // Получаем треки альбома, которые принадлежат этому исполнителю
        const albumTracks = tracks.filter(
          track =>
            album.tracks.includes(track.id) && track.artistId === user.id,
        );
        return res.json(albumTracks);
      }
    }
  }

  res.status(404).json({ message: "Альбом не найден" });
});

// Получение всех жанров
app.get("/genres", authenticateToken, (req, res) => {
  res.json(genres);
});

// Обновление жанров пользователя
app.post("/user/genres", authenticateToken, (req, res) => {
  const { genreIds } = req.body;
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  // Получаем названия жанров по их ID
  const selectedGenres = genres
    .filter(genre => genreIds.includes(genre.id))
    .map(genre => genre.name);

  user.genres = selectedGenres;
  res.json({ message: "Жанры успешно обновлены", genres: user.genres });
});

// Обновление списка отслеживаемых музыкантов
app.post("/user/following", authenticateToken, (req, res) => {
  const { musicianIds } = req.body;
  const user = users.find(u => u.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "Пользователь не найден" });
  }

  // В реальном приложении здесь была бы логика сохранения списка отслеживаемых музыкантов
  // Сейчас просто возвращаем успешный ответ
  res.json({
    message: "Список отслеживаемых музыкантов успешно обновлен",
    following: musicianIds,
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
