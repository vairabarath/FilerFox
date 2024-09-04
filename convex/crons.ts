import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "Delete any old files marked for deletion",
  { hours: 24 * 60 * 60 * 1000 },
  internal.files.deleteAllFiles
);

export default crons;
