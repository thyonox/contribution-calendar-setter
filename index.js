import jsonfile from 'jsonfile';
import moment from 'moment';
import random from 'random';
import simpleGit from 'simple-git';

const path = "./data.json";

const git = simpleGit();

const makeCommits = (n) => {
    // 统一推送到远程仓库
    if(n === 0) return git.push();

    // x 表示 1 年的随机周数
    const x = random.int(0, 52);
    // y 表示随机星期数
    const y = random.int(0, 6);

    // 生成 ISO 8601 格式的日期
    const date = moment()
        // 将当前日期减去 n 年
        .subtract(1, 'y')
        // 将日期加上 1 天
        .add(1, 'd')
        // 将日期加上 x 周
        .add(x, 'w')
        // 将日期加上 y 天
        .add(y, 'd')
        .format();

    console.log(date);

    const data = {
        date: date
    };

    // 将日期信息写入 data，并提交
    jsonfile.writeFile(path, data, () => {
        git.add([path]).commit(date, { '--date': date }, makeCommits.bind(this, --n));
    })
}

makeCommits(1000);











