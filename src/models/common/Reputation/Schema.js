import mongoose from 'mongoose';

export const ReputationSchema = new mongoose.Schema(
  {
    positive: {
      type: Number,
      default: 0,
    },
    negative: {
      type: Number,
      default: 0,
    },
    changes: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    _id: false,
    toJSON: {
      virtuals: true,
    },
  },
);

ReputationSchema.virtual('total').get(function() {
  return this.positive + this.negative;
});

ReputationSchema.statics.buildIncrease = function ({ path, reputation }) {
  return {
    $inc: {
      [`${path}.positive`]: reputation.changer,
      [`${path}.changes`]: 1,
    },
  };
};

ReputationSchema.statics.increase = async function ({
  model,
  path,
  reputation,
}) {
  const update = ReputationSchema.statics.buildIncrease({ path, reputation });
  return model.update(update);
};

ReputationSchema.statics.buildDecrease = function ({ path, reputation }) {
  return {
    $inc: {
      [`${path}.negative`]: reputation.changer,
      [`${path}.changes`]: 1,
    },
  };
};

ReputationSchema.methods.decrease = function ({
  model,
  path,
  reputation,
}) {
  const update = ReputationSchema.statics.buildDecrease({ path, reputation });
  return model.update(update);
};

ReputationSchema.statics.buildReputationChange = function ({
  path,
  reputation,
}) {
  if (reputation.changer > 0) {
    return ReputationSchema.statics.buildIncrease({ path, reputation });
  }

  if (reputation.changer < 0) {
    return ReputationSchema.statics.buildDecrease({ path, reputation });
  }
};
