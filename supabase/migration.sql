-- ══════════════════════════════════════════════════════════
-- Supabase Migration: watch / read / play tables + RLS
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ══════════════════════════════════════════════════════════

-- ── Watch Entries ─────────────────────────────────────────
create table if not exists public.watch_entries (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  jp_title    text,
  kind        text not null check (kind in ('anime', 'film', 'series')),
  year        int not null,
  status      text not null check (status in ('watching', 'finished', 'dropped', 'queued')),
  rating      numeric(3,1),
  episodes    int,
  cover       text,
  note        text,
  finished_on text,
  tags        text[] default '{}',
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Read Entries ──────────────────────────────────────────
create table if not exists public.read_entries (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  jp_title    text,
  kind        text not null check (kind in ('manga', 'manhwa', 'manhua', 'book', 'essay')),
  year        int,
  status      text not null check (status in ('reading', 'finished', 'dropped', 'queued')),
  rating      numeric(3,1),
  chapters    int,
  cover       text,
  note        text,
  finished_on text,
  tags        text[] default '{}',
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Play Entries ──────────────────────────────────────────
create table if not exists public.play_entries (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  kind        text not null check (kind in ('single', 'live')),
  year        int,
  status      text not null check (status in ('playing', 'finished', 'dropped', 'queued', 'endless')),
  rating      numeric(3,1),
  hours       int,
  cover       text,
  note        text,
  finished_on text,
  favorite    boolean default false,
  tags        text[] default '{}',
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- ── Auto-update `updated_at` trigger ──────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger watch_entries_updated_at
  before update on public.watch_entries
  for each row execute function public.set_updated_at();

create trigger read_entries_updated_at
  before update on public.read_entries
  for each row execute function public.set_updated_at();

create trigger play_entries_updated_at
  before update on public.play_entries
  for each row execute function public.set_updated_at();

-- ── Row Level Security ────────────────────────────────────
-- Enable RLS on all three tables
alter table public.watch_entries enable row level security;
alter table public.read_entries enable row level security;
alter table public.play_entries enable row level security;

-- Public can read everything
create policy "Anyone can read watch_entries"
  on public.watch_entries for select
  using (true);

create policy "Anyone can read read_entries"
  on public.read_entries for select
  using (true);

create policy "Anyone can read play_entries"
  on public.play_entries for select
  using (true);

-- Only authenticated users can insert / update / delete
create policy "Auth can insert watch_entries"
  on public.watch_entries for insert
  to authenticated
  with check (true);

create policy "Auth can update watch_entries"
  on public.watch_entries for update
  to authenticated
  using (true)
  with check (true);

create policy "Auth can delete watch_entries"
  on public.watch_entries for delete
  to authenticated
  using (true);

create policy "Auth can insert read_entries"
  on public.read_entries for insert
  to authenticated
  with check (true);

create policy "Auth can update read_entries"
  on public.read_entries for update
  to authenticated
  using (true)
  with check (true);

create policy "Auth can delete read_entries"
  on public.read_entries for delete
  to authenticated
  using (true);

create policy "Auth can insert play_entries"
  on public.play_entries for insert
  to authenticated
  with check (true);

create policy "Auth can update play_entries"
  on public.play_entries for update
  to authenticated
  using (true)
  with check (true);

create policy "Auth can delete play_entries"
  on public.play_entries for delete
  to authenticated
  using (true);

-- ── Tracker Items (PC Upgrade Tracker) ───────────────────
-- Private table — only accessible server-side via service role
create table if not exists public.tracker_items (
  id          uuid primary key default gen_random_uuid(),
  section     text not null check (section in ('bought', 'wish')),
  name        text not null,
  cat         text not null,
  price       numeric(12,0) default 0,
  note        text default '',
  date        text,           -- ISO date string, bought items only
  priority    text check (priority in ('high', 'medium', 'low')),  -- wish only
  status      text check (status in ('next', 'hold', 'tbd')),      -- wish only
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create trigger tracker_items_updated_at
  before update on public.tracker_items
  for each row execute function public.set_updated_at();

-- RLS: completely private — no public read, service role only
alter table public.tracker_items enable row level security;

-- No public read policy (unlike media tables)
-- All access goes through service-role API routes server-side

