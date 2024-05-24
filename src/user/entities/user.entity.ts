import { Exclude, Expose, Transform } from "class-transformer";

export class User {

    id:number
    username:string

    @Exclude()
    password:string

    // 对返回的字段值做转换
    @Transform(({value}) => '邮箱是：' + value)
    email:string

    @Expose() // 导出字段xxx，这个字段是只读的
    get xxx(): string {
        return `${this.username} ${this.email}`; // 字段内容
    }


    constructor(partial: Partial<User>){
        // Partial<User> 表示User类的属性都是可选的
        // assign 将partial中的属性值复制到实例this
        Object.assign(this, partial);
    }
}
