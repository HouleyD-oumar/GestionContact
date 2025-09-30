export const API_CONFIG = {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || '',
    ENDPOINTS: {
        CONTACTS: '/contacts'
    },
    TIMEOUT: 5000 // 5 secondes
};

export const isApiAvailable = async (): Promise<boolean> => {
    if (!API_CONFIG.BASE_URL) return false;
    
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/health`, {
            method: 'GET',
            signal: AbortSignal.timeout(API_CONFIG.TIMEOUT)
        });
        return response.ok;
    } catch {
        return false;
    }
};