import { mustBe, a, validate } from 'joi-decorator';
import Crash from '../common/helpers/crash';

export class EnvironmentVariables {
  @mustBe(a.string().case('lower').required())
  NODE_ENV: string;

  @mustBe(a.number().integer().min(1).max(65535).default(3000).required())
  HTTP_PORT: number;

  @mustBe(a.boolean().required())
  MYSQL_ENABLED: boolean;

  @mustBe(a.string().hostname().required())
  MYSQL_HOST: string;

  @mustBe(a.number().integer().min(1).max(65535).default(3306).required())
  MYSQL_PORT: number;

  @mustBe(a.string().required())
  MYSQL_USERNAME: string;

  @mustBe(a.string().required())
  MYSQL_PASSWORD: string;

  @mustBe(a.string().required())
  MYSQL_DATABASE: string;

  @mustBe(a.boolean().required())
  REDIS_ENABLED: boolean;

  @mustBe(a.string().hostname().required())
  REDIS_HOST: string;

  @mustBe(a.number().integer().min(1).max(65535).default(6379).required())
  REDIS_PORT: number;

  @mustBe(a.boolean().required())
  OPENAPI_ENABLED: boolean;

  @mustBe(a.boolean().required())
  CLUSTER_ENABLED: boolean;

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
