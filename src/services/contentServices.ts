import axios from "axios";
import { UrlGithubContent } from "../units/constans";
import { IGit } from "./types";

export const githubAPI = {
  listContent: async () => {
    return await axios.get<IGit[]>(`${UrlGithubContent}`);
  },
  contentByName: async (name: string) => {
    return await axios.get<IGit>(`${UrlGithubContent}/${name}/title.json`);
  },
  modules: async (name: string) => {
    return await axios.get<IGit[]>(`${UrlGithubContent}/${name}`);
  },
  getUrlCourseTitle: async (url: string) => {
    return await axios.get<IGit>(`${url}`);
  },
  lessons: async (content: string, modules: string) => {
    return await axios.get<IGit>(
      `${UrlGithubContent}/${content}/${modules}/title.json`
    );
  },
};
