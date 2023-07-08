import { useEffect, useState } from 'react'

const AboutMe = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const api = 'https://portfolio.apps.marcobardalesrodriguez.site/api/'

        const fetchData = async () => {
            try {
                const endpointAuth = api + 'collections/users/auth-with-password'
                let response = await fetch(endpointAuth, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        // get data from environment variables
                        identity: process.env.API_IDENTITY,
                        password: process.env.API_PASSWORD
                    })
                })
                let data = await response.json()
                const token = data.token
                // guardar el token en sesion storage
                sessionStorage.setItem('token', token)

                // Get data from collection users
                const endpointUsers = api + 'collections/users/records'

                response = await fetch(endpointUsers, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                })

                const userData = await response.json()

                // Get data from collection about_users
                const endpointAboutUser = api + 'collections/about_users/records'

                response = await fetch(endpointAboutUser, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    }
                })

                const aboutUserData = await response.json()


                data = {
                    user: userData.items[0],
                    aboutUser: aboutUserData.items[0]
                }
                // console.log(data)

                setData(data)

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        data !== null ? (
            <>
                <div className="photo">
                    <img className="logo" src={'https://portfolio.apps.marcobardalesrodriguez.site/api/files/users/'+data.user.id+'/'+data.user.avatar} alt="logo.png" />
                </div>
                <h1>{data.user.name}</h1>
                <h2>{data.aboutUser.job}</h2>
                <div className="rrss">
                    <a href={data.aboutUser.github_url} className="rrss-item" target="_blank">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="http://youtube.com/@MarcoBardalesRodriguez" className="rrss-item" target="_blank">
                        <i className="fab fa-youtube"></i>
                    </a>
                    <a href={data.aboutUser.linkedin_url} className="rrss-item" target="_blank">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <div className="personal-info">
                    <div className="personal-info-item">
                        <span className="personal-info-item-title">Telefono</span>
                        <span className="personal-info-item-content">{data.aboutUser.phone_number}</span>
                    </div>
                    <div className="personal-info-item">
                        <span className="personal-info-item-title">Email</span>
                        <span className="personal-info-item-content">{data.user.email}</span>
                    </div>
                    <div className="personal-info-item">
                        <span className="personal-info-item-title">Ciudad</span>
                        <span className="personal-info-item-content">{data.aboutUser.address}</span>
                    </div>
                </div>
                <a href={'https://portfolio.apps.marcobardalesrodriguez.site/api/files/about_users/'+data.aboutUser.id+'/'+data.aboutUser.cv} className="button-cv" role="button"><span>Ver CV</span></a>
            </>
        ) : (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    )
}

export default AboutMe