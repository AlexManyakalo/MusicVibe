import { useEffect, useState } from "react";
import api from "@/api";
// Components
import { Loader } from "@/components/index.js";
// Styles
import styles from "./ChartPage.module.scss";

function ChartPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <Loader />;

  return <h4>Страница Весь чарт</h4>;
}

export default ChartPage;
