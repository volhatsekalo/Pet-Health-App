import { validationResult } from 'express-validator';

export const errorHandlingForValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Nie wszystkie pola są w poprawnym formacie",
        })
    }
    else {
        next();
    }
}
