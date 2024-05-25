import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Course } from "./page/Course/Course";
import { CourseDetail } from "./page/Course/CourseDetail/CourseDetail";
function App() {
  return (
    <>
      <Routes>
        {/* <Route element={<></>}> */}
        {/* {routes.map((routes, index) => {
          const { path, component: Component } = routes;
          return (
            <Route
              key={index}
              path={path}
              element={
                <Suspense>
                  <Component />
                </Suspense>
              }
            />
          );
        })} */}
        <Route path="/" element={<Course />} />
        <Route path="/modules/:id" element={<CourseDetail />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}
export default App;
