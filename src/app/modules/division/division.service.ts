import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (Payload: Partial<IDivision>) => {
  const { name, ...rest } = Payload;

  const division = await Division.create({
    name,
    ...rest,
  });

  return division;
};

export const DivisionServices = {
  createDivision,
};
