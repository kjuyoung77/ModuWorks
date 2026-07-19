# ModuWorks

아이펠 KDT AI 에이전트 과정에서 만든 웹 프로젝트·노드 과제 모음입니다.
루트(`index.html`)가 갤러리이고, 각 프로젝트는 자기 폴더의 `index.html`로 바로 실행됩니다.

🔗 **갤러리:** https://kjuyoung77.github.io/ModuWorks/

## 작품

### 🗺️ [세계 국가 도감 (world-atlas)](node3-world-atlas/) — 노드 3 · 프레임워크
26개국 도감. 목록·검색·지역 필터·즐겨찾기 + 나라별 상세 페이지(위키백과 랜드마크 연동).

- **한/영 토글(i18n)** — UI·26개국 데이터·명소 해설(ko/en 위키 자동 전환)
- **Supabase 백엔드(RLS 보안)** — 방문자 수·나라별 조회수(인기 순위)·댓글·가봤어요/가고싶어요·즐겨찾기
- 익명 로그인 → 본인 것만 수정(`auth.uid()`), 방문 로그는 집계 함수(`SECURITY DEFINER`)로만 노출
- 공개 키(publishable)만 프론트에, 데이터는 RLS가 보호 · 백엔드 설계는 [`world-atlas/제출_런북.md`](world-atlas/제출_런북.md) 참조

### ⚔️ [소울 던전 (soul-dungeon)](node2-soul-dungeon/) — 노드 2 · 게임
소울나이트식 탑다운 던전 크롤러. 순수 Canvas(외부 의존성 0).

- **3×3로 연결된 하나의 던전** — 4방향 통로로 인접 방 이동
- 전투 방은 입장 시 문이 잠기고, 몬스터를 다 처치하면 열림
- 방 타입 랜덤(전투·소굴·포션·무기·골드), 몬스터 4종, 미니맵, 홈 커스터마이징
- 조작: 이동 WASD/방향키 · 발사 마우스 · 상호작용 SPACE · 일시정지 ESC

### 🔍 [틀린 그림 찾기 (spot-the-difference)](quest-c1-spot-the-difference/) — 퀘스트 C · 게임
Canvas로 좌·우 장면을 직접 그려 **다른 곳 5개**를 찾는 게임. 단일 HTML(오프라인 실행).

- 5스테이지: 밤 캠핑장 → 낮 호수 → 협곡 노을 → 은하수 밤 → 새벽 안개
- 제한시간(숫자+바), 클리어 시 +8초 보너스, 오답 −2초
- 스테이지가 오를수록 클릭 판정 축소·배경 복잡도 증가
- **ESC 일시정지** (정지 중 그림은 가려짐 — 엿보기 방지)

### 🧩 [내 문제를 네 조각으로 (computational-thinking)](onboarding-computational-thinking/) — 온보딩 · 문서
바이브코딩 중 막히는 문제를 **분해·패턴·추상화·알고리즘** 네 동작으로 쪼갠 아이펠 온보딩 프로젝트.

---
*Made with vibe coding · KDT AI 에이전트 과정*
