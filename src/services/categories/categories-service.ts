import { API } from "@/utils/api";

const getAllCategories = async () => {
  return API.get("/categories/all");
};

export const CategoriesService = {
  getAllCategories,
};
