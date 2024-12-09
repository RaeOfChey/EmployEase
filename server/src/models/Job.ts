import { Schema, type Document } from 'mongoose';

interface JobDocument extends Document {
  jobId: string;
  content: string;
  jobTitle: string;
  datePublished: string;
  refs: { landingPage: string };
  levels: { name: string }[];
  locations: { name: string }[];
  company: { name: string };
}

const jobSchema = new Schema<JobDocument>({
  jobId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  datePublished: {
    type: String,
    required: true,
  },
  refs: {
    landingPage: {
      type: String,
      required: true,
    },
  },
  levels: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  locations: [
    {
      name: {
        type: String,
        required: true,
      },
    },
  ],
  company: {
    name: {
      type: String,
      required: true,
    },
  },
});

export  {jobSchema, type JobDocument};
