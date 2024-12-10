

let config = {
    API: `http://localhost:${import.meta.env.PORT}`
}

if (import.meta.env.MODE === 'development') {
    config = {
    API: 'http://localhost:3001/api' 
    } 
}


export { config }