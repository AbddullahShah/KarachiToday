export const BASE_URL = 'https://karachi-today-e1e41b662536.herokuapp.com/';

export default endPoints = {
  baseUrl: BASE_URL,

  // Auth Endpoints
  register: 'user/create/user/',
  login: 'user/login/user/',
  findUser: 'user/find/user/',
  updateUser: 'user/update/',
  uploadUserImage: 'user/profile/pic/',
  forgotPassword: 'user/forgot-password/',
  resetPassword: 'user/reset-password/',
  getAllBlogs: 'blog/all/blogs',
  getBlogsByCategory: 'blog/search/blog/category/',
  getAllCategories: 'blog/all/category/',
  categorySearchByTitle: 'blog/search/category/',
  getSaveBlogs: 'user/saved/blogs/',
  saveUnsavedBlogs: 'user/saved/blog/',
  hideUnHideBlogs: 'user/hide/blog/',
  searchBlogByTitle: 'blog/search/blog/',
  getCommentsByBlog: 'blog/findcomment/',
  postComments: 'blog/comment/',
  likeComment: 'blog/likeComment/',
  findBlogcomment: 'blog/findBlogcomment/',
  oneBlog: '/blog/one/blogs/',
  createQuery: '/qu/create/query',
};
