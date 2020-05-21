import express from 'express';
const jwt = require('jsonwebtoken');
    
module.exports = (req: any, res: any, next: any) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.decodedData = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Authenticatie mislukt"
        });
    }
    
};