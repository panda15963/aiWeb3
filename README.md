# aiWeb3

## Git clone

``` bash
git clone <address> 
```

## Install dependencies

``` bash
npm install

## Run Doctor Script
    
``` bash
    npm run doctor
```

## Troubleshooting

## Solution

### 1. If you see the error: "Attention: Next.js now collects completely anonymous telemetry regarding usage. This information is used to shape Next.js' roadmap and prioritize features. You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting [https://nextjs.org/telemetry](https://nextjs.org/telemetry)." Type the following command to disable it:"

``` bash
npx next telemetry disable
```

### 2. Error: connect ECONNREFUSED 0.0.0.0:3306 at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1602:16)

``` bash
netstat -lntup | grep 3306
```
