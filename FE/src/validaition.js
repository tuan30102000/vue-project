const validateFunction = {
    isEmail(message = 'Khong phai email') {

        return function (mail) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return ({
                    message: ''
                })
            }
            return ({
                message: message
            })
        }
    },
    minlengthString(min = 1, message = 'Khong du ki tu') {
        return function (string = '') {
            return { message: string.length >= min ? '' : message }

        }

    },
    maxlengthString(max = 20, message = 'ki tu qua dai') {
        return function (string = '') {
            return { message: string.length <= max ? '' : message }

        }

    },
    isHasSpace(message = 'vui long bo khoang trang') {
        return function (string = '') {
            const count = string.trim().split(' ').length
            return {
                message: count === 1 ? '' : message
            }
        }
    }
    ,
    runError(string = '', arr = [], cb = () => '') {
        let message = ''
        for (let fc of arr) {
            message = fc(string).message
            if (message) break
        }
        // cb(message)

        return { message: message }
    }
}


export default validateFunction