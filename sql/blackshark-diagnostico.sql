-- =====================================================================
-- BlackShark IA — diagnóstico da tabela de chaves (rode uma vez)
-- Não altera nada nos seus dados: apenas cria uma função de leitura
-- que me permite ver o formato da tabela de licenças.
-- =====================================================================

create or replace function public.trial_debug()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'colunas', (
      select jsonb_agg(jsonb_build_object('nome', column_name, 'tipo', data_type, 'default', column_default) order by ordinal_position)
      from information_schema.columns
      where table_schema = 'public' and table_name = 'shark_license_keys'
    ),
    'ultimas_linhas', (
      select jsonb_agg(t) from (
        select * from public.shark_license_keys order by created_at desc limit 3
      ) t
    )
  );
$$;

revoke all on function public.trial_debug() from public;
grant execute on function public.trial_debug() to anon, authenticated;
