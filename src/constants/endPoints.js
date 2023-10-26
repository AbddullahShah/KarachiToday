export const BASE_URL = 'https://karachi-today-e1e41b662536.herokuapp.com/';

export default endPoints = {
  baseUrl: BASE_URL,

  // Auth Endpoints
  register: 'user/create/user/',
  login: 'user/login/user/',
  updateUser: 'user/update/',
  uploadUserImage: 'user/profile/pic/',
  forgotPassword: 'user/forgot-password/',
  resetPassword: 'user/reset-password/',
  getAllBlogs: 'blog/all/blogs',
  getBlogsByCategory: 'blog/search/blog/category/',
  getAllCategories: 'blog/all/category/',
  categorySearchByTitle: 'blog/search/category/',
};
