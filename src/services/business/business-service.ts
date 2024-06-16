import { IPaginatedBusiness } from "@/types";
import { API } from "@/utils/api";

const getFeaturedBusinesses = async (pageNo = 0, pageSize = 15) => {
  return API.get("/business/featured", {
    params: {
      pageNo,
      pageSize,
    },
  });
};

const getPaginatedBusinesses = async (
  pageNo = 1,
  pageSize = 10,
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

const getNearbyBusinesses = async ({
  latitude,
  longitude,
}: {
  latitude: number | null;
  longitude: number | null;
}) => {
  return API.get("/business/nearby", { params: { latitude, longitude } });
};

export const BusinessService = {
  getFeaturedBusinesses,
  getPaginatedBusinesses,
  getNearbyBusinesses,
};
