const router = require("express").Router();
const sequelize = require("../config/connection");

const { User, Post, Comment } = require("../models");
const { post } = require("./home-routes");
// const withAuth = require("../utils/auth");
