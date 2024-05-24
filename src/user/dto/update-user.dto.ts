import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';


// 在基本实体类型的基础上构建各种变体DTO 
export class UpdateUserDto extends PartialType(CreateUserDto) {

    password:string
    email:string
}
