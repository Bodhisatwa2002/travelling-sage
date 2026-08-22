-- Add admin role to existing profiles table
alter table public.profiles add column if not exists role text default 'user' not null;

-- Helper: check if current user is admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ============================================================
-- Content tables
-- ============================================================

-- regions
create table public.regions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique
);

-- authors
create table public.authors (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  role text,
  bio text,
  image text,
  is_founder boolean default false
);

-- categories
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  image text not null
);

-- destinations
create table public.destinations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  image text not null,
  region_id uuid not null references public.regions(id)
);

-- posts
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  issue_number text,
  subtitle text,
  category_id uuid not null references public.categories(id),
  destination_id uuid references public.destinations(id),
  author_id uuid not null references public.authors(id),
  read_time text,
  image text,
  featured boolean default false,
  published_at timestamptz,
  seo_title text,
  meta_description text,
  og_image text,
  content jsonb
);

-- subscribers
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  subscribed_at timestamptz default now() not null,
  active boolean default true not null
);

-- comments
create table public.comments (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  message text not null,
  post_id uuid not null references public.posts(id),
  approved boolean default false not null,
  created_at timestamptz default now() not null
);

-- ============================================================
-- Indexes
-- ============================================================

create index idx_destinations_region on public.destinations(region_id);
create index idx_posts_category on public.posts(category_id);
create index idx_posts_destination on public.posts(destination_id);
create index idx_posts_author on public.posts(author_id);
create index idx_posts_issue_number on public.posts(issue_number desc nulls last);
create index idx_comments_post on public.comments(post_id);

-- ============================================================
-- RLS
-- ============================================================

-- regions
alter table public.regions enable row level security;
grant select on public.regions to anon, authenticated;
grant all on public.regions to service_role;

create policy "Public read regions"
  on public.regions for select using (true);

create policy "Admin write regions"
  on public.regions for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- authors
alter table public.authors enable row level security;
grant select on public.authors to anon, authenticated;
grant all on public.authors to service_role;

create policy "Public read authors"
  on public.authors for select using (true);

create policy "Admin write authors"
  on public.authors for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- categories
alter table public.categories enable row level security;
grant select on public.categories to anon, authenticated;
grant all on public.categories to service_role;

create policy "Public read categories"
  on public.categories for select using (true);

create policy "Admin write categories"
  on public.categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- destinations
alter table public.destinations enable row level security;
grant select on public.destinations to anon, authenticated;
grant all on public.destinations to service_role;

create policy "Public read destinations"
  on public.destinations for select using (true);

create policy "Admin write destinations"
  on public.destinations for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- posts
alter table public.posts enable row level security;
grant select on public.posts to anon, authenticated;
grant all on public.posts to service_role;

create policy "Public read posts"
  on public.posts for select using (true);

create policy "Admin write posts"
  on public.posts for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- subscribers
alter table public.subscribers enable row level security;
grant select, insert on public.subscribers to anon;
grant select on public.subscribers to authenticated;
grant all on public.subscribers to service_role;

create policy "Public read subscribers"
  on public.subscribers for select using (true);

create policy "Public insert subscribers"
  on public.subscribers for insert
  to anon
  with check (true);

create policy "Admin write subscribers"
  on public.subscribers for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- comments
alter table public.comments enable row level security;
grant select, insert on public.comments to anon;
grant select on public.comments to authenticated;
grant all on public.comments to service_role;

create policy "Public read approved comments"
  on public.comments for select using (approved = true);

create policy "Public insert comments"
  on public.comments for insert
  to anon
  with check (true);

create policy "Admin manage comments"
  on public.comments for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
