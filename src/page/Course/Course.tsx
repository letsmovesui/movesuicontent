/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { githubAPI } from "../../services/contentServices";
import { Box } from "@chakra-ui/react";
import { CourseType } from "../../services/types";
import { useNavigate } from "react-router-dom";

export const Course = () => {
  const [listCourse, setListCourse] = useState<CourseType[]>([]);
  const navigate = useNavigate();

  const getGithubContent = async () => {
    try {
      const { data } = await githubAPI.listContent();
      const rs = await Promise.all(
        data.map(async (e) => {
          const rq = await githubAPI.contentByName(e.name);
          const jsonContent = JSON.parse(atob(rq.data.content || ""));
          return {
            name: e.name,
            ...jsonContent,
          };
        })
      );
      setListCourse(rs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getGithubContent();
  }, []);

  return (
    <>
      {listCourse?.map((e, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              navigate(`/modules/${e.name}`);
            }}
          >
            <Box>Title:{e?.title.en}</Box>
            <Box>dis: {e?.description.en}</Box>
          </div>
        );
      })}
    </>
  );
};
