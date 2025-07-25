/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { DivisionServices } from "./division.service";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await DivisionServices.createDivision(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Division Created Successfully",
      data: result,
    });
  }
);

const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const division = await DivisionServices.getAllDivisions(
      query as Record<string, string>
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All division retrieved Successfully",
      data: division.data,
      meta: division.meta,
    });
  }
);

const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const division = await DivisionServices.getSingleDivision(slug);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Division Retrieved Successfully",
      data: division,
    });
  }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id;
    const payload = req.body;
    const updateDivision = await DivisionServices.updateDivision(
      divisionId,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Division Updated Successfully",
      data: updateDivision,
    });
  }
);

const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const divisionId = req.params.id;
    await DivisionServices.deleteDivision(divisionId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Division Deleted Successfully",
      data: null,
    });
  }
);

export const DivisionController = {
  createDivision,
  getAllDivision,
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
