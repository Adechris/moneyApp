 
import db from '../../config/db.js';
export const createUser = async (username, password) => {
return await db('users').insert({ username, password });

};

export const findUserByUsername = async (username) => {
  return await db('users').where({ username }).first();
};
