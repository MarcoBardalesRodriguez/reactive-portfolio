import { useEffect, useState } from 'react'

const Skills = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const api = 'https://portfolio.apps.marcobardalesrodriguez.site/api/'
        const endpoint = api + 'collections/skills/records'

        const fetchData = async () => {
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('token')
                    }
                })
                const data = await response.json()
                console.log(data)
                setData(data.items)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        data !== null ? (
            <>
            <div className="skills">
                {data.map((item) => (
                    <div className='skill' key={item.id}>
                        <img src={item.icon_svg_url} alt="icon" />
                        <h2 className='skill-title'>{item.name}</h2>
                    </div>
                ))}
            </div>
            </>
        ) : (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    )
}

export default Skills