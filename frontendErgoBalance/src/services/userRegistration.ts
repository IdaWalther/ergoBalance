import { urls } from '../../url'

export const userRegistration = async (urlKey: string, data: any) => {
    const url = urls[urlKey]
    try {
        const response = await fetch(`${url}/register?key=key74hTy7`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.data?.message || 'Det gick inte att registrera användare');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error', error)
        throw error
    }

};
