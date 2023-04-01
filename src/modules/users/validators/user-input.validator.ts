import { Validator } from './interfaces';
import { CreateUserDto } from '../dto';

export class UserInputValidator {
  private readonly validators: Validator[];

  constructor(validators: Validator[]) {
    this.validators = validators;
  }

  async validate(input: CreateUserDto) {
    for (const validator of this.validators) {
      await validator.validate(input);
    }
  }
}
