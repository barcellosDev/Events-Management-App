import { useNavigate } from "react-router-dom"
import useApi from "../helpers/useApi"

export default function Login() {
    const { post } = useApi()
    const navigate = useNavigate()

    async function performLogin(formData) {
        const payload = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const response = await post('/auth/login', payload)

        if (response !== null) {
            sessionStorage.setItem('access_token', response.accessToken)
            sessionStorage.setItem('refresh_token', response.refreshToken)

            if (response.roleName === 'Admin') {
                navigate('/dashboard')
            }

            if (response.role === 'Organizer') {
                navigate('/events')
            }

            if (response.role === 'Attendee') {
                navigate('/events')
            }
        }
    }

    return (
        <div id="login-form">
            <form action={performLogin}>
                <div id="email-field">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" placeholder="e.g. alexander@gmail.com" />
                </div>
                <div id="password-field">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" placeholder="Password" />
                </div>

                <button>Login</button>
            </form>
        </div>
    )
}