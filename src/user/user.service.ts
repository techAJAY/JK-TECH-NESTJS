import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }


   //SECTION - get all sub header
   async findAllUsers(
  ){
    //NOTE - find all users data
    const user: any[] = await this.userRepository.find();
    return user ;
  }

  async create(user: Partial<User>, id: any): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async updateRole(userId: number, role: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.role = role;
    return this.userRepository.save(user);
  }
}
