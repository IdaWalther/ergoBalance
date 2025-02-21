import { urls } from '../../url'

export const getExercises = async (urlKey: string) => {
    const url = urls[urlKey]

    try {
        const response = await fetch(`${url}?key=key74hTy7`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error(errorData.message || 'Det gick inte att hämta övningar');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error', error)
        throw error
    }
};