import { useState, useEffect } from "react";
import api from "@/api";
// Components
import { Input, MenuBtn, Tooltip } from "@/components/index.js";
import { QuestionIcon } from "@/components/index.js";
// Styles
import styles from "./UploadMusicPage.module.scss";

function UploadMusicPage() {
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
  });
  const [genres, setGenres] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Получение списка жанров при загрузке компонента
  useEffect(() => {
    async function fetchGenres() {
      try {
        const response = await api.get("/genres");
        setGenres(response.data);
      } catch (error) {
        console.error("Ошибка при получении жанров:", error);
      }
    }
    fetchGenres();
  }, []);

  const tooltips = {
    title: "Введите название вашего трека",
    genre: "Выберите жанр вашего трека",
    cover:
      "Загрузите обложку для трека. Рекомендуемый размер: 500x500 пикселей",
    audio: "Загрузите аудиофайл в формате MP3 или WAV",
  };

  // Обработка изменения полей ввода
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Обработка загрузки обложки
  function handleCoverUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // Проверка типа файла
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, загрузите изображение");
        return;
      }

      // Проверка размера файла (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 5MB");
        return;
      }

      setCoverFile(file);

      // Создание превью
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Обработка загрузки аудио
  function handleAudioUpload(event) {
    const file = event.target.files[0];
    if (file) {
      // Проверка типа файла
      if (!file.type.startsWith("audio/")) {
        alert("Пожалуйста, загрузите аудиофайл");
        return;
      }

      // Проверка размера файла (максимум 50MB)
      if (file.size > 50 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 50MB");
        return;
      }

      setAudioFile(file);
    }
  }

  // Обработка нажатия кнопки "Загрузить обложку"
  function handleChangeCover() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = handleCoverUpload;
    input.click();
  }

  // Обработка нажатия кнопки "Загрузить аудио"
  function handleChangeAudio() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = handleAudioUpload;
    input.click();
  }

  // Обработка отправки формы
  async function handleSubmit() {
    if (!formData.title || !formData.genre || !coverFile || !audioFile) {
      alert("Пожалуйста, заполните все поля и загрузите файлы");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("genre", formData.genre);
      data.append("cover", coverFile);
      data.append("audio", audioFile);

      await api.post("/upload/track", data);
      alert("Трек успешно загружен!");

      // Очистка формы
      setFormData({ title: "", genre: "" });
      setCoverFile(null);
      setAudioFile(null);
      setCoverPreview(null);
    } catch (error) {
      console.error("Ошибка при загрузке трека:", error);
      alert("Произошла ошибка при загрузке трека");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.top}>
        <h3 className={styles.title}>Загрузка трека</h3>
      </div>

      <div className={styles.block}>
        <div className={styles.header}>
          <h4 className={styles.subtitle}>Название трека</h4>
          <Tooltip content={tooltips.title}>
            <button className={styles.help}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <Input
          type="text"
          name="title"
          placeholder="Название трека"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.block}>
        <div className={styles.header}>
          <h4 className={styles.subtitle}>Жанр</h4>
          <Tooltip content={tooltips.genre}>
            <button className={styles.help}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <select
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          className={styles.select}
          required
        >
          <option value="">Выберите жанр</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.block}>
        <div className={styles.header}>
          <h4 className={styles.subtitle}>Обложка</h4>
          <Tooltip content={tooltips.cover}>
            <button className={styles.help}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <div className={styles.preview}>
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Превью обложки"
              className={styles.image}
            />
          )}
        </div>
        <div className={styles.buttons}>
          <MenuBtn label="Загрузить обложку" onClick={handleChangeCover} />
          {coverFile && <MenuBtn label="Удалить" danger={true} />}
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.header}>
          <h4 className={styles.subtitle}>Аудиофайл</h4>
          <Tooltip content={tooltips.audio}>
            <button className={styles.help}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <div className={styles.audio}>
          {audioFile ? (
            <p className={styles.filename}>{audioFile.name}</p>
          ) : (
            <p className={styles.empty}>Нет аудиофайла</p>
          )}
        </div>
        <div className={styles.buttons}>
          <MenuBtn label="Загрузить аудио" onClick={handleChangeAudio} />
          {audioFile && <MenuBtn label="Удалить" danger={true} />}
        </div>
      </div>

      <div className={styles.submit}>
        <MenuBtn
          label="Сохранить"
          onClick={handleSubmit}
          disabled={
            loading ||
            !formData.title ||
            !formData.genre ||
            !coverFile ||
            !audioFile
          }
        />
      </div>
    </>
  );
}

export default UploadMusicPage;
