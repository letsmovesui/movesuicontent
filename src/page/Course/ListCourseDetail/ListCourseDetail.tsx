/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { CourseDetailType } from "../../../services/types";
import { githubAPI } from "../../../services/contentServices";
import { useNavigate, useParams } from "react-router-dom";

export const ListCourseDetail = () => {
  const [listCourse, setListCourse] = useState<CourseDetailType[]>([]);
  const pram = useParams();
  const navigate = useNavigate();

  const getGithubContent = async () => {
    try {
      const { data } = await githubAPI.modules(pram.id || "");
      const rs = await Promise.all(
        data.map(async (e) => {
          if (e.type !== "file") {
            const { data } = await githubAPI.getUrlCourseTitle(
              `${e.url.split("?")[0]}/course1.json`
            );
            const jsonContent = JSON.parse(atob(data.content || ""));
            return {
              id: e.name,
              ...jsonContent,
            };
          }
        })
      );
      setListCourse(rs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (pram?.id) {
      getGithubContent();
    }
  }, [pram?.id]);

  return (
    <>
      {listCourse?.map((e, index) => {
        if (e) {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`${e.name}`);
              }}
            >
              <Box>Title:{e?.name}</Box>
            </div>
          );
        }
      })}
    </>
  );
};
