export default function useApi() {
    const access_token = sessionStorage.getItem('access_token')
    const globalUri = `https://localhost:7057/api`

    const get = async (uri) => {
        uri = `${globalUri}${uri}`

        try {
            const response = await fetch(uri, {
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (!response.ok)
                throw 'ERROR OCURRED ON REQUEST'

            return await response.json()
        } catch (error) {
            alert(error)
            return null
        }
    }

    const post = async (uri, payload) => {
        uri = `${globalUri}${uri}`

        try {
            const response = await fetch(uri, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${access_token}`
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok)
                throw 'ERROR OCURRED ON REQUEST'

            return await response.json()
        } catch (error) {
            alert(error)
            return null
        }
    }

    const put = async (uri, payload) => {
        uri = `${globalUri}${uri}`

        try {
            const response = await fetch(uri, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok)
                throw 'ERROR OCURRED ON REQUEST'

            return await response.json()
        } catch (error) {
            alert(error)
            return null
        }
    }

    const deleteReq = async (uri) => {
        uri = `${globalUri}${uri}`

        try {
            const response = await fetch(uri, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (!response.ok)
                throw 'ERROR OCURRED ON REQUEST'

            return await response.json()
        } catch (error) {
            alert(error)
            return null
        }
    }

    return {
        get,
        post,
        put,
        deleteReq
    }
}