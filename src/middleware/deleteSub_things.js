import { cM, cS } from "../../db/models/category.model.js";
import { scM } from "../../db/models/subcategory.js";
export const  midWare= cS.pre('remove', async function(next) {
    try {
      await scM.deleteMany({ categoryId: this._id });
      next();
    } catch (err) {
      next(err);
    }
  });