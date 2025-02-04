export const postFetch = async (url: string, data: any) => {
    const response = await fetch(`${url}?key=key74hTy7`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        throw new Error(errorData.message || 'Det gick inte att registrera användare');
    }

    const responseData = await response.json();
    return responseData;
};