/**
 * Normaliza um texto para facilitar buscas e geração de slugs:
 * - Remove acentos (diacríticos)
 * - Converte para minúsculas
 * - Remove espaços extras
 * - Remove pontuação e caracteres especiais
 */
export const normalizeText = (text: string): string => {
    return text
        .normalize("NFD") // separa acentos das letras
        .replace(/[\u0300-\u036f]/g, "") // remove acentos
        .toLowerCase() // converte para minúsculas
        .replace(/[^\w\s]/g, "") // remove pontuação e símbolos, mantendo letras, números e espaços
        .replace(/\s+/g, " ") // reduz múltiplos espaços a um
        .trim(); // remove espaços nas extremidades
};