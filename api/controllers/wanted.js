import Wanted from "../models/Wanted.js";
import { createError } from "../utils/error.js";

export const createWanted = async (req, res, next) => {
  try {
    const newWanted = new Wanted(req.body);
    await newWanted.save();
    res.status(200).json(newWanted);
  } catch (err) {
    next(err);
  }
};

export const updateWanted = async (req, res, next) => {
  try {
    const updatedWanted = await Wanted.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (!updatedWanted) return next(createError(404, "Wanted bulunamadı!"));
    res.status(200).json(updatedWanted);
  } catch (err) {
    next(err);
  }
};

export const deleteWanted = async (req, res, next) => {
  try {
    await Wanted.findByIdAndDelete(req.params.id);
    res.status(200).json("Wanted silindi.");
  } catch (err) {
    next(err);
  }
};

export const getWanted = async (req, res, next) => {
  try {
    const getWanted = await Wanted.findById(req.params.id);
    if (!getWanted) return next(createError(404, "Wanted bulunamadı!"));
    res.status(200).json(getWanted);
  } catch (err) {
    next(err);
  }
};

export const getAllWanteds = async (req, res, next) => {
  try {
    const getAllWanteds = await Wanted.find();
    const reports = getAllWanteds.map((report) => {
      return {
        ...report._doc,
        createdAt: new Date(report.createdAt).toLocaleString("tr-TR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
      };
    });
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};

export const getWantedByType = async (req, res, next) => {
  try {
    const getWantedByType = await Wanted.find({
      priority: parseInt(req.params.type),
    });
    const reports = getWantedByType.map((report) => {
      return {
        ...report._doc,
        createdAt: new Date(report.createdAt).toLocaleString("tr-TR", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }),
      };
    });
    res.status(200).json(reports);
  } catch (err) {
    next(err);
  }
};
