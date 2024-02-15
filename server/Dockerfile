# 기반 이미지 설정
FROM node:21-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# 의존성 설치
RUN npm install

# 포트 설정
EXPOSE 3001

# 애플리케이션 실행
CMD ["node", "server.js"]
