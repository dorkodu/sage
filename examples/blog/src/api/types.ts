import { z } from "zod";

/**
 * Type for the "getUser" sage resource.
 */
const getUser = z.object({
  userId: z.number(),
}).strict();

/**
 * Type for the "getBlog" sage resource.
 */
const getBlog = z.object({
  blogId: z.number(),
}).strict();

/**
 * Type for the "getFeed" sage resource.
 */
const getFeed = z.object({
  anchorId: z.number().optional(),
}).strict();

/**
 * Type for the "createBlog" sage resource.
 */
const createBlog = z.object({
  content: z.string().trim().min(1).max(1000),
}).strict();

/**
 * Type for the "likeBlog" sage resource.
 */
const likeBlog = z.object({
  blogId: z.number(),
}).strict();

/**
 * Types for the sage resources, to validate data sent from users.
 */
export const types = {
  getUser,
  getBlog,
  getFeed,
  createBlog,
  likeBlog,
}