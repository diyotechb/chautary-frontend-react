import { API } from "@/utils/api";

const getFeaturedBusinesses = async (pageNo = 0, pageSize = 6) => {
  return API.get("/business/featured", {
    params: {
      pageNo,
      pageSize,
    },
  });
};

export const BusinessService = {
  getFeaturedBusinesses,
};
