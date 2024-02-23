import knex from "../../services/knex.js";
import bcrypt from "bcrypt"

export const getAll = () => {
  return knex("users");
};

export const get = (id) => {
  return knex("users").where({ id }).first();
};

export const save = (params) => {
  params.password = bcrypt.hashSync(params.password, 10)
  return knex("users").insert(params);
};

export const remove = (id) => {
  return knex("users").where({id}).delete();
};

export const update = (id, params) => {
  return knex("users").where({ id }).update(params);
};
