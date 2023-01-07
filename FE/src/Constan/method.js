import StorageKey from "./StorageKey"

const method = {
    renderList(count = 1, callback) {
        let arr = []
        for (let i = 0; i < count; i++) {
            arr.push(callback(i))
        }
        return arr
    },
    getAccessToken() {
        return localStorage.getItem(StorageKey.accessToken)
    },
    getRefreshToken() {
        return localStorage.getItem(StorageKey.refreshToken)
    }, setAccessToken(token) {
        localStorage.setItem(StorageKey.accessToken, token)
    },
    setRefreshToken(token) {
        localStorage.setItem(StorageKey.refreshToken, token)
    }, setToken(access, refresh) {
        this.setAccessToken(access)
        this.setRefreshToken(refresh)
    },
    createSet(arr = [], key) {
        const set = new Set()
        if (!key) {
            return new Set(arr)
        }
        arr.forEach(item => set.add(item[key]))
        return set
    }
}

export default method