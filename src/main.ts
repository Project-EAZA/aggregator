import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { APIResponse } from './type';
import * as fs from 'fs';

const TotalCourse = 28811;
const url = 'https://enroll.wisc.edu/api/search/v1';
const pageSize = 10000;
const paseNum = 1;
const outPath = './out/courses.jsonl';

function main() {
  setEnv();
  fs.open(outPath, 'w+', null, (err, fd) => {
    for (let i = 0; i < paseNum; ++i) {
      fetchCourses(fd, i + 1);
    }
  });
}

const fetchCourses = async (fd: number, page: number) => {
  const cookie = getCookie();
  if (cookie == null) {
    throw 'cookie is not set in the env file';
  }
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        selectedTerm: '0000',
        queryString: '*',
        filters: [],
        page: page,
        pageSize: pageSize,
        sortOrder: 'SCORE',
      }),
      headers: {
        Cookie: cookie,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw 'Failed to fetch course data';
    }

    const data = (await res.json()) as APIResponse;
    for (const course of data.hits) {
      fs.writeSync(fd, JSON.stringify(course) + '\n');
    }
    console.log('Page' + page + 'done, ' + data.hits.length + ' courses saved');
  } catch (e) {
    console.log(e);
  }
};

const setEnv = () => {
  dotenv.config();
};

const getCookie = () => {
  return process.env.COOKIE;
};

main();
