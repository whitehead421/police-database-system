import Officer from "../models/Officer.js";
import Rapor from "../models/Rapor.js";
export const updateOfficer = async (req, res, next) => {
  try {
    const updatedOfficer = await Officer.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedOfficer);
  } catch (err) {
    next(err);
  }
};

export const deleteOfficer = async (req, res, next) => {
  try {
    await Officer.findByIdAndDelete(req.params.id);
    res.status(200).json("Officer tenzil edildi.");
  } catch (err) {
    next(err);
  }
};

export const getOfficer = async (req, res, next) => {
  try {
    const getOfficer = await Officer.findById(req.params.id);
    res.status(200).json(getOfficer);
  } catch (err) {
    next(err);
  }
};

export const getAllOfficers = async (req, res, next) => {
  try {
    const getAllOfficers = await Officer.find();
    res.status(200).json(getAllOfficers);
  } catch (err) {
    next(err);
  }
};

export const getStatistics = async (req, res, next) => {
  try {
    const officer = await Officer.findById(req.params.id);
    const reportTypes = ["fts", "olay", "ia"];
    const allData = [];

    for (let i = 0; i < 7; i++) {
      const result = {};
      const date = new Date();
      date.setDate(date.getDate() - i);
      result.name = date.toLocaleDateString("tr-TR", {
        weekday: "long",
      });
      for (let j = 0; j < reportTypes.length; j++) {
        const reportType = reportTypes[j];
        const count = await Rapor.countDocuments({
          officer: officer.name + " " + officer.surname,
          type: reportType,
          createdAt: {
            $gte: new Date(date.setHours(0, 0, 0, 0)),
            $lt: new Date(date.setHours(23, 59, 59, 999)),
          },
        });
        result[reportType] = count;
      }
      allData.push(result);
    }
    res.status(200).json(allData.reverse());
  } catch (err) {
    next(err);
  }
};
