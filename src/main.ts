import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import { APIResponse, CourseGrades, Teaching } from './type';
import * as fs from 'fs';

const TotalCourse = 28811;
const url = 'https://enroll.wisc.edu/api/search/v1';
const pageSize = 10000;
const paseNum = 1;
const outPath = './out/courses.jsonl';

const courseGrades = readGrades();

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
    let count = 0;
    for (const course of data.hits) {
      const { title, catalogNumber, subject } = course;
      const teachings = courseGrades.get(
        title + catalogNumber + subject.subjectCode
      );
      course.teachings = [];
      if (teachings != null) {
        for (const t of teachings) {
          if (t.subjects[0].code === course.subject.subjectCode) {
            course.teachings.push(t);
          }
        }
      } // it is possible grades could not be found for this account
      if (course.teachings.length > 0) {
        count += 1;
      }
    }
    fs.writeSync(fd, JSON.stringify(data.hits) + '\n');
    console.log(
      'Page' + page + ' done, ' + data.hits.length + ' courses scraped\n',
      count + ' courses with grades added'
    );
  } catch (e) {
    console.log('!!! Please make sure your cookie does not expire');
    console.log(e);
  }
};

function readGrades() {
  const map: Map<String, Array<Teaching>> = new Map();
  const content = fs.readFileSync('./src/resource/courses.jsonl', 'utf-8');
  content.split(/\r?\n/).forEach((line) => {
    if (line === '') {
      return;
    }
    try {
      const c: CourseGrades = JSON.parse(line);
      for (const t of c.teachings) {
        for (const s of t.subjects) {
          map.set(c.name + c.courseNumber + s.code, c.teachings);
        }
      }
    } catch (e) {
      console.log('failed to parse line: ' + line);
    }
  });

  return map;
}

const setEnv = () => {
  dotenv.config();
};

const getCookie = () => {
  return process.env.COOKIE;
};

main();
