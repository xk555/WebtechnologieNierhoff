const domain = "zweipluseins.de";
const port = "300";

const server_adress = "http://" + domain + ":" + port;
const section = server_adress + "/api/section";
const post = server_adress + "/api/post";
const login = server_adress + "/api/user/login";
const favorite = server_adress + "/api/favorite";
const newest = server_adress + "/api/post/newest";
const search = server_adress + "/api/post/search/";
const filteredData = section + "/filteredData";

export {
  domain,
  server_adress,
  section,
  post,
  login,
  favorite,
  newest,
  search,
  filteredData
};
