-- =====================================================================
-- BlackShark IA — teste grátis real de 20 minutos (1 por dia por IP)
-- Rode este SQL no editor SQL do SEU projeto Supabase (uma única vez).
-- =====================================================================

create table if not exists public.trial_grants (
  id uuid primary key default gen_random_uuid(),
  ip text not null,
  day date not null default current_date,
  license_key text not null,
  created_at timestamptz not null default now(),
  unique (ip, day)
);

grant all on public.trial_grants to service_role;

alter table public.trial_grants enable row level security;
-- Sem policies: apenas a função abaixo (security definer) acessa a tabela.

create or replace function public.create_trial_key(p_ip text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_alpha  text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  v_key    text := 'BS-TESTE';
  v_expires timestamptz;
  i int;
begin
  if coalesce(p_ip, '') = '' then
    return jsonb_build_object('ok', false, 'error', 'Não foi possível identificar seu acesso.');
  end if;

  if exists (select 1 from public.trial_grants where ip = p_ip and day = current_date) then
    return jsonb_build_object(
      'ok', false,
      'error', 'Você já gerou o teste grátis de hoje. Tente novamente amanhã ou escolha um plano.'
    );
  end if;

  for i in 1..8 loop
    if i % 4 = 1 then
      v_key := v_key || '-';
    end if;
    v_key := v_key || substr(v_alpha, 1 + floor(random() * length(v_alpha))::int, 1);
  end loop;

  v_expires := now() + interval '20 minutes';

  insert into public.shark_license_keys (license_key, is_active, customer_name, notes, expires_at)
  values (v_key, true, 'Teste grátis 20 min', 'Teste automático pelo site — IP ' || p_ip, v_expires);

  insert into public.trial_grants (ip, license_key) values (p_ip, v_key);

  return jsonb_build_object('ok', true, 'key', v_key, 'expires_at', v_expires);
exception
  when unique_violation then
    return jsonb_build_object(
      'ok', false,
      'error', 'Você já gerou o teste grátis de hoje. Tente novamente amanhã.'
    );
end;
$$;

revoke all on function public.create_trial_key(text) from public;
grant execute on function public.create_trial_key(text) to anon, authenticated;
