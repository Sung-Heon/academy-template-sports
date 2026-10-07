# 플레이온 스포츠 클럽

수업 정원 · 예약 · 출석 · 회원권을 관리하는 스포츠 클럽

An original operational sample inspired by publicly described academy workflows, not affiliated with On-hi.

## Run locally

Requires Node 22.19+. Run npm ci, set APP_PASSWORD to a strong app password, then npm run dev. Open http://127.0.0.1:3100 and use admin / your APP_PASSWORD. Local SQLite receives fictional sample records.

## Deploy

Fork this repository and submit it to the academy catalog. It provisions Turso Tokyo and deploys Vercel Seoul. Schemas come from immutable prisma/migrations SQL. Remote apps start empty unless demo data was explicitly imported. Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN for manual hosting; provision schema before starting. Never put tokens in client code.

## Included workflows

- 멤버: 원생과 보호자의 연락처를 한곳에서 관리해요.
- 클래스 일정: 클래스별 정원과 예약 현황을 확인해요.
- 예약 · 출석: 정원을 초과하거나 같은 멤버가 중복 예약할 수 없어요.
- 회원권: 이용 기간과 프로그램을 기록해요. 예약 자격은 자동 제한하지 않아요.
- 공지: 학부모에게 전달할 내용을 정리해요. 실제 알림은 발송되지 않아요.

The public example is read-only. Downloaded apps support persisted registration and status actions. Notices are stored locally in the app, not delivered as SMS/push. Tuition is manual bookkeeping, not a payment gateway. Portfolio images are optional HTTPS references, not file uploads. This sample uses a single shared owner password; separate parent accounts and role permissions are not included.

## Checks

npm run lint
npm run typecheck
npm test
npm run build
