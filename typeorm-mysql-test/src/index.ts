import { AppDataSource } from "./data-source"
import { User } from "./entity/User"

AppDataSource.initialize().then(async () => {

    console.log("Inserting a new user into the database...")
    const user = new User()
    user.firstName = "aya"
    user.lastName = "drevis"
    // user.age = 25

    await AppDataSource.manager.save(user)

    console.log("Saved a new user with id: " + user.id)

    // // console.log("Loading users from the database...")
    // let users = await AppDataSource.manager.find(User)

    // // console.log("Loaded users: ", users)

    // // await AppDataSource.manager.delete(User, 2); // id=2

    // // await AppDataSource.manager.save(User, [
    // //     { firstName: 'ccc', lastName: 'ccc', age: 21},
    // //     { firstName: 'ddd', lastName: 'ddd', age: 22},
    // //     { firstName: 'eee', lastName: 'eee', age: 23}
    // // ]);
    // users = await AppDataSource.manager.findBy(User, {
    //     age: 23
    // });
    // console.log(users);

    // await AppDataSource.manager.transaction(async manager => {
    //     let [, count] = await AppDataSource.manager.findAndCount(User);
    //     console.log(' ', count);
    // });

    // users= await AppDataSource.getRepository(User).find();
    // console.log('final: ', users);

}).catch(error => console.log(error))
