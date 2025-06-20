export default function useApi() {
    const access_token = sessionStorage.getItem('access_token')
    const globalUri = `https://localhost:7057/api`
    const fetchOptions = {
        credentials: 'include',
        headers: {}
    }

    if (access_token) {
        fetchOptions.headers['Authorization'] = `Bearer ${access_token}`
    }

    const get = async (uri) => {
        uri = `${globalUri}${uri}`

        try {
            const response = await fetch(uri, fetchOptions)

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
        fetchOptions.headers['Content-Type'] = "application/json"
        fetchOptions.method = "POST"
        fetchOptions.body = JSON.stringify(payload)

        try {
            const response = await fetch(uri, fetchOptions)

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

        fetchOptions.headers['Content-Type'] = "application/json"
        fetchOptions.method = "PUT"
        fetchOptions.body = JSON.stringify(payload)

        try {
            const response = await fetch(uri, fetchOptions)

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

        fetchOptions.headers['Content-Type'] = "application/json"
        fetchOptions.method = "DELETE"

        try {
            const response = await fetch(uri, fetchOptions)

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