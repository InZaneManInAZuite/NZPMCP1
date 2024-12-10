

let config = {
    API: `https://nzpmcp1.onrender.com/api`
}

if (import.meta.env.MODE === 'development') {
    config = {
    API: 'http://localhost:3001/api' 
    } 
}


export { config }