const domain = "localhost";
const port = "300";

const server_adress = "http://" + domain + ":" + port;
const section = server_adress + "/api/section";
const post = server_adress + "/api/post";
const login = server_adress + "/api/user/login";
const favorite = server_adress + "/api/favorite";

export { server_adress, section, post, login, favorite };