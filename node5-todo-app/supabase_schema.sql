-- ============================================================
-- 노드5 실습 3부 · Todo 앱 Supabase(클라우드 Postgres) 스키마
-- Supabase 대시보드 > SQL Editor에 통째로 붙여넣고 RUN.
-- ============================================================

-- ---- 표 3개 (로컬 SQLite와 동일 구조) ----
create table if not exists public.todos (
  id         bigint generated always as identity primary key,
  title      text        not null,
  is_done    boolean     not null default false,
  due_date   date,                                   -- 마감일(커스텀)
  created_at timestamptz not null default now()
);

create table if not exists public.tags (
  id   bigint generated always as identity primary key,
  name text not null unique                          -- 태그(커스텀) · 중복 방지
);

create table if not exists public.todo_tags (       -- 다대다(N:M) 연결표
  todo_id bigint not null references public.todos(id) on delete cascade,
  tag_id  bigint not null references public.tags(id)  on delete cascade,
  primary key (todo_id, tag_id)
);

-- ---- ★ RLS(행 수준 보안) 켜기 — 안 켜면 공개 키로 누구나 접근! (노드4 교훈) ----
alter table public.todos     enable row level security;
alter table public.tags      enable row level security;
alter table public.todo_tags enable row level security;

-- ---- 정책: 공개 데모용 (anon 전체 허용) ----
--   이 데모는 "링크 아는 사람 누구나 보고 고칠 수 있는" 공개 게시판 성격.
--   RLS를 켠 상태에서 '명시적으로' 열어 준 것 = 안 켜서 뚫린 것과 다름.
--   ▶ 실제 서비스라면: 익명/로그인 auth를 붙이고 todos에 user_id(default auth.uid())를 두어
--     using (auth.uid() = user_id) 로 '내 것만' 보게 좁힌다. (node4-world-atlas 방식)
drop policy if exists "demo_todos"     on public.todos;
drop policy if exists "demo_tags"      on public.tags;
drop policy if exists "demo_todo_tags" on public.todo_tags;
create policy "demo_todos"     on public.todos     for all to anon using (true) with check (true);
create policy "demo_tags"      on public.tags      for all to anon using (true) with check (true);
create policy "demo_todo_tags" on public.todo_tags for all to anon using (true) with check (true);
