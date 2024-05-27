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
    <div className="flex flex-col gap-8">
      {listCourse?.map((e, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              navigate(`/modules/${e.name}`);
            }}
            className="bg-[#f3f3f3] border border-transparent rounded-[32px] px-10 py-5 hover:border-[#b7b7b7]"
          >
            <div className="text-start">
              <Box className="text-[32px] font-bold">{e?.title.en}</Box>
              <Box className="text-sm">{e?.description.en}</Box>
            </div>
          </div>
        );
      })}
    </div>
  );
};
