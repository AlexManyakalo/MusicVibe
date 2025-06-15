import { useState, useEffect } from "react";
import api from "@/api";
// Components
import { Input, MenuBtn, Tooltip } from "@/components/index.js";
import { QuestionIcon } from "@/components/index.js";
// Styles
import styles from "./UploadMusicPage.module.scss";

function UploadMusicPage() {
  const [formData, setFormData] = useState({
    albumTitle: "",
    albumDescription: "",
    genre: "",
  });
  const [tracks, setTracks] = useState([{ title: "", audioFile: null }]);
  const [genres, setGenres] = useState([]);
  const [coverFile, setCoverFile] = useState(null);
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
    albumTitle: "Введите название вашего альбома",
    albumDescription: "Добавьте описание альбома",
    genre: "Выберите жанр альбома",
    cover:
      "Загрузите обложку для альбома. Рекомендуемый размер: 500x500 пикселей",
    track: "Загрузите аудиофайл в формате MP3 или WAV",
  };

  // Обработка изменения полей ввода
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // Обработка изменения названия трека
  function handleTrackTitleChange(index, value) {
    const newTracks = [...tracks];
    newTracks[index].title = value;
    setTracks(newTracks);
  }

  // Обработка загрузки обложки
  function handleCoverUpload(event) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Пожалуйста, загрузите изображение");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 5MB");
        return;
      }

      setCoverFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // Обработка загрузки аудио
  function handleAudioUpload(event, index) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        alert("Пожалуйста, загрузите аудиофайл");
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        alert("Файл слишком большой. Максимальный размер: 50MB");
        return;
      }

      const newTracks = [...tracks];
      newTracks[index].audioFile = file;
      setTracks(newTracks);
    }
  }

  // Добавление нового трека
  function handleAddTrack() {
    setTracks([...tracks, { title: "", audioFile: null }]);
  }

  // Удаление трека
  function handleRemoveTrack(index) {
    const newTracks = tracks.filter((_, i) => i !== index);
    setTracks(newTracks);
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
  function handleChangeAudio(index) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "audio/*";
    input.onchange = e => handleAudioUpload(e, index);
    input.click();
  }

  // Обработка отправки формы
  async function handleSubmit() {
    if (
      !formData.albumTitle ||
      !formData.genre ||
      !coverFile ||
      tracks.length === 0
    ) {
      alert("Пожалуйста, заполните все обязательные поля и загрузите файлы");
      return;
    }

    // Проверка наличия названий и аудиофайлов для всех треков
    const hasInvalidTracks = tracks.some(
      track => !track.title || !track.audioFile,
    );
    if (hasInvalidTracks) {
      alert(
        "Пожалуйста, заполните названия и загрузите аудиофайлы для всех треков",
      );
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("albumTitle", formData.albumTitle);
      data.append("albumDescription", formData.albumDescription);
      data.append("genre", formData.genre);
      data.append("cover", coverFile);

      tracks.forEach((track, index) => {
        data.append(`tracks[${index}][title]`, track.title);
        data.append(`tracks[${index}][audio]`, track.audioFile);
      });

      await api.post("/upload/album", data);
      alert("Альбом успешно загружен!");

      // Очистка формы
      setFormData({ albumTitle: "", albumDescription: "", genre: "" });
      setTracks([{ title: "", audioFile: null }]);
      setCoverFile(null);
      setCoverPreview(null);
    } catch (error) {
      console.error("Ошибка при загрузке альбома:", error);
      alert("Произошла ошибка при загрузке альбома");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.top}>
        <h3 className={styles.title}>Загрузка альбома</h3>
      </div>

      <div className={styles.block}>
        <div className={styles.header}>
          <h4 className={styles.subtitle}>Название альбома</h4>
          <Tooltip content={tooltips.albumTitle}>
            <button className={styles.help}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <Input
          type="text"
          name="albumTitle"
          placeholder="Название альбома"
          value={formData.albumTitle}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.block}>
        <div className={styles.header}>
          <h4 className={styles.subtitle}>Описание альбома</h4>
          <Tooltip content={tooltips.albumDescription}>
            <button className={styles.help}>
              <QuestionIcon />
            </button>
          </Tooltip>
        </div>
        <textarea
          name="albumDescription"
          placeholder="Описание альбома"
          value={formData.albumDescription}
          onChange={handleInputChange}
          className={styles.textarea}
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
          <h4 className={styles.subtitle}>Обложка альбома</h4>
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
          <h4 className={styles.subtitle}>Треки</h4>
        </div>
        {tracks.map((track, index) => (
          <div key={index} className={styles.track}>
            <Input
              type="text"
              placeholder="Название трека"
              value={track.title}
              onChange={e => handleTrackTitleChange(index, e.target.value)}
              required
            />
            <div className={styles.audio}>
              {track.audioFile ? (
                <p className={styles.filename}>{track.audioFile.name}</p>
              ) : (
                <p className={styles.empty}>Нет аудиофайла</p>
              )}
            </div>
            <div className={styles.buttons}>
              <MenuBtn
                label="Загрузить аудио"
                onClick={() => handleChangeAudio(index)}
              />
              {track.audioFile && (
                <MenuBtn
                  label="Удалить"
                  danger={true}
                  onClick={() => handleRemoveTrack(index)}
                />
              )}
            </div>
          </div>
        ))}
        <div className={styles.buttons}>
          <MenuBtn label="Добавить трек" onClick={handleAddTrack} />
        </div>
      </div>

      <div className={styles.submit}>
        <MenuBtn
          label="Сохранить альбом"
          onClick={handleSubmit}
          disabled={
            loading ||
            !formData.albumTitle ||
            !formData.genre ||
            !coverFile ||
            tracks.length === 0
          }
        />
      </div>
    </>
  );
}

export default UploadMusicPage;
