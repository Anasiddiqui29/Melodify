const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
// ok so since album doesnot have a major role so we will fit its logic in this controller 
// rather than creating seperate routes and logic files
const albumModel = require("../models/album.model")
const userModel = require("../models/user.model")

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
    
    const {title , musicIds , coverImage} = req.body;

    const musics = await musicModel.find({
        _id: {$in : musicIds},
        artist: req.user.id
    })

    if(musics.length !== musicIds.length){
        return res.status(400).json({
            message: "One or more songs donot belong to you"
        });
    }


    const album = await albumModel.create({ 
        title,
        coverImage,
        artist: req.user.id,
        music: musicIds
    })

    await musicModel.updateMany(
        { _id: { $in: musicIds } },
        { $set: { album: album._id } }
    )

    res.status(201).json({
        message: "Album created successfully",
        music: {
            title: album.title,
            id: album.id , 
            music: album.music,
            artist: album.artist,
            coverImage: album.coverImage
        }
    });

}

async function getAllMusics(req,res){
    // find all the musics
    // now if we want to return all the details of the artist then we can use populate method
    const musics = await musicModel
    .find()
    .limit(10)
    .populate("artist" , "username email");

    return res.json({
        message: "Music fetched successfully",
        music: musics,
    })
}

async function getAllAlbums(req,res){

    const albums = await albumModel
    .find()
    .populate("artist" , "username email");

    return res.json({
        message: "Albums fetched successfully",
        albums: albums,
    })
}

async function getAlbumById(req,res){
    
    const albumId = req.params.albumId;

    const album = await albumModel
    .findById(albumId)
    .populate("artist" , "username email")
    .populate({
            path: "music",
            populate: {
                path: "artist",
                select: "username email"
            }
    });

    if(!album){
        return res.status(404).json({
            message: "Album not found"
        });
    }

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })

}

async function searchMusic(req,res){

    const {q} = req.query ;

    console.log("SEARCH QUERY:", q);

    if(!q || q.trim() === ""){
        return res.status(400).json({
            message: "Search query is requried"
        })
    }

    const searchQuery = q.trim() ;

    const songs = await musicModel
        .find({
            title: {
                $regex: searchQuery,
                $options: "i"
            }
        })
        .populate("artist", "username email")
        .populate("album", "title coverImage");

    const albums = await albumModel
        .find({
            title: {
                $regex: searchQuery,
                $options: "i"
            }
        })
        .populate("artist", "username email");

    const artists = await userModel
        .find({
            username: {
                $regex: searchQuery,
                $options: "i"
            }
        })
        .select("username email role")
    
    return res.status(200).json({
        message: "Search results fetched successfully",
        results: {
            songs,
            albums,
            artists
        }
    });
    

}

module.exports = { createMusic , createAlbum , getAllMusics , getAllAlbums , getAlbumById , searchMusic};