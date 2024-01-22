import { body } from 'express-validator';
import mongoose from 'mongoose';

export const validateRegistration = [
    body('username').notEmpty().matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s]+$/, 'i').withMessage('Username should contain only letters and digits'),
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    body('password').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).*$/).withMessage('Password should be at least 8 characters long, including 1 small and 1 big letter, digit and special character'),
]

export const validateLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    // body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long, including 1 small and 1 big letter, digit and special character'),
]

export const validateUser = [
    body('username').notEmpty().matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s]+$/, 'i').withMessage('Username should contain only letters and digits'),
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    body('userAvatarUrl').optional()
        .custom((value) => {
            if (value !== '' && !value.match(/^\/uploads\/.+/i)) {
                throw new Error('Invalid path for an avatar');
            }
            return true;
        })
        .withMessage('AvatarUrl must be empty string or start with "/uploads/" followed by a filename'),
]

export const validatePasswordChange = [
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    // body('password').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).*$/).withMessage('Password should be at least 8 characters long, including 1 small and 1 big letter, digit and special character'),
    body('newPassword').isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).*$/).withMessage('Password should be at least 8 characters long, including 1 small and 1 big letter, digit and special character'),
]

export const validatePet = [
    body('name').notEmpty().isAlpha('pl-PL').withMessage('Pet name should contain only letters'),
    body('breed').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Breed should contain only letters and spaces'),
    body('currentWeight').notEmpty().isNumeric().withMessage('Weight is a number'),
    body('petAvatarUrl').optional()
        .custom((value) => {
            if (value !== '' && !value.match(/^\/uploads\/.+/i)) {
                throw new Error('Invalid path for an avatar');
            }
            return true;
        })
        .withMessage('petAvatarUrl must be empty string or start with "/uploads/" followed by a filename'),
    body('lastVetVisit').optional().isISO8601().toDate()
]

export const validateUpdatePet = [
    body('name').optional().isAlpha('pl-PL').withMessage('Pet name should contain only letters'),
    body('breed').optional().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Breed should contain only letters and spaces'),
    body('currentWeight').optional().isNumeric().withMessage('Weight is a number'),
    body('petAvatarUrl').optional()
        .custom((value) => {
            if (value !== '' && !value.match(/^\/uploads\/.+/i)) {
                throw new Error('Invalid path for an avatar');
            }
            return true;
        })
        .withMessage('petAvatarUrl must be empty string or start with "/uploads/" followed by a filename'),
    body('lastVetVisit').optional().isISO8601().toDate()
]

export const validateTask = [
    body('taskType').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Task type should contain only letters and spaces'),
    body('date').isISO8601().toDate(),
]

export const validateWeight = [
    body('currentWeight').notEmpty().isNumeric().withMessage('Weight is a number'),
    body('pet')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('Invalid ObjectID for pet');
            }
            return true;
        })
        .withMessage('pet must be a valid ObjectID'),
]
