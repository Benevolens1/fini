import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
    makeRandomId(length = 40): string {
        const characters = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN';
        const charLength = characters.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charLength));
        }
        return result;
    }
}
