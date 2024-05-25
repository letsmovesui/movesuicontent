import axios from "axios";
import { UrlGithubContent } from "../units/constans";
import { IGit } from "./types";

export const githubAPI = {
  listContent: async () => {
    return await axios.get<IGit[]>(`${UrlGithubContent}`);
  },
  contentByName: async (name: string) => {
    return await axios.get<IGit>(`${UrlGithubContent}/${name}/test.json`);
  },
  modules: async (name: string) => {
    return await axios.get<IGit>(`${UrlGithubContent}/${name}`);
  },
};
