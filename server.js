
const codes = require('./data/statusCodes');

const express = require('express');

const server = express();


const userRoutes = require('./api/userRouter');
const postRoutes = require('./api/postRouter');
const tagRoutes = require('./api/tagRouter');

server.use(express.json());
server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

server.use((err, req, res, next) => {
    err.code = err.code !== undefined ? err.code : codes.INTERNAL_SERVER_ERROR;
    const errorInfo = {
        status: err.code,
        errorMessage: err.message,
        success: false,
        route: err.route
    }
    switch (errorInfo.code) {
        case codes.BAD_REQUEST: 
            res.status(codes.BAD_REQUEST).json(errorInfo);
            return;
        case codes.NOT_FOUND: 
            res.status(codes.NOT_FOUND).json(errorInfo);
            return;
        default:
        res.status(codes.INTERNAL_SERVER_ERROR).json(errorInfo);
    }
});
const port = 8001;
server.listen(port, (req, res) => console.log(`Port ${port} is in use`));