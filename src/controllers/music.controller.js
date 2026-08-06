const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const musicUpload = require("../services/storage.service");

async function createMusic(req, res) {
    
    const token = req.cookies.token;

    if(!token)
    {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(decoded.role !== "artist")
        {
            return res.status(403).json({
                message: "Forbidden to create music."
            })
        }

    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized"
        })
        console.log(err);
    }

    const {title} = {req.body};
    const file = req.file;

    const result = await musicUpload(file.buffer.toString('base64'));

    const music = await musicModel.create({
        uri: result.url , 
        title,
        artist: decoded.id,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            title: music.title,
            id: music.id , 
            uri : music.uri,
            artist: music.artist,
        }
    })


}