import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Loader } from "@/components/index.js";
// Styles
import styles from "./SubscribePage.module.scss";

function SubscribePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <Loader />;

  return <h4>Страница Подписки</h4>;
}

export default SubscribePage;
