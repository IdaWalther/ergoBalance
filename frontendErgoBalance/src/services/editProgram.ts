import { urls } from '../../url'

export const editProgram = async (urlKey: string, pk : string, information: any) => {
    const url = urls[urlKey]

    try {
        const response = await fetch(`${url}/program/${pk}/startprogram?key=key74hTy7`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(information),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server Error:', errorData);
            throw new Error(errorData.message || 'Det gick inte att uppdatera programmet');
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error', error)
        throw error
    }
};