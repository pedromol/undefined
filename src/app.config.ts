import { mustBe, a, validate } from 'joi-decorator';
import Crash from './common/helpers/crash';

export class EnvironmentVariables {
  @mustBe(a.number().integer().min(1).max(65535).required())
  HTTP_PORT = 3000;

  @mustBe(a.string().required())
  RDS_HOST: string;

  @mustBe(a.number().integer().min(1).max(65535).required())
  RDS_PORT = 3306;

  @mustBe(a.string().required())
  RDS_USERNAME: string;

  @mustBe(a.string().required())
  RDS_PASSWORD: string;

  @mustBe(a.string().required())
  RDS_DATABASE = 'undefined';

  @mustBe(a.string().required())
  NODE_ENV: string;

  @mustBe(a.string().required())
  REDIS_HOST: string;

  @mustBe(a.number().integer().min(1).max(65535).required())
  REDIS_PORT = 6379;

  constructor() {
    Object.keys(process.env).forEach((key: string) => {
      this[key] = process.env[key];
    });
    validate(this, EnvironmentVariables, { allowUnknown: true }).catch((err: Error) => {
      Crash.logAndExit(this.constructor.name, err);
    });
  }
}

export default (): EnvironmentVariables => {
  return new EnvironmentVariables();
};
