/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { CourseType } from "../../../services/types";
import { githubAPI } from "../../../services/contentServices";
import { useParams } from "react-router-dom";

export const CourseDetail = () => {
  const [listCourse, setListCourse] = useState<CourseType[]>([]);
  const pram = useParams();
  console.log(pram);

  const getGithubContent = async () => {
    try {
      const { data } = await githubAPI.modules(pram.id || "");
      console.log(data);
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
        return (
          <div key={index}>
            <Box>Title:{e?.title.en}</Box>
            <Box>dis: {e?.description.en}</Box>
          </div>
        );
      })}
    </>
  );
};
