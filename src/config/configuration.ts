import { IConfiguration } from './interfaces';

class Configuration {
  private static instance: Configuration;
  private readonly config: IConfiguration;

  private constructor() {
    this.config = {
      database: {
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        name: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      },
      hash: {
        rounds: parseInt(process.env.HASH_ROOUNDS),
      },
      throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL),
        limit: parseInt(process.env.THROTTLE_LIMIT),
      },
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: parseInt(process.env.JWT_EXPRIRE_IN),
      },
    };
  }

  public static getInstance(): Configuration {
    if (!Configuration.instance) {
      Configuration.instance = new Configuration();
    }
    return Configuration.instance;
  }

  public getConfig(): IConfiguration {
    return this.config;
  }
}

const configFunction = () => Configuration.getInstance().getConfig();

export default configFunction;
