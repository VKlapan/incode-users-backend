const express = require("express");
const controllers = require("../controllers/users");
const middlewares = require("../middlewares");

const route = express.Router();

route.get("/", middlewares.authMiddleware, controllers.getAllUsers);
route.post("/signup", controllers.createUser);
route.get("/signin", controllers.loginUser);

module.exports = route;

/* 

>post/signup
Register user

req.body = {
    name,
    email,
    password
    }

res={
    code:200,
    message: "User created"
    }

>post/signin
Authenticate as a user

req.body={
    email,
    password
    }

    res={
    code:200,
    token_with_id_and_role
    }

get/
Return list of users, taking into account the following:
- administrator should see everyone
- boss should see herself and all subordinates (recursively)
- regular user can see only herself

req.header = {
    autorized: Bearer token
    }

res={
    code:200,
    user: {},
    subordinates: [{user}, {user, subordinates: [{}, {}, ...]}, {user} ...]
    }

put/:userid/boss
Change user's boss (only boss can do that and only for her subordinates)
(?) Is it needed or not to perform the logout procedure for new and old boss of the changed user after this changing(?)

roles
["USER", "BOSS", "ADMIN"]


*/
