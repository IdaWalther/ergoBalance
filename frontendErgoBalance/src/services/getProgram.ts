import { urls } from '../../url'

export const getProgram = async (urlKey: string, pk: string) => {
    const url = urls[urlKey]

    try {
        const response = await fetch(`${url}/program/${pk}/startprogram?key=key74hTy7`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error(errorData.message || 'Det gick inte att hämta program');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error', error)
        throw error
    }
};