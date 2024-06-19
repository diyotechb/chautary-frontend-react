"use client";
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
}: {
  latitude: number | null;
  longitude: number | null;
}) => {
  const countryCode = localStorage.getItem("country") ?? "USA";
  return API.get("/business/nearby", {
    params: { latitude, longitude, countryCode },
  });
};

const getBusinessCountries = async () => {
  return API.get("/business/countries");
};

export const BusinessService = {
  getFeaturedBusinesses,
  getPaginatedBusinesses,
  getNearbyBusinesses,
  getBusinessCountries,
};
