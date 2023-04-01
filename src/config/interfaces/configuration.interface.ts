export interface IConfiguration {
  database: {
    type: string;
    host: string;
    name: string;
    port: string;
    username: string;
    password: string;
  };
  hash: {
    rounds: number;
  };
  throttle: {
    ttl: number;
    limit: number;
  };
  jwt: {
    secret: string;
    expiresIn: number;
  };
}
