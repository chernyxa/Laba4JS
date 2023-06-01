import { pipeline as _pipeline } from 'stream';

import { ls, up, cd } from './commands/navigation.js'
import { calcHash, compress, decompress} from './commands/hash and com decom.js';
import { rm, cat, add, rn, cp, mv } from './commands/Basic operations with files.js'
import { EOL, architecture, cpus, homedir, username_pc} from './commands/Operation system info.js'

const args = process.argv.slice(2);
const usernameIndex = args.findIndex(arg => arg.startsWith('--username='));
if (usernameIndex === -1) {
    console.error('Не указано имя пользователя. Используйте "--username=your_username".');
    process.exit(1);
}
const username = args[usernameIndex].split('=')[1];
process.stdout.write(`Добро пожаловать в диспетчер файлов ${username} \n`)
const currentDirectory = process.cwd();
console.log(`В настоящий момент вы находитесь в: ${currentDirectory}`);

process.stdin.setEncoding('utf8');
process.on('exit', _ => console.log(`Благодорим вас за использование, ${username}, Досвидания!`));
process.on('SIGINT', _ => { process.exit(0); });

while (true) {
        
    const input = await new Promise(resolve => {
      process.stdin.once('data', data => {
        resolve(data.trim());
      });
    });
        
    const arr = input.split(' ');
    switch(arr[0].toString("utf-8")) {
            case "ls":
                ls();
                break;
            case "cd":
                cd(arr[1].toString("utf-8"));
                break;
            case "up":
                up();
                break;
            case "calcHash":
                calcHash(arr[1].toString("utf-8"));
                break;
            case "compress":
                compress(arr[1], arr[2])
                break;
            case 'decompress':
                decompress(arr[1], arr[2])
                break;
            case 'cat':
                cat(arr[1]);
                break;
            case 'rm':
                rm(arr[1]);
                break;
            case 'add':
                add(arr[1]);
                break;
            case 'rn':
                rn(arr[1], arr[2]);
                break;
            case 'cp':
                cp(arr[1], arr[2])
                break;
            case 'mv':
                mv(arr[1], arr[2])
                break;
            case ".exit":
                process.exit(0);
            case "os":
                switch(arr[1]){
                    case '--EOL':
                        EOL();
                        break;
                    case '--cpus':
                        cpus();
                        break;
                    case '--homedir':
                        homedir();
                        break;
                    case '--username':
                        username_pc();
                        break;
                    case '--architecture':
                        architecture();
                        break;
                    default:
                        console.log("Ошибка, операция введена не верно")
                }
                break;
            default:
                console.log("Ошибка "+ input)
    }
    const currentDirectory = process.cwd();
    console.log(`В настоящий момент вы находитесь в: ${currentDirectory}`);
}
