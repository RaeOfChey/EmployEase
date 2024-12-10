import { Schema, model, type Document } from 'mongoose';
import bcrypt from 'bcrypt';

import { type JobDocument, jobSchema } from './Job.js';

export interface IUser extends Document {
  username: string;
  password: string;
  savedJobs: JobDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    savedJobs: [jobSchema],
  },
  
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.virtual('jobCount').get(function () {
  return this.savedJobs.length;
});

const User = model<IUser>('User', userSchema);

export default User;
