import { useEffect, useState } from "react";
// Components
import { SettingsProfile, Loader } from "@/components/index.js";
// Styles
import styles from "./SettingsProfilePage.module.scss";

function SettingsProfilePage() {
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
      <SettingsProfile type="profile" />
    </>
  );
}

export default SettingsProfilePage;
