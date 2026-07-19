# ModuWorks

아이펠 KDT AI 에이전트 과정에서 수행한 **노드 과제**와 **퀘스트** 모음입니다.
루트(`index.html`)가 갤러리이고, 각 프로젝트는 자기 폴더의 `index.html`로 바로 실행·열람됩니다.

🔗 **갤러리:** https://kjuyoung77.github.io/ModuWorks/

---

## 🧩 노드 과제 (Node Assignments)

### ⚔️ [소울 던전 (soul-dungeon)](node2-soul-dungeon/) — 노드 2 · 게임
소울나이트식 탑다운 던전 크롤러. 순수 Canvas(외부 의존성 0).
- 3×3로 연결된 하나의 던전, 전투 방 잠금, 방 타입 랜덤, 몬스터 4종, 미니맵, 홈 커스터마이징
- 조작: 이동 WASD/방향키 · 발사 마우스 · 상호작용 SPACE · 일시정지 ESC

### 🗺️ [세계 국가 도감 (world-atlas)](node3-world-atlas/) — 노드 3 · 프레임워크
26개국 도감 + 나라별 상세 페이지(위키백과 랜드마크 연동).
- **한/영 토글(i18n)** — UI·26개국 데이터·명소 해설(ko/en 위키 자동 전환)
- **Supabase 백엔드(RLS 보안)** — 방문자 수·나라별 조회수(인기순위)·댓글·가봤어요/가고싶어요·즐겨찾기
- 익명 로그인 → 본인 것만 수정(`auth.uid()`), 방문 로그는 집계 함수(`SECURITY DEFINER`)로만 노출
- 백엔드 설계는 [`node3-world-atlas/제출_런북.md`](node3-world-atlas/제출_런북.md) 참조

---

## 🗂️ 퀘스트 (Quests)

### 🛠️ [개발 환경 세팅 (onboarding-git-setup)](onboarding-git-setup/) — 온보딩
Claude Desktop·Git·GitHub·SSH 키 세팅부터 첫 커밋 push까지의 온보딩 아카이브.

### 🧩 [내 문제를 네 조각으로 (computational-thinking)](onboarding-computational-thinking/) — 온보딩
바이브코딩 중 막히는 문제를 **분해·패턴·추상화·알고리즘** 네 동작으로 쪼갠 컴퓨팅 사고 프로젝트.

### 📚 [Git 핵심 정리 (git-teaching)](quest-b-git-teaching/) — 퀘스트 B · 팀 티칭
타팀을 가르치기 위한 Git/GitHub 핵심 개념 + 예상문제 15선. *"AI는 생성하고, Git은 고정한다."*
- 원문 마크다운: [`quest-b-git-teaching/Git-핵심정리.md`](quest-b-git-teaching/Git-핵심정리.md)

### 🔍 [틀린 그림 찾기 (spot-the-difference)](quest-c1-spot-the-difference/) — 퀘스트 C-1 · 페어프로그래밍
Canvas로 좌·우 장면을 그려 **다른 곳 5개**를 찾는 게임. 단일 HTML(오프라인 실행).
- 5스테이지, 제한시간·보너스, 스테이지 오를수록 판정 축소, **ESC 일시정지**(정지 중 가림)

---
*Made with vibe coding · KDT AI 에이전트 과정*
