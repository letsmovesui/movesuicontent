export type Langue = {
  en: string;
  vi: string;
};
export type IGit = {
  name: string;
  content?: string;
  type: string;
  url: string;
};
export type CourseType = {
  name: string;
  title: Langue;
  description: Langue;
};
export type CourseDetailType = {
  name: string;
  id: string;
};
