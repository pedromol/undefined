import { mustBe, a, validate } from 'joi-decorator';
import Crash from './common/helpers/crash';

export class EnvironmentVariables {
  @mustBe(a.number().integer().min(1).max(65535).required())
  HTTP_PORT: number;

  @mustBe(a.string().required())
  RDS_HOST: string;

  @mustBe(a.number().integer().min(1).max(65535).required())
  RDS_PORT: number;

  @mustBe(a.string().required())
  RDS_USERNAME: string;

  @mustBe(a.string().required())
  RDS_PASSWORD: string;

  @mustBe(a.string().required())
  RDS_DATABASE: string;

  constructor() {
    Object.keys(process.env).forEach((key: string) => {
      this[key] = process.env[key];
    });
    validate(this, EnvironmentVariables, { allowUnknown: true }).catch((err: Error) => {
      Crash.logAndExit(this.constructor.name, err, 1);
    });
  }
}

export default (): EnvironmentVariables => {
  return new EnvironmentVariables();
};
