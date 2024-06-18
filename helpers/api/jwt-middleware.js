import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/register',
            '/api/users/authenticate',
            '/api/product',
            'api/cart/add',
            '/api/ShoppingSession',
            'api/address/*',
            '/productsCollection?*',

            
             // Allow search queries without authentication
             { 
                url: /^\/api\/product\/search$/, 
                methods: ['GET'],
                custom: (req) => req.query && req.query.query
            }

        ]
    });

    return util.promisify(middleware)(req, res);
}