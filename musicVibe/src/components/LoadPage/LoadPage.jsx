import { Suspense } from "react";
import { Loader } from "@/components/index.js";

const LoadPage = ({ Component }) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export default LoadPage;
