# EAZA aggregator

## Quick start

1. Install dependencies 
    - Run ``yarn`` in the project root
2. Get cookie for [enroll.wisc.edu/api/search/v1](enroll.wisc.edu/api/search/v1)
    - Loginto [https://enroll.wisc.edu](https://enroll.wisc.edu) with your NetID
    - Search for a course and trace your network request with browser's dev tool to locate the cookie in the request header
3. Configure environment
    - Create a new .env file in the project root with content `COOKIE="your_cookie"`
4. Profit!
    - Create a new directory named `out` in the project root to store jsonl course dump
    - Run `yarn start` to start scraping
