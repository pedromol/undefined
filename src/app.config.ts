import { mustBe, a, validate } from 'joi-decorator';

export class EnvironmentVariables {
  @mustBe(a.number().integer().min(1).max(65535).required())
  HTTP_PORT: number;

  constructor() {
    Object.keys(process.env).forEach((key) => {
      this[key] = process.env[key];
    });
    validate(this, EnvironmentVariables, { allowUnknown: true }).catch((err) => {
      console.error(JSON.stringify(err.details ? err.details : err));
      process.exit(1);
    });
  }
}

export default (): EnvironmentVariables => {
  return new EnvironmentVariables();
};
