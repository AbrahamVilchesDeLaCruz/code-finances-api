import * as Joi from 'joi';

export default () => {
  const envVarsSchema = Joi.object({
    PORT: Joi.number().required(),
    NAME: Joi.string().required(),

    DB_DRIVER: Joi.string().valid('postgres').required(),
    DB_HOST: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_PORT: Joi.number().port().min(0).required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),

    AMQP_URI: Joi.string().required(),
    AMQP_EXCHANGE_NAME: Joi.string().required(),
    AMQP_EXCHANGE_TYPE: Joi.string().default('topic'),
    AMQP_RETRY_DELAY: Joi.number().default(1000),
    AMQP_MAX_RETRIES: Joi.number().default(3),
  });

  interface EnvVars {
    PORT: number;
    NAME: string;
    DB_DRIVER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    AMQP_URI: string;
    AMQP_EXCHANGE_NAME: string;
    AMQP_EXCHANGE_TYPE: string;
    AMQP_RETRY_DELAY: number;
    AMQP_MAX_RETRIES: number;
  }

  const { error, value: envVars } = envVarsSchema.validate(process.env, {
    allowUnknown: true,
  }) as { error: Joi.ValidationError; value: EnvVars };

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  return {
    app: {
      port: envVars.PORT,
      name: envVars.NAME,
    },
    db: {
      driver: envVars.DB_DRIVER,
      host: envVars.DB_HOST,
      name: envVars.DB_NAME,
      port: envVars.DB_PORT,
      user: envVars.DB_USER,
      password: envVars.DB_PASSWORD,
    },
    amqp: {
      uri: envVars.AMQP_URI,
      exchange_name: envVars.AMQP_EXCHANGE_NAME,
      exchange_type: envVars.AMQP_EXCHANGE_TYPE,
      retry_delay: envVars.AMQP_RETRY_DELAY,
      max_retries: envVars.AMQP_MAX_RETRIES,
    },
  };
};
