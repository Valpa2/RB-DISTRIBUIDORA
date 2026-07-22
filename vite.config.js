-- Ejecutar en Supabase: panel del proyecto > SQL Editor > New query > pegar y Run
-- Si ya habias corrido el script anterior (con la tabla app_data), podes borrar esa
-- tabla desde el Table Editor antes de correr este, no se usa mas.

create table if not exists clientes (
  id text primary key,
  nombre text not null,
  telefono text default '',
  direccion text default '',
  empresa text default '',
  notas text default '',
  created_at timestamptz not null default now()
);

create table if not exists productos (
  id text primary key,
  codigo text default '',
  nombre text not null,
  categoria text default '',
  precio numeric not null default 0,
  stock numeric not null default 0,
  stock_minimo numeric not null default 0,
  unidad text default 'unidad',
  created_at timestamptz not null default now()
);

create table if not exists empleados (
  id text primary key,
  nombre text not null,
  telefono text default '',
  email text default '',
  pin text default '',
  created_at timestamptz not null default now()
);

create table if not exists pedidos (
  id text primary key,
  numero int not null,
  cliente_id text references clientes(id) on delete set null,
  empleado_id text references empleados(id) on delete set null,
  fecha date not null,
  estado text not null default 'pendiente',
  total numeric not null default 0,
  notas text default '',
  items jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists pagos (
  id text primary key,
  cliente_id text references clientes(id) on delete cascade,
  monto numeric not null default 0,
  fecha date not null,
  metodo text default 'Efectivo',
  notas text default '',
  created_at timestamptz not null default now()
);

create table if not exists negocio (
  id int primary key default 1,
  nombre text not null default 'Mi Distribuidora',
  direccion text default '',
  telefono text default '',
  alias text default '',
  instagram text default '',
  pin text default ''
);

insert into negocio (id, nombre, direccion, telefono, alias, instagram)
values (1, 'RB Distribuidora', 'Rossi 4134, Saladillo, Buenos Aires', '2344-54-1604', 'RB.DISTRIBUIDORA', '@distribuidora_rb_')
on conflict (id) do nothing;

-- Indices para que las busquedas y listados sean rapidos aunque haya miles de filas
create index if not exists idx_pedidos_cliente on pedidos(cliente_id);
create index if not exists idx_pedidos_empleado on pedidos(empleado_id);
create index if not exists idx_pedidos_numero on pedidos(numero);
create index if not exists idx_pagos_cliente on pagos(cliente_id);

-- Acceso publico (protegido solo por el PIN de la app, igual que antes)
alter table clientes enable row level security;
alter table productos enable row level security;
alter table empleados enable row level security;
alter table pedidos enable row level security;
alter table pagos enable row level security;
alter table negocio enable row level security;

create policy "publico" on clientes for all using (true) with check (true);
create policy "publico" on productos for all using (true) with check (true);
create policy "publico" on empleados for all using (true) with check (true);
create policy "publico" on pedidos for all using (true) with check (true);
create policy "publico" on pagos for all using (true) with check (true);
create policy "publico" on negocio for all using (true) with check (true);
