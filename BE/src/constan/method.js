const method = {
    getClouldDinary(string) {
        const arrSplit1 = string.split('/')
        const result = arrSplit1[arrSplit1.length - 3] + '/' + arrSplit1[arrSplit1.length - 2] + '/' + arrSplit1[arrSplit1.length - 1].split('.')[0]
        return result
    }
}

export default method