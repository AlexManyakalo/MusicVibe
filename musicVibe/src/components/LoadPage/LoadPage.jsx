import { Suspense } from "react";
import Loader from "@/components/Loader/Loader";

const LoadPage = ({ Component }) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export default LoadPage;
