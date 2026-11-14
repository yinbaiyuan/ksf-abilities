import {readFileSync} from 'node:fs';
import {verifyPublication} from './publisher-policy.mjs';
const event=JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH,'utf8'));if(!event.pull_request?.user?.login)throw Error('Trusted pull_request event required');
console.log(JSON.stringify(verifyPublication({base:process.argv[2],candidate:process.argv[3],kind:'abilities',login:event.pull_request.user.login})));
