import {ref} from 'vue'
import {urls} from '../../url'
const token = ref(localStorage.getItem('token') || '')

export const userAuthenticate = () => {
    const loginUser = async (urlKey: string, userInfo: {usernameOrEmail: string, password:string}) => {
        const url = urls[urlKey]
        try {
            const response = await fetch(`${url}/login?key=key74hTy7`, {
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
            token.value = responseData.data.data.token
            localStorage.setItem('token', responseData.data.data.token)
            return responseData
        } catch (error) {
            console.error('Error', error)
            throw error
        }
    }

    const logoutUser = () => {
        token.value = '';
        localStorage.removeItem('token')
    }

    const isAuthenticated = () => !!token.value;

    return {loginUser, logoutUser, isAuthenticated}
}