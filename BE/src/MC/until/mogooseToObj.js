const mongooseToObject={
    multiToObject(list){
        return list.map(item=>item.toObject())
    },
    itemToObject(item){
        return item.toObject()
    }
}

export default mongooseToObject