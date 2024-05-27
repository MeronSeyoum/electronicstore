import getConfig from 'next/config';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { db } from 'helpers/api';
import crypto from 'crypto';

const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await db.User.scope('withHash').findOne({ where: { username } });

    if (!(user && bcrypt.compareSync(password, user.hash))) {
        throw 'Username or password is incorrect';
    }

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, { expiresIn: '7d' });

    // remove hash from return value
    const userJson = user.get();
   const  userId= userJson.id || 3;
    delete userJson.hash;
 
    const session_id = sessionStorage.getItem('shoppingSession') || null;
 
 if(userId !==3){
    try {
        const response = await fetch("/api/shoppingSession/createShoppingSession", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, session_id }),
        });
  
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error("Failed to create shopping session:", response.statusText);
          return null;
        }
      } catch (error) {
        console.error("Error creating shopping session:", error);
        return null;
      }
    }
    // return user and jwt
    return {
        ...userJson,
        token
    };
    // Encrypt userJson
    // const cipher = crypto.createCipher('aes-256-cbc', serverRuntimeConfig.encryptionSecret);
    // let encryptedUserJson = cipher.update(JSON.stringify(userJson), 'utf8', 'hex');
    // encryptedUserJson += cipher.final('hex');

    // // return encrypted user and jwt
    // return {
    //     encryptedUserJson,
    //     token
    // };
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await db.User.findByPk(id);
}

async function create(params) {
    // validate
    if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    const user = new db.User(params);

    // hash password
    if (params.password) {
        user.hash = bcrypt.hashSync(params.password, 10);
    }

    // save user
    await user.save();
}

async function update(id, params) {
    const user = await db.User.findByPk(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== params.username && await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password if it was entered
    if (params.password) {
        params.hash = bcrypt.hashSync(params.password, 10);
    }

    // copy params properties to user
    Object.assign(user, params);

    await user.save();
}

async function _delete(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';

    // delete user
    await user.destroy();
}
