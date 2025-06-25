import { useEffect, useState } from "react"
import useApi from "../helpers/useApi"

export default function CreateEvent() {
    const { get, post } = useApi()
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            const response = await get('/events/categories')

            if (response !== null) {
                setCategories(response)
            }
        }

        getCategories()
    }, [])

    function Category({ id, name }) {
        return (
            <option value={id}>{name}</option>
        )
    }

    async function performCreateEvent(formData) {
        const payload = {
            title: formData.get('title'),
            description: formData.get('description'),
            location: formData.get('location'),
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime'),
            categoryId: formData.get('categoryId')
        }

        await post("/events", payload)
    }

    return (
        <div id="create-event-container">
            <h1>Criar evento</h1>

            <form action={performCreateEvent}>
                <div id="title">
                    <label htmlFor="">Titulo: </label>
                    <input type="text" placeholder="Titulo" name="title" id="" />
                </div>
                <div id="description">
                    <label htmlFor="">Descrição: </label>
                    <input type="text" placeholder="Descrição" name="description" id="" />
                </div>
                <div id="location">
                    <label htmlFor="">Localização: </label>
                    <input type="text" placeholder="Localização" name="location" id="" />
                </div>
                <div id="startDate">
                    <label htmlFor="">Data inicio: </label>
                    <input type="date" placeholder="Data inicio" name="startTime" id="" />

                </div>
                <div id="endDate">
                    <label htmlFor="">Data fim: </label>
                    <input type="date" placeholder="Data fim" name="endTime" id="" />
                </div>

                <div id="category">
                    <label htmlFor="">Categorias</label>
                    <select name="categoryId" id="">
                        {
                            categories.map(category => (
                                <Category key={category.id} id={category.id} name={category.name} />
                            ))
                        }
                    </select>
                </div>

                <button>Criar evento</button>
            </form>
        </div>
    )
}