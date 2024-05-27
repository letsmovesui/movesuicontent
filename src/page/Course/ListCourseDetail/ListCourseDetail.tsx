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
              `${e.url.split("?")[0]}/title.json`
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
    <div className="flex flex-col gap-8">
      {listCourse?.map((e, index) => {
        if (e) {
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`${e.id}`);
              }}
              className="bg-[#f3f3f3] border border-transparent rounded-[32px] p-8 hover:border-[#b7b7b7]"
            >
              <Box className="text-[32px] font-bold">{e?.name}</Box>
            </div>
          );
        }
      })}
    </div>
  );
};
