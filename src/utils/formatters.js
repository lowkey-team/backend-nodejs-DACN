export const slugify = (val) => {
    if (!val) return ''
    return String(val)
        .normalize('NFKD') // Normalize the string
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .trim() // Remove leading and trailing spaces
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9 -]/g, '') // Remove invalid characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};
