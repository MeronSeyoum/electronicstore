export const GetDBSettings = () => {
    const env = process.env.NODE_ENV;

    if (env === 'development') {
        return {
            host: process.env.host,
            port: parseInt(process.env.port),
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        };
    }
};
