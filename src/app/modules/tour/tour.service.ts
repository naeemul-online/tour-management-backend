import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import {
  tourSearchableFields,
  tourTypeSearchableFields,
} from "./tour.constant";
import { QueryBuilder } from "../../utils/QueryBuilder";

/* --------------------------All TOURS SERVICES--------------------------------- */

const createTour = async (payload: Partial<ITour>) => {
  const existingTour = await Tour.findOne({ title: payload.title });

  if (existingTour) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A tour with this title already exists."
    );
  }

  const tour = await Tour.create(payload);
  return tour;
};

const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = await queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleTour = async (slug: string) => {
  const tour = await Tour.findOne({ slug });
  return tour;
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);
  if (!existingTour) {
    throw new Error("Tour not found.");
  }
  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updatedTour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

/* --------------------------All TOURS TYPES SERVICES--------------------------------- */
const createTourType = async (payload: Partial<ITourType>) => {
  const { name } = payload;
  const isTourTypeExist = await TourType.findOne({ name });
  if (isTourTypeExist) {
    throw new AppError(httpStatus.CONFLICT, "Tour Type already exists");
  }
  const tour = await TourType.create({ name });
  return tour;
};

const getAllTourTypes = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(TourType.find(), query);

  const tourTypes = await queryBuilder
    .search(tourTypeSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();
  const [data, meta] = await Promise.all([
    tourTypes.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };
};

const getSingleTourType = async (id: string) => {
  return await TourType.findById(id);
};

const deleteTourType = async (tourTypeId: string) => {
  const isTourType = await TourType.findById(tourTypeId);
  if (!isTourType) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Type Not Found");
  }
  const deleteTourType = await TourType.findByIdAndDelete(tourTypeId);
  return deleteTourType;
};
const updateTourType = async (
  tourTypeId: string,
  payload: Partial<ITourType>
) => {
  const isTourType = await TourType.findById(tourTypeId);

  if (!isTourType) {
    throw new AppError(httpStatus.NOT_FOUND, "Tour Type Not Found");
  }

  const newUpdateTourType = await TourType.findByIdAndUpdate(
    tourTypeId,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return newUpdateTourType;
};

export const TourServices = {
  createTourType,
  getAllTourTypes,
  getSingleTourType,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
};
