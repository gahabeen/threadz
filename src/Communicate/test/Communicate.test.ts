import { MessageChannel } from 'worker_threads';
import { Communicate } from '../Communicate.js';

describe('Communicate', () => {
    describe('newMessageChannel', () => {
        it('Should return a MessageChannel instance', () => {
            const channel = Communicate.newMessageChannel();

            expect(channel).toBeInstanceOf(MessageChannel);
        });
    });
});
