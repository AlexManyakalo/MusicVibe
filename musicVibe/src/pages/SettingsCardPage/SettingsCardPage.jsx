import { useEffect, useState } from "react";
// Components
import { SettingsProfile, Loader } from "@/components/index.js";
// Styles
import styles from "./SettingsCardPage.module.scss";

function SettingsCardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <SettingsProfile type="card" />
    </>
  );
}

export default SettingsCardPage;
