/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { LessonType } from "../../../services/types";
import { githubAPI } from "../../../services/contentServices";
import { useParams } from "react-router-dom";

export const Lesson = () => {
  const [listLesson, setListLesson] = useState<{
    title: string;
    lesson: LessonType[];
  }>();
  const pram = useParams();
  const getGithubContent = async () => {
    try {
      const { data } = await githubAPI.lessons(
        pram.id || "",
        pram.lesson || ""
      );
      const jsonContent = JSON.parse(atob(data.content || ""));
      setListLesson(jsonContent);
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
      {listLesson?.lesson?.map((e, index) => {
        if (e) {
          return (
            <div
              key={index}
              className="bg-[#f3f3f3] border border-transparent rounded-[32px] p-8 hover:border-[#b7b7b7]"
            >
              <Box className="text-[32px] font-bold">{e?.title}</Box>
            </div>
          );
        }
      })}
    </div>
  );
};
