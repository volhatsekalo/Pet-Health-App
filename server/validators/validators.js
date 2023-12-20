import { body } from 'express-validator';

export const validateRegistration = [
    body('username').notEmpty().isAlphanumeric().withMessage('Username should contain only letters and digits'),
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
    body('userAvatarUrl').optional().isURL(),
]

export const validateLogin = [
    body('email').isEmail().normalizeEmail().withMessage('Email should contain @'),
    body('password').isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
]

export const validatePet = [
    body('name').notEmpty().isAlpha().withMessage('Pet name should contain only letters'),
    body('breed').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Breed should contain only letters and spaces'),
    body('currentWeight').notEmpty().isNumeric().withMessage('Weight is a number'),
    body('status').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Status should contain only letters and spaces'),
    body('petAvatarUrl').optional().isURL().withMessage('Provide a valid link to an image'),
]

export const validateTask = [
    body('taskType').notEmpty().isAlpha('pl-PL', { ignore: ' ' }).withMessage('Task type should contain only letters and spaces'),
    body('date').notEmpty().isDate(),
    body('time').notEmpty().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Provide time in a format HH:MM'),
]
