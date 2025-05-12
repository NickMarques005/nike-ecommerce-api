import { parseISO, isValid, formatISO } from "date-fns";

/**
 * Converte uma ISO String para Date.
 * Retorna `null` se a string for inválida.
 */
export const isoStringToDate = (isoString: string): Date | null => {
    const date = parseISO(isoString);
    return isValid(date) ? date : null;
};

/**
 * Converte um objeto Date válido para ISO String.
 */
export const dateToIsoString = (date: Date): string => {
    return formatISO(date);
};