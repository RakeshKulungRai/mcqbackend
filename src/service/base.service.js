module.exports = class BaseService{

     post(){

    }

    async  get(){
        return await this.db.findMany({})
    }
    async getDetailById(id){
        return await this.db.findUnique({
            where:{
                id
            }
        })

    }
    async delete(id){
        return await this.db.delete({
            where:{
                id
            }
        })
    }
    async update(id){
        return await this.db.update({
            where:{
                id
            }
        })
    }
}