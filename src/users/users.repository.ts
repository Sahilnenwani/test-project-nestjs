import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/user.signup.dto';
import { createPasswordHash } from 'src/helper/bcrypt.helper';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    try {
      const user = new User();
      user.name = name;
      user.email = email;
      user.password = await createPasswordHash(
        password ? password : 'click123',
      );
      await this.save(user);
      return user;
    } catch (error) {
      return false;
    }
  }

  async getUserById(user_id) {
    try {
      const user = await this.findOne({
        where: { id: user_id },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('please try again later');
    }
  }

  async isEmailExist(email: string): Promise<boolean> {
    const isEmailExist = await this.findOne({
      where: {
        email: email,
      },
      withDeleted: true,
    });
    return isEmailExist ? true : false;
  }

  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException('please try again later');
    }
  }

  async updateUserById(user_id, updateUserDto: UpdateUserDto) {
    const { name, email } = updateUserDto;
    const updateUserObject = {};

    try {
      if (name) {
        updateUserObject['name'] = name;
      }
      if (email) {
        const userFound = await this.getUserById(user_id);
        if (userFound.email !== email) {
          const isEmailExist = this.isEmailExist(email);
          if (isEmailExist) {
            throw new BadRequestException(`Duplicate email address`);
          }
        }
        updateUserObject['email'] = email;
      }

      const queryBuilder = this.createQueryBuilder('users');
      queryBuilder
        .createQueryBuilder()
        .update(User)
        .set({ ...updateUserObject })
        .where('id = :id', { id: user_id })
        .execute();
      return true;
    } catch (error) {
      return false;
    }
  }

  async deleteUserById(user_id) {
    try {
      const deleteResponse = await this.softDelete(user_id);
      if (!deleteResponse.affected) {
        throw new InternalServerErrorException('please try again later');
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('please try again later');
    }
  }
}
