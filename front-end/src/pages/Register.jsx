import { useNavigate } from "react-router-dom"
import useApi from "../helpers/useApi"
import { useEffect, useState } from "react"

export default function Register() {
    const [roles, setRoles] = useState([])
    const navigate = useNavigate()
    const { post, get } = useApi()

    useEffect(() => {
        async function getRoles() {
            const response = await get("/auth/register")
            setRoles(response)
        }

        getRoles()
    }, [])


    async function performRegister(formData) {
        const payload = {
            email: formData.get('email'),
            username: formData.get('username'),
            password: formData.get('password'),
            roleId: formData.get('role')
        }

        const response = await post('/auth/register', payload)

        if (response !== null) {
            navigate('/login')
        }
    }

    function ListRoles() {
        return roles.map(role => {
            return (
                <div key={role.id}>
                    <input name="role" type="radio" value={role.id} />
                    <span>{role.name}</span>
                </div>
            )
        })
    }

    return (
        <div id="register-form">
            <form action={performRegister}>
                <div id="email-field">
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" placeholder="e.g. alexander@gmail.com" />
                </div>
                <div id="username-field">
                    <label htmlFor="username">Name: </label>
                    <input type="text" name="username" placeholder="e.g. alexander" />
                </div>
                <div id="password-field">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" placeholder="Password" />
                </div>

                <div id="available-roles">
                    <ListRoles />
                </div>

                <button>Register</button>
            </form>
        </div>
    )
}