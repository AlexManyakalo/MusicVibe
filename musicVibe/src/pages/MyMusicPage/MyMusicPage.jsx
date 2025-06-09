import { useEffect, useState } from "react";
import api from "@/api";
import { useFavorites } from "@/context/FavoritesContext";
import { useFavoriteAlbums } from "@/context/FavoriteAlbumsContext";
import { useFollowing } from "@/context/FollowingContext";
// Components
import { Section, Loader } from "@/components/index.js";

function MyMusicPage() {
  const [favoriteTracks, setFavoriteTracks] = useState([]);
  const [favoriteAlbumsList, setFavoriteAlbumsList] = useState([]);
  const [followingMusicians, setFollowingMusicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites } = useFavorites();
  const { favoriteAlbums } = useFavoriteAlbums();
  const { following } = useFollowing();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Получаем информацию о избранных треках
        const tracksPromises = favorites.map(trackId =>
          api.get(`/track/${trackId}`),
        );
        const tracksResponses = await Promise.all(tracksPromises);
        const tracksData = tracksResponses.map(res => res.data);
        setFavoriteTracks(tracksData);

        // Получаем информацию о избранных альбомах
        const albumsPromises = favoriteAlbums.map(albumId =>
          api.get(`/album/${albumId}`),
        );
        const albumsResponses = await Promise.all(albumsPromises);
        const albumsData = albumsResponses.map(res => res.data);
        setFavoriteAlbumsList(albumsData);

        // Получаем информацию о отслеживаемых музыкантах
        const musiciansPromises = following.map(musicianId =>
          api.get(`/musician/${musicianId}`),
        );
        const musiciansResponses = await Promise.all(musiciansPromises);
        const musiciansData = musiciansResponses.map(res => res.data);
        setFollowingMusicians(musiciansData);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [favorites, favoriteAlbums, following]);

  if (loading) return <Loader />;

  return (
    <>
      <Section
        title="Избранные треки"
        link="/favorites"
        tracks={favoriteTracks}
      />
      <Section
        title="Избранные альбомы"
        link="/favorites/albums"
        albums={favoriteAlbumsList}
      />
      <Section
        title="Отслеживаемые музыканты"
        link="/following"
        musicians={followingMusicians}
      />
    </>
  );
}

export default MyMusicPage;
