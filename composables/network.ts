export function checkConnectivity() {
    if(process.client && !navigator.onLine) {
        return navigateTo("/offline-error")
    }
}