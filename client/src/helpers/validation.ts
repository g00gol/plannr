// Joi
import Joi from 'joi';

const email = Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'edu', 'gov'] }})
    .required()
    .messages({
        'string.email': 'Invalid email address',
        'string.empty': 'Please enter your email address'
    });
const username = Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot be more than 30 characters long',
        'string.empty': 'Please enter a username'
    });
const password = Joi.string()
    .min(8)
    .max(30)
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/)
    .required()
    .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot be more than 30 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        'string.empty': 'Please enter a password'
    });
const signinPassword = Joi.string()
    .required()
    .messages({
        'string.empty': 'Please enter your password'
    });
const confirmPassword = Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .messages({
        'any.only': 'Passwords do not match',
        'string.empty': 'Please confirm your password'
    });

export const signupSchema = Joi.object().keys({
    email,
    username,
    password,
    confirmPassword
});
export const signinSchema = Joi.object().keys({
    email,
    signinPassword
});
export const forgotPasswordSchema = Joi.object().keys({
    email
});
export const resetPasswordSchema = Joi.object().keys({
    password,
    confirmPassword
});