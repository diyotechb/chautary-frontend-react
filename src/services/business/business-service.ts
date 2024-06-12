import { API } from "@/utils/api";

const getFeaturedBusinesses = async (pageNo = 0, pageSize = 6) => {
  return API.get("/business/featured", {
    params: {
      pageNo,
      pageSize,
    },
  });
};

const getPaginatedBusinesses = async (
  pageNo = 1,
  pageSize = 6,
  categoryId = "",
  sortBy = "",
) => {
  return API.get("/business/paginated", {
    params: {
      pageNo,
      pageSize,
      categoryId,
      sortBy,
    },
  });
};

export const BusinessService = {
  getFeaturedBusinesses,
  getPaginatedBusinesses,
};
