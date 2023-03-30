import Redis from 'ioredis';

const redis = new Redis({
  port: 6379,
  host: 'host.docker.internal',
});

export default redis;
