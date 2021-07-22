import { mustBe, a, validate } from 'joi-decorator';
import Crash from '../common/helpers/crash';

export class EnvironmentVariables {
  @mustBe(a.string().case('lower').required())
  NODE_ENV: string;

  @mustBe(a.number().integer().min(1).max(65535).default(3000).required())
  HTTP_PORT: number;

  @mustBe(a.boolean().required())
  MYSQL_ENABLED: boolean;

  @mustBe(
    a
      .string()
      .hostname()
      .when(a.ref('MYSQL_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  MYSQL_HOST: string | undefined;

  @mustBe(
    a
      .number()
      .integer()
      .min(1)
      .max(65535)
      .default(3306)
      .when(a.ref('MYSQL_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  MYSQL_PORT: number | undefined;

  @mustBe(
    a
      .string()
      .when(a.ref('MYSQL_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  MYSQL_USERNAME: string | undefined;

  @mustBe(
    a
      .string()
      .when(a.ref('MYSQL_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  MYSQL_PASSWORD: string | undefined;

  @mustBe(
    a
      .string()
      .when(a.ref('MYSQL_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  MYSQL_DATABASE: string | undefined;

  @mustBe(a.boolean().required())
  REDIS_ENABLED: boolean;

  @mustBe(
    a
      .string()
      .hostname()
      .when(a.ref('REDIS_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  REDIS_HOST: string | undefined;

  @mustBe(
    a
      .number()
      .integer()
      .min(1)
      .max(65535)
      .default(6379)
      .when(a.ref('REDIS_ENABLED'), { is: a.boolean().valid(true), then: a.required(), otherwise: a.forbidden() }),
  )
  REDIS_PORT: number | undefined;

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
