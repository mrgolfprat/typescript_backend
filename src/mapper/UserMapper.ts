import { EntityRepository, Repository } from 'typeorm'
import User from '../entity/User'

@EntityRepository(User)
export default class UserMapper extends Repository<User> {

    insertUser(firstname: string, lastname: string, age: number, username: string, password: string) {
        return this.createQueryBuilder()
            .insert()
            .into(User)
            .values([{
                firstName: firstname,
                lastName: lastname,
                age,
                username,
                password
            }]).execute()
    }

    findUserByUsername(username: string) {
        return this.createQueryBuilder()
            .where("username = :username", { username })
            .getOne()
    }

    findById(id: number) {
        return this.createQueryBuilder()
            .where("id = :id", { id })
            .getOne()
    }

}