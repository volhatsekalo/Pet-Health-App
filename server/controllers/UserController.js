import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, userAvatarUrl } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Użytkownik z tym adresem email już istnieje' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, hashedPassword, userAvatarUrl });
        await newUser.save();

        res.status(201).json({ message: 'Udało się zarejestrować' });
    }
    catch (error) {
        res.status(500).json({ message: 'Nie udało się zarejestrować' });
    }
}

export const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        const { hashedPassword, ...userData } = userExists; // wyciagamy dane bez hasla
        if (!userExists) {
            return res.status(404).json({
                message: "Użytkownik o podanym email nie istnieje",
            })
        }

        const isValidPassword = await bcrypt.compare(password, userExists.hashedPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                message: "Niepoprawny email lub hasło",
            });
        }

        res.status(200).json({ message: 'Zalogowano pomyślnie', userData });
    }
    catch (error) {
        res.status(500).json({ message: 'Wystąpił błąd podczas logowania' });
    }
}


export const auth = async (req, res) => {

}