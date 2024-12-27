

let config = {
    API: `https://nzpmcp1.onrender.com/api`
}

if (import.meta.env.MODE === 'development') {
    config = {
    API: 'http://localhost:8080/api' 
    } 
}


export { config }