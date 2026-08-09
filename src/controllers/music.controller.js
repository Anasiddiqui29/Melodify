const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
// ok so since album doesnot have a major role so we will fit its logic in this controller 
// rather than creating seperate routes and logic files
const albumModel = require("../models/album.model")

async function createMusic(req, res) {

    const {title} = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString('base64'));

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

async function createAlbum(req, res){
    
    const {title , musicIds} = req.body;

    const album = await albumModel.create({ 
        title,
        artist: decoded.id,
        music: musicIds,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            title: album.title,
            id: album.id , 
            music: album.music,
            artist: album.artist,
        }
    })

}

module.exports = { createMusic , createAlbum };