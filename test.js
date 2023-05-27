// crea una funcion que consuma una graphql api desde esta url https://blog.marcobardalesrodriguez.site/graphql
// usando usta query como ejemplo
// query MyQuery {
//     pages(where: {title: "Sobre mí"}) {
//       nodes {
//         id
//         featuredImage{node{mediaItemUrl}}
//         title
//         content
//         hardSkillObj
//         rrssObj
//       }
//     }
//   }
// y crea un archivo json con la respuesta de la api
function graphql_query(title = "Sobre mí") {
    let query = `
    query MyQuery { 
        pages(where: {title: ${title}}) {
            nodes {
                id
                featuredImage{node{mediaItemUrl}}
                title
                content
                hardSkillObj
                rrssObj
            }
        }
    }
    `
    return query
}

function fetch_graphql_api(title) {
    let url = 'https://blog.marcobardalesrodriguez.site/graphql'
    let query = graphql_query(title)
    let options = {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(url, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            let data = JSON.stringify(res)
            fs.writeFileSync('data.json', data)
            return data
        })
        .catch(err => console.log(err))
}

object_from_api = fetch_graphql_api(title = "Sobre mí")
