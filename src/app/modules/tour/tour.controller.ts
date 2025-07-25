import { TourServices } from "./tour.service";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

/* --------------------------All TOURS TYPE CONTROLLER--------------------------------- */
const createTourType = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const tourType = await TourServices.createTourType(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "TourType Created Successfully",
      data: tourType,
    });
  }
);

const getAllTourType = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const tourTypes = await TourServices.getAllTourTypes(query as Record<string, string>);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All TourTypes Retrieved Successfully",
      data: tourTypes,
    });
  }
);

const getSingleTourType = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const tourTypes = await TourServices.getSingleTourType(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All TourTypes Retrieved Successfully",
      data: tourTypes,
    });
  }
);

const updateTourType = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypeId = req.params.id;
    const payload = req.body;
    const updateTourType = await TourServices.updateTourType(
      tourTypeId,
      payload
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "TourType Updated Successfully",
      data: updateTourType,
    });
  }
);
const deleteTourType = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const tourTypeId = req.params.id;
    await TourServices.deleteTourType(tourTypeId);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "TourType Deleted Successfully",
      data: null,
    });
  }
);

/* --------------------------All TOURS CONTROLLER--------------------------------- */
const createTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourServices.createTour(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Tour created successfully",
    data: result,
  });
});

const getAllTours = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TourServices.getAllTours(
    query as Record<string, string>
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tours retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await TourServices.getSingleTour(slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour retrieved successfully",
    data: result,
  });
});

const updateTour = catchAsync(async (req: Request, res: Response) => {
  const result = await TourServices.updateTour(req.params.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour updated successfully",
    data: result,
  });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TourServices.deleteTour(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour deleted successfully",
    data: result,
  });
});

export const TourController = {
  createTourType,
  getAllTourType,
  getSingleTourType,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
};
