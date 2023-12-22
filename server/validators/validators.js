import { body } from 'express-validator';

export const validateRegistration = [
    body('username').notEmpty().notEmpty().matches(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9]+$/, 'i').withMessage('Username should contain only letters and digits'),
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
    body('userAvatarUrl').optional().isURL(),
]

export const validateLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
]

export const validatePet = [
    body('name').notEmpty().isAlpha('pl-PL').withMessage('Pet name should contain only letters'),
    body('breed').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Breed should contain only letters and spaces'),
    body('currentWeight').notEmpty().isNumeric().withMessage('Weight is a number'),
    body('status').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Status should contain only letters and spaces'),
    body('petAvatarUrl').optional().isURL().withMessage('Provide a valid link to an image'),
]

export const validateTask = [
    body('taskType').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Task type should contain only letters and spaces'),
    body('date').isISO8601().toDate(),
]
