import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {
  const existingDivision = await Division.findOne({ name: payload.name });

  if (existingDivision) {
    throw new Error("A division with this name already exists.");
  }

  const division = await Division.create(payload);

  return division;
};

const getAllDivisions = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Division.find(), query);

  const division = await queryBuilder
    .search(divisionSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    division.build(),
    queryBuilder.getMeta(),
  ]);

  return { data, meta };

  // const division = await Division.find();
  // const totalDivision = await Division.countDocuments();

  // return {
  //   data: division,
  //   meta: {
  //     total: totalDivision,
  //   },
  // };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  return division;
};

const updateDivision = async (id: string, payload: Partial<IDivision>) => {
  const isDivisionExist = await Division.findById(id);

  if (!isDivisionExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Division Not Found");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new AppError(
      httpStatus.CONFLICT,
      "A division with this name already exist"
    );
  }

  const newUpdateDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdateDivision;
};

const deleteDivision = async (id: string) => {
  await Division.findByIdAndDelete(id);
  return null;
};

export const DivisionServices = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
