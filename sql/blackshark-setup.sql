-- =====================================================================
-- BlackShark IA — configurações do site + clientes cadastrados
-- Rode este SQL no editor SQL do SEU projeto Supabase (uma única vez).
-- IMPORTANTE: troque o e-mail na última linha pelo e-mail do administrador.
-- =====================================================================

-- 1) Configurações do site (linha única, id = 1) -----------------------
create table if not exists public.site_config (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

grant select on public.site_config to anon, authenticated;
grant insert, update on public.site_config to authenticated;
grant all on public.site_config to service_role;

alter table public.site_config enable row level security;

-- 2) Administradores ---------------------------------------------------
create table if not exists public.site_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

grant select on public.site_admins to authenticated;
grant all on public.site_admins to service_role;

alter table public.site_admins enable row level security;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.site_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_site_admin() to anon, authenticated;

drop policy if exists "admins veem a propria linha" on public.site_admins;
create policy "admins veem a propria linha"
  on public.site_admins for select to authenticated
  using (lower(email) = lower(coalesce(auth.jwt() ->> 'email', '')));

drop policy if exists "config publica para leitura" on public.site_config;
create policy "config publica para leitura"
  on public.site_config for select to anon, authenticated
  using (true);

drop policy if exists "somente admin cria config" on public.site_config;
create policy "somente admin cria config"
  on public.site_config for insert to authenticated
  with check (public.is_site_admin());

drop policy if exists "somente admin edita config" on public.site_config;
create policy "somente admin edita config"
  on public.site_config for update to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

-- 3) Clientes cadastrados ---------------------------------------------
create table if not exists public.site_customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  name text not null default '',
  email text not null unique,
  whatsapp text not null default '',
  source text not null default 'site',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant select, insert, update on public.site_customers to authenticated;
grant all on public.site_customers to service_role;

alter table public.site_customers enable row level security;

drop policy if exists "cliente cria o proprio cadastro" on public.site_customers;
create policy "cliente cria o proprio cadastro"
  on public.site_customers for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "cliente ve o proprio cadastro" on public.site_customers;
create policy "cliente ve o proprio cadastro"
  on public.site_customers for select to authenticated
  using (auth.uid() = user_id or public.is_site_admin());

drop policy if exists "cliente edita o proprio cadastro" on public.site_customers;
create policy "cliente edita o proprio cadastro"
  on public.site_customers for update to authenticated
  using (auth.uid() = user_id or public.is_site_admin())
  with check (auth.uid() = user_id or public.is_site_admin());

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_customers_touch on public.site_customers;
create trigger site_customers_touch before update on public.site_customers
  for each row execute function public.touch_updated_at();

drop trigger if exists site_config_touch on public.site_config;
create trigger site_config_touch before update on public.site_config
  for each row execute function public.touch_updated_at();

-- 4) Linha inicial e administrador ------------------------------------
insert into public.site_config (id, data) values (1, '{}'::jsonb)
  on conflict (id) do nothing;

-- TROQUE pelo e-mail que você usa para entrar em /admin:
insert into public.site_admins (email) values ('seu-email-admin@exemplo.com')
  on conflict (email) do nothing;
