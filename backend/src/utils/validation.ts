export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const validatePassword = (password: string): boolean => {
    return password.length >= 6
}

export const validateUsername = (username: string): boolean => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validateRegisterData = (data: any): ValidationResult => {
    const errors: string[] = []

    if (!data.email || !validateEmail(data.email)) {
        errors.push('Valid email is required')
    }

    if (!data.password || !validatePassword(data.password)) {
        errors.push('Password must be at least 6 characters long')
    }

    if (!data.username && !validateUsername(data.username)) {
        errors.push('Username must be between 3 and 20 characters, letters, numbers, and underscore only')
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}