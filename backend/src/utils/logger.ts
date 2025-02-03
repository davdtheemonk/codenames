import pine from "pine";

const logger = pine();

class APILogger {
  info(message: string) {
    logger.info(message);
  }

  error(message: string, data?: object) {
    if (data) {
      logger.error(
        `${message}   ${undefined != data ? JSON.stringify(data) : ""}`
      );
    } else {
      logger.error(message);
    }
  }
}

export const log = new APILogger();
