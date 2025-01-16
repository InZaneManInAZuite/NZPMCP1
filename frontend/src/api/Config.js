
const getURL = () => {
    if (import.meta.env.VITE_BACKEND_URL) {
        return `${import.meta.env.VITE_BACKEND_URL}/api`
    } else {
        return `${import.meta.env.BASE_URL}/api`
    }
}

const config = {
    API: getURL()
}


export { config }