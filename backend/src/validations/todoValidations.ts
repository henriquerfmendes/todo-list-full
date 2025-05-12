import { log } from "console";
import { AppError } from "../errors/AppError";

export function validateText(text: string): void {
    if (!text || text.trim() === '') {
        throw new AppError('Description is required');
    }

    if (text.length > 100) {
        throw new AppError('Description cannot exceed 100 characters');
    }
}

export function validateUpdateFields(text?: string, completed?: boolean): void {
    if (text === undefined && completed === undefined) {
        throw new AppError('At least one field to update is required');
    }

    if (text !== undefined) validateText(text);
}