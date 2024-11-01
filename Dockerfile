FROM node:20.17

WORKDIR /code

ENV KAFKA_TOPIC_NAME_CONSUMER=my-topic KAFKA_PORT_1=9092 KAFKA_PORT_2=9092 KAFKA_PORT_3=9092  KAFKA_HOST_NAME_PRODUCTION=kafka KAFKA_HOST_NAME_DEVELOPMENT=localhost: APP_ENV='production' KAFKA_DEAD_LETTER_QUEUE=dlq-topic

COPY package.json ./package.json

RUN npm install && npm install typescript -g

COPY . .

RUN tsc

CMD ["node", "build/src/index-consumer.js"]