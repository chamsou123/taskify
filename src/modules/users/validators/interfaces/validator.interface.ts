import { CreateUserDto } from '../../dto';

export interface Validator {
  validate(input: CreateUserDto);
}
