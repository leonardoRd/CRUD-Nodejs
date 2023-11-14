import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js'
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const register = async (req, res) => {
    const {email, password, username} = req.body // Obtenemos los datos del user
    
    // Siempre que se acceda a la DB tiene que estar en un try catch
    try {
        const userFound = await User.findOne( {email} );
        if (userFound) return res.status(400).json(['The Email is already in use']);

        const passwordHash = await bcrypt.hash(password, 10); // Encripta la contraseña
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        })
    
        const userSave = await newUser.save(); // Creamos un user en la DB

        const token = await createAccessToken({ id: userSave._id}); // Creamos un token para el nuevo user
        res.cookie("token", token); // Al token lo agregamos a la cookie

        //Por ultimo devolvemos los datos del nuevo user
        res.json({
            id: userSave._id,
            username: userSave.username,
            email: userSave.email,
            createAT: userSave.createdAt,
        });
              
    } catch (error) {
       return res.status(500).json({ message: error.message});
    }    
};

export const login = async (req, res) => {
    const {email, password} = req.body // Obtenemos los datos del user
    
    // Siempre que se acceda a la DB tiene que estar en un try catch
    try {
        const userFound = await User.findOne({email}); // Lo buscamos en la DB
        
        if (!userFound) return res.status(400).json( ["User not found"] );
                
        const found = await bcrypt.compare(password, userFound.password); // Comparamos que coincidan las contraseñas
        if (!found) return res.status(400).json( ["Contraseña incorrecta"])                
            
        const token = await createAccessToken({ id: userFound._id}); // Creamos un token para el user
        res.cookie("token", token); // Al token lo agregamos a la cookie

        //Por ultimo devolvemos los datos del user
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createAT: userFound.createdAt,
        });
              
    } catch (error) {
        res.status(500).json({ message: error.message});
    }    
};

export const logout = (req, res) => {
    res.cookie("token", "", {
        expiress: new Date(0)
    })
    return res.sendStatus(400);
};

export const profile = async (req, res) => {
    const idUser = req.user.id        
    const userFound = await User.findById(idUser)
    
    if (!userFound) return res.status(400).json( {message: "User not found"});
    
    return res.json({
        id: userFound._id,        
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt
    });        
}

export const verify = async (req, res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json(["No hay cookie"]);

    jwt.verify(token, TOKEN_SECRET, async(err, user) => {

        if(err) return res.status(401).json(["No hay token"]);
        
        const userFound = await User.findById(user.payload.id);

        if(!userFound) return res.status(401).json(["user no encontrado"]);

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })

    })   


}