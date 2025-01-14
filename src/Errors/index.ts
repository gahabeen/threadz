import chalk from 'chalk';

export type MyErrorConfig = {
    /**
     * The name of the error.
     */
    name: string;
    /**
     * The service title to display in the message.
     */
    title: string;
    /**
     * The message to display.
     */
    message: string;
};

export class MyError extends Error {
    raw: any;

    constructor(error: MyErrorConfig) {
        const { name, title, message } = error;
        const colored = `${chalk.blueBright(`[${title}]`)} ${message}`;
        super(colored);

        this.name = chalk.red(name);
        this.raw = error;
    }
}
