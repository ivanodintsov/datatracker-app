import mongoose from 'mongoose';
import mongooseLong from 'mongoose-long';
import mongooseDouble from 'mongoose-double';
import { mongoConfig } from '../config';

mongooseLong(mongoose);
mongooseDouble(mongoose);
const connection = mongoose.connect(mongoConfig.url, mongoConfig.options);

export default connection;
