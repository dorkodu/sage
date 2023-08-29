/**
 * Type of the "session" table in a SQL database.
 */
export interface ISession {
  /**
   * In a SQL database, this would be the primary key of the "session" table.
   */
  id: number;

  /**
   *  User id corresponding to the session.
   */
  userId: number;

  /**
   * JWT or hash of the session. In a normal app, this would be stored in browser cookies of the user.
   */
  token: string;
}

/**
 * Type of the "user" table in a SQL database.
 */
export interface IUser {
  /**
   * In a SQL database, this would be the primary key of the "user" table.
   */
  id: number;

  /**
   * Username of the user.
   */
  username: string;
}

/**
 * Type of the "blog" table in a SQL database.
 */
export interface IBlog {
  /**
   * In a SQL database, this would be the primary key of the "blog" table.
   */
  id: number;

  /**
   * Id of the user that created the blog.
   */
  userId: number;

  /**
   * Text content of the blog.
   */
  content: string;

  /**
   * Like count of the blog.
   */
  likeCount: number;
}

/**
 * Type of the "like" table in a SQL database.
 */
export interface ILike {
  /**
   * In a SQL database, this would be the primary key of the "like" table.
   */
  id: number;

  /**
   * Id of the user that liked a blog.
   */
  userId: number;

  /**
   * Id of the blog that is liked.
   */
  blogId: number;
}

/**
 * In a SQL database, this would be the auto-increment primary key of the "session" table.
 * It's increased everytime a "session" is created.
 */
const sessionsIndex = 2;

/**
 * Example "session" data.
 */
const sessions: Array<ISession> = [
  { id: 0, userId: 0, token: "token_of_berk" },
  { id: 1, userId: 1, token: "token_of_doruk" },
]

/**
 * In a SQL database, this would be the auto-increment primary key of the "user" table.
 * It's increased everytime a "user" is created.
 */
const usersIndex = 2;

/**
 * Example "user" data.
 */
const users: Array<IUser> = [
  { id: 0, username: "berk" },
  { id: 1, username: "doruk" },
]

/**
 * In a SQL database, this would be the auto-increment primary key of the "blog" table.
 * It's increased everytime a "blog" is created.
 */
const blogsIndex = 5;

/**
 * Example "blog" data.
 */
const blogs: Array<IBlog> = [
  { id: 0, userId: 0, content: "hello world", likeCount: 1 },
  { id: 1, userId: 0, content: "goodbye world", likeCount: 1 },
  { id: 2, userId: 1, content: "testing", likeCount: 1 },
  { id: 3, userId: 1, content: "attention please", likeCount: 1 },
  { id: 4, userId: 1, content: "ceo of dorkodu", likeCount: 1 },
]

/**
 * In a SQL database, this would be the auto-increment primary key of the "like" table.
 * It's increased everytime a "like" is created.
 */
const likesIndex = 5;

/**
 * Example "like" data.
 */
const likes: Array<ILike> = [
  { id: 0, userId: 0, blogId: 2 },
  { id: 1, userId: 0, blogId: 3 },
  { id: 2, userId: 0, blogId: 4 },
  { id: 3, userId: 1, blogId: 0 },
  { id: 4, userId: 1, blogId: 1 },
]

/**
 * Example database data, as we don't have a SQL database running here.
 */
export const data = {
  /**
   * Session data.
   */
  sessions,
  
  /**
   * User data.
   */
  users,

  /**
   * Blog data.
   */
  blogs,

  /**
   * Like data.
   */
  likes,

  /**
   * The auto-increment primary key of the "session" table.
   */
  sessionsIndex,

  /**
   * The auto-increment primary key of the "user" table.
   */
  usersIndex,

  /**
   * The auto-increment primary key of the "blog" table.
   */
  blogsIndex,

  /**
   * The auto-increment primary key of the "like" table.
   */
  likesIndex,
}
