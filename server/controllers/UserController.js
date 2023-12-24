import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { username, email, password, userAvatarUrl } = req.body;

        await User.findOne({ email })
            .then(userExists => {
                if (userExists) {
                    return res.status(400).json({ message: 'Użytkownik z tym adresem email już istnieje' });
                }
            });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let newUser = new User({ username, email, password: hashedPassword, userAvatarUrl });
        await newUser.save();

        return res.status(200).json({ message: 'Udało się zarejestrować', newUser });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Nie udało się zarejestrować' });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({
                message: "Użytkownik o podanym email nie istnieje",
            })
        }

        const isValidPassword = await bcrypt.compare(password, userExists.password)
        if (!isValidPassword) {
            return res.status(401).json({ message: "Niepoprawny email lub hasło" });
        }
        
        const token = jwt.sign({ _id: userExists._id }, "tajemnica654", { expiresIn: '30d' }); 
        return res.status(200).json({ message: 'Zalogowano pomyślnie', token });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Wystąpił błąd podczas logowania' });
    }
}


export const getUserInfo = async (req, res) => {
    try {
        await User.findById(req.userId)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'Nie znaleziono użytkownika o podanym ID' });
                }
                else {
                    const { password, ...userData } = user._doc;
                    return res.status(200).json({ ...userData });
                }
            });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Wystąpił błąd podczas szukania użytkownika',
        });
    }
}