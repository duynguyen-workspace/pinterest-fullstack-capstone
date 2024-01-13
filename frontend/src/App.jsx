// import useRouteElements from "./routes/useRouteElements";

import { Suspense } from "react";
import useRouteElements from "./routes/useRouteElements";
import Loading from "./components/Loading/Loading";

function App() {
  const routeElements = useRouteElements();

  return (
    <Suspense fallback={<Loading />}>
      {routeElements}
    </Suspense>
  )
}

export default App
