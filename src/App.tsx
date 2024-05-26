import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Course } from "./page/Course/Course";
import { ListCourseDetail } from "./page/Course/ListCourseDetail/ListCourseDetail";
import { Lesson } from "./page/Course/Lesson/Lesson";
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
        <Route path="/modules/:id" element={<ListCourseDetail />} />
        <Route path="/modules/:id/:lesson" element={<Lesson />} />
        {/* </Route> */}
      </Routes>
    </>
  );
}
export default App;
