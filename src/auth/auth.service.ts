import { ConflictException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto'
import { UsersRepository } from './users.repository'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { jwtPayload } from './jwt-payload.interface'
import { User } from './user.entity'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp (authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.usersRepository.createUser(authCredentialsDto)
  }

  async signIn (
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    //Destruct from dto
    const { username, password } = authCredentialsDto
    //find if user exist
    const user = await this.usersRepository.findOne({ username })
    //If user exist return accessToken otherwise throw an error
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: jwtPayload = { username }
      const accessToken: string = await this.jwtService.sign(payload)
      return { accessToken }
    } else {
      throw new ConflictException(
        user ? 'password is Incorrect' : 'invalid user',
      )
    }
  }
}
