## How to Execute
1. 서버 실행
- `npm start` or `npm backend`
2. 클라이언트 실행
- 'npm frontend'
- `cd client` -> `npm start`or `yarn start`
3. concurrently 실행
- `npm run dev`

## Bug Fixed
1. POST /checkId, /checkEmail 요청에 에러
 - 아이디/이메일 중복체크 라우터 수정
2. 로그인시 bcrypt.compare의 콜백함수가 작동하지 않음
 - User.js의 함수에서 콜백을 호출하지않음.................
 - 콜백 호출하도록 함수 수정하여 해결
## Bug notFixed
### undefined