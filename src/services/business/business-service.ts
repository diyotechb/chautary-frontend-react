import { IPaginatedBusiness } from "@/types";
import { API } from "@/utils/api";

const getFeaturedBusinesses = async (pageNo = 1, pageSize = 9) => {
  const countryCode = localStorage.getItem("country") ?? "USA";
  return API.get("/business/featured", {
    params: {
      pageNo,
      pageSize,
      countryCode,
    },
  });
};

const getPaginatedBusinesses = async (
  searchKeyword = "",
  pageNo = 1,
  pageSize = 10,
  categoryId = "",
  sortBy = "",
) => {
  const countryCode = localStorage.getItem("country") ?? "USA";
  const business: IPaginatedBusiness = await API.get("/business/paginated", {
    params: {
      searchKeyword,
      pageNo,
      pageSize,
      categoryId,
      sortBy,
      countryCode,
    },
  });
  return business;
};

const getNearbyBusinesses = async ({
  latitude,
  longitude,
  count = 9,
}: {
  latitude: number | null;
  longitude: number | null;
  count?: number;
}) => {
  const countryCode = localStorage.getItem("country") ?? "USA";
  return API.get("/business/nearby", {
    params: { latitude, longitude, countryCode, count },
  });
};

const getBusinessCountries = async () => {
  return API.get("/business/countries");
};

const getBusinessByID = async (id: string) => {
  return API.get(`/business/${id}`);
};

export const BusinessService = {
  getFeaturedBusinesses,
  getPaginatedBusinesses,
  getNearbyBusinesses,
  getBusinessCountries,
  getBusinessByID,
};
