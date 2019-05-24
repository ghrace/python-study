const jwt = require("jsonwebtoken");
const header = {
  // 加密算法
  alg: "HS256",
  type: "jwt"
};
const payload = {
  // 表示 jwt 创建时间
  iat: 1532135735,

  // 表示 jwt 过期时间
  exp: 1532136735,

  // 用户 id，用以通信
  user_id: 10086
};
// const sign = HMACSHA256(base64.encode(header) + '.' + base64.encode(payload), secret)
const token = jwt.sign({ name: "ghr" }, "payload", {
  expiresIn: 7200
});
let decoded = jwt.decode(token);
console.log(token);
console.log(decoded);
let verify = jwt.verify(token, "payload");
console.log("verify", verify);
