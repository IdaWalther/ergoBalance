import { ref } from 'vue'
const token = ref(localStorage.getItem('token') || '')
import { urls } from "../../url";

export const userAuthenticate = () => {
    const loginUser = async (urlKey: string, userInfo: { usernameOrEmail: string, password: string }) => {
        try {
            const url = urls[urlKey];
            const response = await fetch(`${url}?key=key74hTy7`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) {
                const errorData = await response.json()
                console.error('Server Error:', errorData)
                throw new Error(errorData.message || 'Det gick inte att logga in')
            }

            const responseData = await response.json()
            token.value = responseData.data.token
            localStorage.setItem('token', responseData.data.data.token)
            return responseData
        } catch (error) {
            console.error('Error', error)
            throw error
        }
    }
    return { loginUser }
}