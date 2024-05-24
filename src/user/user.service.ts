import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserVo } from './vo/user.vo';

const database:User[]= []
let id=0;

@Injectable()
export class UserService {

  create(createUserDto: CreateUserDto):[User, number] {

    const user= new User(createUserDto); // partial neo
    user.id= id++;
    const curLen= database.push(user); // 模拟自增 create
    return [user, curLen];
  }

  // findAll() :UserVo[]{

  //   return database.map(
  //     it=>{
  //       return new UserVo({
  //         id: it.id,
  //         username: it.username,
  //         email: it.email
  //       })
  //     }
  //   );
  // }
  findAll() :User[]{
    return database;
  }

  // findOne(id: number) :UserVo{
  //   // return database.filter(
  //   //   it=> it.id===id
  //   // ).at(0); // filter 得到的是数组
  //   return new UserVo({
  //     id:database[id].id,
  //     username: database[id].username,
  //     email: database[id].email
  //   });
  // }
  findOne(id: number) :User{
    return database[id];
  }

  update(id: number, updateUserDto: UpdateUserDto) :string{
    
    database[id].password= updateUserDto.password;
    database[id].email= updateUserDto.email;
    return 'update successful';
  }

  remove(id: number) :String{
    database[id]= null;
    return 'remove successful';
  }
}
