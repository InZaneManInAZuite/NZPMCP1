
const getURL = () => {
    if (import.meta.env.VITE_BACKEND_URL) {
        return `${import.meta.env.VITE_BACKEND_URL}/api`
    } else if (import.meta.env.PROD) {
        return `https://nzpmcp1-1.onrender.com/api`
    } else {
        return `http://localhost:8080/api`
    }
}

const config = {
    API: getURL()
}


export { config }