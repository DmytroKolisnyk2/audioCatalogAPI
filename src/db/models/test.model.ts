import { Models } from '@enums';
import type { TestModel } from '@types';
import type { Model } from 'mongoose';
import { model, Schema } from 'mongoose';

const testSchema = new Schema<TestModel>(
  {
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const testModel: Model<TestModel> = model(Models.TEST, testSchema);
