export const BUSINESS_IMAGE_URL =
  "https://chautary-images-dev.s3.amazonaws.com/business/${business.id}/bannerimage.jpg";

export const getImageofBusiness = (businessId: number) => {
  return `https://chautary-images-dev.s3.amazonaws.com/business/${businessId}/bannerimage.jpg`;
};
