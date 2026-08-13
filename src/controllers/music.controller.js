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
        artist: req.user.id,
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
        artist: req.user.id,
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

async function getAllMusics(req,res){
    // find all the musics
    // now if we want to return all the details of the artist then we can use populate method
    const musics = await musicModel
    .find()
    .limit(2)
    .populate("artist" , "username email");

    return res.json({
        message: "Music fetched successfully",
        music: music,
    })
}

async function getAllAlbums(req,res){

    const albums = await musicModel.find().select("title artist").populate("artist" , "username email");

    return res.json({
        message: "Albums fetched successfully",
        album: albums,
    })
}

async function getAlbumById(req,res){
    
    const albumId = req.params.albumId;

    const album = await albumModel.findById(albumId).populate("artist" , "username email");

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })

}

module.exports = { createMusic , createAlbum , getAllMusics , getAllAlbums , getAlbumById};