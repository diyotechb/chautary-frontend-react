import { IPaginatedBusiness } from "@/types";
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
  const business: IPaginatedBusiness = await API.get("/business/paginated", {
    params: {
      pageNo,
      pageSize,
      categoryId,
      sortBy,
    },
  });
  return business;
};

export const BusinessService = {
  getFeaturedBusinesses,
  getPaginatedBusinesses,
};
