import jwt_decode from "jwt-decode";

export const JWTDecode = token => {
  const decoded = jwt_decode(token);
  return decoded;
};

export const getUser = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JWTDecode(token);
  } else {
    return null;
  }
};
