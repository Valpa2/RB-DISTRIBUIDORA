import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Home, Users, Package, Truck, UserCog, Plus, Search, X, Pencil, Trash2,
  AlertTriangle, ChevronRight, ChevronUp, ChevronDown, DollarSign, Phone, MapPin, Minus,
  TrendingUp, Clock, CheckCircle2, Settings, Download, Upload,
  LogOut, Printer, Star, Lock, BarChart3, History, ClipboardList, ListChecks, Calendar,
} from 'lucide-react';

/* ---------------------------------- base de datos (Supabase) ---------------------------------- */

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
const DB_ROW_ID = 1;

/* ---------------------------------- logo ---------------------------------- */

const LOGO_B64 =
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIj' +
  'JSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk' +
  'JCQkJCQkJCT/wAARCABIAEgDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAcCBgEEBQMI/8QAOhAAAQMDAgMECQIEBwEA' +
  'AAAAAQIDBAAFEQYSByExE0FRYRQiMlJxcoGRsRUzI0JikhYXQ4KhorPR/8QAGgEAAwEBAQEAAAAAAAAAAAAAAwQFAgYAAf/EAC0R' +
  'AAEEAQMCBAQHAAAAAAAAAAEAAgMEEQUhMRJREyJBsTJhcYEGQpGh0eHx/9oADAMBAAIRAxEAPwBQurV2q/WV7R7/ADqO9fvK+9Zd' +
  '/dX8x/NRrqgoB5Ut6vfV96C4QQCsgnoN3WrnZ9C9koqu7Lz0pCA6u2supZ9HQei5TyvVYSfd9s/011Yt6hwnhCtM5xLx5CLpS27l' +
  'fWS7/EX8RkUF0w/Ks9GVQPRJ2zf6NM2e92S8ffFa4cVuICySOo3cxTcTB1UsB39F4pgdd/p+T8duwVzZ05T7/odyuCHnu6Dq63iO' +
  '4fJMkHkfMqTWG2QeF8dERyClvvX7yvvRvV7yvvVtuOjmpchce1x5MC6pG82eYsLU8PGO70dHgk8z3FVVEggkEEEciCMEUdjw7hAc' +
  'CFkLX7yvvRWKKIhZUXf3V/MfzTF4YaRL6U3yQ83FV65jPugFMZCAd74SfacylSW04PrBasYRS5ez2jmOu5WPvTRZ1DFvWutI2HTI' +
  'eftUNbDIBQUKeWpvY4og9AlJV18Vn+albBd04aqbAM7rQuErT1xlstXXULhsbLpcFstEZ1alnvWt53ZvdUerigT1wAMCrnaeNGkN' +
  'OMCDZNMz4MMciWVNpWvzUckqPxVVH4aaZtd81kbLem3XGkNP4S26WyXG+4kc8YCqcx4UaI7BTP6A2ARjtBId7QeYUVdfpXOa3e0+' +
  'uW17nUcjO2cfsRlMabFdnBlr9Ixtv/eVRdR8epQmqRp2FDMTYgpdmNLLu4pG4FIVt5HPTPKuNK1jxO1W2kCHMlMIO5CWrQlSEny3' +
  'IP5qpaxsP+GNS3OzodLqYrpS24rqpJAUknzwRnzr6Qk61tNrsFqut5uSYrU+O2trcFrKz2aVKACQema3b8HTI43Ua4eX7DHPGeyF' +
  'WM118jbUxaG/pykva9TPXmZH0lrKG22wp4NMyURUx5VteUQErTtCfVzjcgjmOfUVoa1sUh8TJUktrvFu2qmutexcI6jtRLT/AFA4' +
  'SvzIJ57q7l5lR+KXFK3/AKIlYjpSyhb7w2KWltRUpeCc9PVA6nA+nrO32vVV8ttyIe/SpzksHGO2tsteH0Y8AHkOAdx31Vjl+Ekd' +
  'LiMlvZKhmQ7fqaDgHulLRW1drc5Z7rNtrp3ORH3GFHxKVFOfrjP1oqoDkZShBBwtN391fzH80wOBzCFaxdlKA3Roiig+BW423n7L' +
  'P3pfu/ur+Y/mrjwln+iatEYEBc6M5Hbz3ujDiB9VNgfWl7LS6FzW+oT4d0uyrFEKNN8d1hag0yLq4lRPIBDoPP4YXVsv3HizQ0ON' +
  'WWFIuL45Jdf/AITGfHHtKH9uapnFd5qNxBj3llIU1KYiTk55g4ASQf7CDXV4icHnbY49edLIckQQS6uGnKnY465R3rQOvvDzHOoN' +
  'ipRsurvvDzFuADxn1BW4bFqJsranwg5OOcHghUa8wNQXSM9q+6RnixNlbTJWnaHXFAn1R7oCcZHIYApv6f0xA4i8L9NxrhJlMCEV' +
  'pC4+3cShS0bfWBwMbftS/u3E9/VGh3rFfEF+e24y7Hmo/wBQIOCHB3HaThQ694768NK8WLtpGxizwYlveSHlvJckBSlDdjKQAoDG' +
  'Rn60zqFe5PXAr4ZI123bHHbseyDUnqwzHxCXMcN++f8AV1+JnDGBou2RbzZ5swoEhLK0PrSVoUQVJWhSQPdPLHLkc1ouXCTqHUNk' +
  'uM14uP3mySYUlRAypTbbzW7zztQr45qSomvuLMpgy23RCaOUuuM9hEYz1IGPWPwyo9K9bLCZncVI9liOpVAsMaTFbeUeSkttudo6' +
  'fAlxa1eXLwotQSshDLDw+RoOSPnwFp3Q6UuhaWsOMAqo67WTrC4u59dSmnFfOWkE/wDJNFc/UNyF5v1wuKBhuRIW4geCM4T/ANQK' +
  'Kqxt8oBSb3ZccLmu/ur+Y/mpR5D0SQ1IjuqaeZWlxtxPVCgcgjzBFRd/dc+Y/mo1rCcPKcSoVk4qwIF2cuT1seipWzcY7McOdgpa' +
  '9wWMqGGlKKsHBwTg9Bl0wghqJGS0+XkttNoS9kZXtSBu5csnGeVfIFqu06xzm59tlORZLedriD3HqCDyIPeDkGmNYOMjcYBM+HKg' +
  'uH2nrWpJbWfEsOch/tUB5CuZ1/Q5NQja2N+OncZG38+/0TWn3RTkLgzIP2P29PZOGRoPSsue7cJGnbc9JeO5xa0EhR8duduT3nHO' +
  'unEtdstaCYdut8NKRklmO23gfEClj/nZaQjP6zLJ8P0cbv8A0xVb1BxpVKQUW6JIkr/leuRTsQfFLCPVJ+cq+FQGfhvVZSGT2PL8' +
  'i4++AqJ1eozeKDf59I9iSmBxH4kNaetRXGe7SY+kiEFHJWena47m0nmD/MoADkCa+cN69xVvXuOcq3HJz1yfOve4XKZd5rs64SXZ' +
  'Up45W66cqV/8A7gOQ7q167bTdNiow+FH9z6n6qDbtSWH9byiiiiqKTKw6k9ovkfaPd51AA+BoorIT55UsHwP2owfA/aiivIZRtPg' +
  'azg+Boor6hFZAPgaztPgaKK8sFGD4GiiivZWV//Z';
const LOGO_SRC = 'data:image/jpeg;base64,' + LOGO_B64;

/* ---------------------------------- constants ---------------------------------- */

const NAV = [
  { key: 'dashboard', label: 'Inicio', icon: Home },
  { key: 'pedidos', label: 'Pedidos', icon: Truck },
  { key: 'estadisticas', label: 'Estadisticas', icon: BarChart3 },
  { key: 'clientes', label: 'Clientes', icon: Users },
  { key: 'stock', label: 'Stock', icon: Package },
  { key: 'empleados', label: 'Vendedores', icon: UserCog },
];

const ESTADOS = {
  pendiente: { label: 'Pendiente', bg: 'var(--amber-bg)', fg: 'var(--amber)' },
  entregado: { label: 'Entregado', bg: 'var(--accent-bg)', fg: 'var(--accent)' },
  cancelado: { label: 'Cancelado', bg: 'var(--rust-bg)', fg: 'var(--rust)' },
};

const METODOS_PAGO = ['Efectivo', 'Transferencia', 'Cheque', 'Tarjeta', 'Otro'];
const UNIDADES = ['unidad', 'kg', 'caja', 'bolsa', 'docena', 'litro', 'pack'];
const MARGEN_CERCA_MINIMO = 10;

const DEFAULT_NEGOCIO = {
  nombre: 'RB Distribuidora',
  direccion: 'Rossi 4134, Saladillo, Buenos Aires',
  telefono: '2344-54-1604',
  alias: 'RB.DISTRIBUIDORA',
  instagram: '@distribuidora_rb_',
  pin: '',
};

const DEFAULT_PLANTILLA = {
  mostrarLogo: true,
  mostrarDomicilioNegocio: true,
  mostrarTelefonoNegocio: true,
  mostrarAlias: true,
  mostrarInstagram: true,
  labelCliente: 'SR.(ES):',
  mostrarDireccionCliente: true,
  mostrarTelefonoCliente: true,
  labelTotal: 'TOTAL',
  mostrarNotas: true,
  columnas: [
    { key: 'codigo', label: 'Codigo', visible: true },
    { key: 'cantidad', label: 'Cantidad', visible: true },
    { key: 'descripcion', label: 'Descripcion', visible: true },
    { key: 'precio', label: 'Precio unitario', visible: true },
    { key: 'total', label: 'Total', visible: true },
  ],
  bloques: [
    { key: 'header', label: 'Encabezado (logo y datos del negocio)', visible: true },
    { key: 'cliente', label: 'Datos del cliente', visible: true },
    { key: 'tabla', label: 'Tabla de productos', visible: true },
    { key: 'notas', label: 'Notas del pedido', visible: true },
    { key: 'total', label: 'Total', visible: true },
  ],
};

/* ---------------------------------- utils ---------------------------------- */

const uid = (p) => `${p}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
const money = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(Number(n) || 0);
const fmtDate = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};
const todayISO = () => new Date().toISOString().slice(0, 10);
const fmtDateHora = (iso) => {
  if (!iso) return '-';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '-';
  return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' +
    d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
};
const normalizeNegocio = (raw) => {
  if (!raw) return { ...DEFAULT_NEGOCIO };
  if (typeof raw === 'string') return { ...DEFAULT_NEGOCIO, nombre: raw || DEFAULT_NEGOCIO.nombre };
  return { ...DEFAULT_NEGOCIO, ...raw };
};

/* ---------------------------------- mapeo fila de Supabase <-> objeto de la app ---------------------------------- */

const fromDbNegocio = (r) => ({ nombre: r.nombre, direccion: r.direccion, telefono: r.telefono, alias: r.alias, instagram: r.instagram, pin: r.pin, plantillaRemito: r.plantilla_remito || null });
const fromDbCliente = (r) => ({ id: r.id, nombre: r.nombre, telefono: r.telefono || '', direccion: r.direccion || '', empresa: r.empresa || '', notas: r.notas || '' });
const toDbCliente = (c) => ({ id: c.id, nombre: c.nombre, telefono: c.telefono || '', direccion: c.direccion || '', empresa: c.empresa || '', notas: c.notas || '' });
const fromDbProducto = (r) => ({ id: r.id, codigo: r.codigo || '', nombre: r.nombre, categoria: r.categoria || '', precio: Number(r.precio), stock: Number(r.stock), stockMinimo: Number(r.stock_minimo), unidad: r.unidad || 'unidad' });
const toDbProducto = (p) => ({ id: p.id, codigo: p.codigo || '', nombre: p.nombre, categoria: p.categoria || '', precio: p.precio, stock: p.stock, stock_minimo: p.stockMinimo, unidad: p.unidad });
const fromDbEmpleado = (r) => ({ id: r.id, nombre: r.nombre, telefono: r.telefono || '', email: r.email || '', pin: r.pin || '' });
const toDbEmpleado = (e) => ({ id: e.id, nombre: e.nombre, telefono: e.telefono || '', email: e.email || '', pin: e.pin || '' });
const fromDbPedido = (r) => ({ id: r.id, numero: r.numero, clienteId: r.cliente_id, empleadoId: r.empleado_id, fecha: r.fecha, estado: r.estado, total: Number(r.total), notas: r.notas || '', items: r.items || [] });
const toDbPedido = (p) => ({ id: p.id, numero: p.numero, cliente_id: p.clienteId, empleado_id: p.empleadoId || null, fecha: p.fecha, estado: p.estado, total: p.total, notas: p.notas || '', items: p.items });
const fromDbPago = (r) => ({ id: r.id, clienteId: r.cliente_id, monto: Number(r.monto), fecha: r.fecha, metodo: r.metodo || '', notas: r.notas || '' });
const toDbPago = (p) => ({ id: p.id, cliente_id: p.clienteId, monto: p.monto, fecha: p.fecha, metodo: p.metodo, notas: p.notas || '' });
const fromDbMovimiento = (r) => ({ id: r.id, productoId: r.producto_id, productoNombre: r.producto_nombre || '', cantidadAnterior: Number(r.cantidad_anterior), cantidadNueva: Number(r.cantidad_nueva), delta: Number(r.delta), motivo: r.motivo || '', fecha: r.fecha });

/* ---------------------------------- stylesheet ---------------------------------- */

function StyleSheet() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
      .distro-root {
        --bg:#EEF2F7; --surface:#FFFFFF; --surface-alt:#E8EDF3; --border:#D6DEE8;
        --ink:#152840; --ink-2:#5B6B80;
        --primary:#123D6B; --primary-2:#0C2C4E;
        --gold:#F0B429; --gold-2:#D89F1F;
        --accent:#1C7A8C; --accent-bg:#DCEEF1;
        --amber:#96690E; --amber-bg:#FBECC7;
        --rust:#B03A2A; --rust-bg:#F4DCD7;
        --neutral-bg:#E8EDF3; --neutral-fg:#5B6B80;
        --font-display:'Space Grotesk',sans-serif; --font-body:'Inter',sans-serif; --font-mono:'IBM Plex Mono',monospace;
        background:var(--bg); color:var(--ink); font-family:var(--font-body);
        min-height:100vh;
      }
      .distro-root * { box-sizing:border-box; }
      .field-input, .field-select, .field-textarea {
        border:1px solid var(--border); background:var(--surface); color:var(--ink);
        font-family:var(--font-body); font-size:14px;
      }
      .field-input:focus, .field-select:focus, .field-textarea:focus {
        outline:none; border-color:var(--primary); box-shadow:0 0 0 3px rgba(18,61,107,0.13);
      }
      .btn-primary { background:var(--gold); color:#1A2942; font-family:var(--font-body); font-weight:700; transition:background .15s; }
      .btn-primary:hover { background:var(--gold-2); }
      .btn-primary:disabled { opacity:0.45; cursor:not-allowed; }
      .card { background:var(--surface); border:1px solid var(--border); }
      .ticket-divider { border-top:2px dashed var(--border); }
      .stamp { transform:rotate(-2deg); border:1.5px solid currentColor; letter-spacing:0.04em; font-family:var(--font-mono); display:inline-block; }
      .nav-item-active { background:rgba(240,180,41,0.16); }
      .mono { font-family:var(--font-mono); }
      .display { font-family:var(--font-display); }
      .list-row { border-bottom:1px solid var(--surface-alt); transition:background .15s; }
      .list-row:last-child { border-bottom:none; }
      ::-webkit-scrollbar { width:8px; height:8px; }
      ::-webkit-scrollbar-thumb { background:var(--border); border-radius:8px; }
      .print-only { display:none; }
      @media print {
        .app-shell { display:none !important; }
        .print-only { display:block !important; }
      }
    `}</style>
  );
}

/* ---------------------------------- small ui ---------------------------------- */

function Modal({ title, subtitle, onClose, children, wide }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(21,40,64,0.5)' }}
      onClick={onClose}
    >
      <div
        className={`w-full ${wide ? 'sm:max-w-2xl' : 'sm:max-w-md'} sm:m-4 max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl card`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-5 py-4 sticky top-0 card" style={{ borderBottom: '1px solid var(--border)' }}>
          <div>
            <h3 className="display font-semibold text-lg" style={{ color: 'var(--ink)' }}>{title}</h3>
            {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--ink-2)' }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg" style={{ color: 'var(--ink-2)' }}><X size={20} /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children, required }) {
  return (
    <label className="block mb-4">
      <span className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-2)' }}>
        {label}{required && <span style={{ color: 'var(--rust)' }}> *</span>}
      </span>
      {children}
    </label>
  );
}

function EmptyState({ icon: Icon, title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="p-4 rounded-full mb-4" style={{ background: 'var(--surface-alt)' }}>
        <Icon size={28} style={{ color: 'var(--ink-2)' }} />
      </div>
      <h3 className="display font-semibold text-base mb-1" style={{ color: 'var(--ink)' }}>{title}</h3>
      {subtitle && <p className="text-sm mb-4 max-w-xs" style={{ color: 'var(--ink-2)' }}>{subtitle}</p>}
      {actionLabel && (
        <button onClick={onAction} className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-1.5">
          <Plus size={16} /> {actionLabel}
        </button>
      )}
    </div>
  );
}

function Pill({ children, bg, fg }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold" style={{ background: bg, color: fg }}>
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, tone }) {
  return (
    <div className="card rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>{label}</span>
        <Icon size={16} style={{ color: tone || 'var(--ink-2)' }} />
      </div>
      <div className="mono font-semibold text-2xl" style={{ color: tone || 'var(--ink)' }}>{value}</div>
    </div>
  );
}

function ConfirmDialog({ title, message, confirmLabel, danger, onConfirm, onCancel }) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm mb-5" style={{ color: 'var(--ink-2)' }}>{message}</p>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: 'var(--ink-2)' }}>Cancelar</button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white"
          style={{ background: danger ? 'var(--rust)' : 'var(--primary)' }}
        >
          {confirmLabel || 'Confirmar'}
        </button>
      </div>
    </Modal>
  );
}

function ToastView({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium text-white"
      style={{ background: toast.type === 'error' ? 'var(--rust)' : 'var(--primary)' }}>
      {toast.message}
    </div>
  );
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--ink-2)' }} />
      <input
        className="field-input w-full pl-9 pr-3 py-2.5 rounded-lg text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/* ---------------------------------- role gate ---------------------------------- */

function RoleGate({ negocio, empleados, setNegocioPin, setEmpleadoPin, onEnter }) {
  const [step, setStep] = useState('inicio');
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const [error, setError] = useState('');

  const reset = () => { setPin(''); setPinConfirm(''); setError(''); };

  const irAdmin = () => {
    reset();
    setStep(negocio.pin ? 'admin-ingresar' : 'admin-crear');
  };

  const elegirVendedor = (emp) => {
    reset();
    setSelectedEmpleado(emp);
    setStep(emp.pin ? 'vendedor-ingresar' : 'vendedor-crear');
  };

  const confirmarAdminNuevo = () => {
    if (pin.length < 4) { setError('El PIN debe tener al menos 4 digitos.'); return; }
    if (pin !== pinConfirm) { setError('Los PIN no coinciden.'); return; }
    setNegocioPin(pin);
    onEnter('admin', null);
  };

  const validarAdmin = () => {
    if (pin === negocio.pin) { onEnter('admin', null); }
    else { setError('PIN incorrecto.'); setPin(''); }
  };

  const confirmarVendedorNuevo = () => {
    if (pin.length < 4) { setError('El PIN debe tener al menos 4 digitos.'); return; }
    if (pin !== pinConfirm) { setError('Los PIN no coinciden.'); return; }
    setEmpleadoPin(selectedEmpleado.id, pin);
    onEnter('vendedor', selectedEmpleado.id);
  };

  const validarVendedor = () => {
    if (pin === selectedEmpleado.pin) { onEnter('vendedor', selectedEmpleado.id); }
    else { setError('PIN incorrecto.'); setPin(''); }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="card rounded-2xl p-6 w-full max-w-sm">
        <div className="flex flex-col items-center mb-5">
          <img src={LOGO_SRC} alt="Logo" className="w-16 h-16 rounded-xl mb-3" style={{ border: '1px solid var(--border)' }} />
          <div className="display font-bold text-lg text-center" style={{ color: 'var(--ink)' }}>{negocio.nombre}</div>
        </div>

        {step === 'inicio' && (
          <div className="space-y-2.5">
            <p className="text-sm text-center mb-3" style={{ color: 'var(--ink-2)' }}>¿Quien esta usando la app?</p>
            <button type="button" onClick={irAdmin} className="btn-primary w-full px-4 py-3 rounded-lg text-sm flex items-center justify-center gap-2">
              <Lock size={15} /> Administrador
            </button>
            <button type="button" onClick={() => { reset(); setStep('vendedor-elegir'); }} className="w-full px-4 py-3 rounded-lg text-sm font-semibold" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
              Vendedor
            </button>
          </div>
        )}

        {step === 'vendedor-elegir' && (
          <div className="space-y-2">
            <p className="text-sm text-center mb-1" style={{ color: 'var(--ink-2)' }}>¿Cual sos?</p>
            {empleados.length === 0 ? (
              <p className="text-sm text-center py-4" style={{ color: 'var(--ink-2)' }}>Todavia no hay vendedores cargados. Pedile al administrador que agregue el primero desde Vendedores.</p>
            ) : empleados.map(e => (
              <button type="button" key={e.id} onClick={() => elegirVendedor(e)} className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold text-left" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
                {e.nombre}
              </button>
            ))}
            <button type="button" onClick={() => setStep('inicio')} className="w-full text-xs pt-2" style={{ color: 'var(--ink-2)' }}>Volver</button>
          </div>
        )}

        {(step === 'admin-crear' || step === 'vendedor-crear') && (
          <div className="space-y-3">
            <p className="text-xs text-center mb-1" style={{ color: 'var(--ink-2)' }}>
              {step === 'admin-crear'
                ? 'Es la primera vez que entras como administrador: crea un PIN para proteger el stock, los precios y los ajustes.'
                : `Es la primera vez de ${selectedEmpleado.nombre}: crea un PIN personal para entrar la proxima vez.`}
            </p>
            <input autoFocus type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" autoCorrect="off" spellCheck="false" className="field-input w-full px-3 py-2.5 rounded-lg text-center mono text-lg" placeholder="Nuevo PIN" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))} maxLength={6} />
            <input type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" autoCorrect="off" spellCheck="false" className="field-input w-full px-3 py-2.5 rounded-lg text-center mono text-lg" placeholder="Repetir PIN" value={pinConfirm} onChange={e => setPinConfirm(e.target.value.replace(/\D/g, ''))} maxLength={6} />
            {error && <p className="text-xs text-center" style={{ color: 'var(--rust)' }}>{error}</p>}
            <button type="button" onClick={step === 'admin-crear' ? confirmarAdminNuevo : confirmarVendedorNuevo} className="btn-primary w-full px-4 py-2.5 rounded-lg text-sm">Crear PIN y entrar</button>
            <button type="button" onClick={() => setStep(step === 'admin-crear' ? 'inicio' : 'vendedor-elegir')} className="w-full text-xs pt-1" style={{ color: 'var(--ink-2)' }}>Volver</button>
          </div>
        )}

        {(step === 'admin-ingresar' || step === 'vendedor-ingresar') && (
          <div className="space-y-3">
            {step === 'vendedor-ingresar' && <p className="text-sm text-center mb-1 font-medium" style={{ color: 'var(--ink)' }}>{selectedEmpleado.nombre}</p>}
            <input autoFocus type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" autoCorrect="off" spellCheck="false" className="field-input w-full px-3 py-2.5 rounded-lg text-center mono text-lg" placeholder="PIN" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))} maxLength={6} />
            {error && <p className="text-xs text-center" style={{ color: 'var(--rust)' }}>{error}</p>}
            <button type="button" onClick={step === 'admin-ingresar' ? validarAdmin : validarVendedor} className="btn-primary w-full px-4 py-2.5 rounded-lg text-sm">Entrar</button>
            <button type="button" onClick={() => setStep(step === 'admin-ingresar' ? 'inicio' : 'vendedor-elegir')} className="w-full text-xs pt-1" style={{ color: 'var(--ink-2)' }}>Volver</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------- receipt (preview + print) ---------------------------------- */

function ReceiptContent({ pedido, cliente, negocio, plantilla }) {
  const pl = plantilla || DEFAULT_PLANTILLA;
  const numeroFmt = String(pedido.numero).padStart(8, '0');
  const columnas = (pl.columnas || DEFAULT_PLANTILLA.columnas).filter(c => c.visible);
  const bloques = (pl.bloques || DEFAULT_PLANTILLA.bloques).filter(b => b.visible).map(b => b.key);

  const valorColumna = (it, key) => {
    if (key === 'codigo') return it.codigo || '-';
    if (key === 'cantidad') return it.cantidad;
    if (key === 'descripcion') return it.nombre;
    if (key === 'precio') return it.precioUnitario.toFixed(2);
    if (key === 'total') return (it.cantidad * it.precioUnitario).toFixed(2);
    return '';
  };
  const alineado = (key) => (key === 'precio' || key === 'total') ? 'right' : 'left';

  const nodos = {
    header: (
      <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: 10, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {pl.mostrarLogo && <img src={LOGO_SRC} alt="logo" style={{ width: 44, height: 44, borderRadius: 6 }} />}
            <div style={{ fontSize: 18, fontWeight: 700 }}>{negocio.nombre.toUpperCase()}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 13 }}>
            <div style={{ fontWeight: 700 }}>Nro. {numeroFmt}</div>
            <div>Fecha: {fmtDate(pedido.fecha)}</div>
          </div>
        </div>
        {(pl.mostrarDomicilioNegocio || pl.mostrarTelefonoNegocio || pl.mostrarAlias || pl.mostrarInstagram) && (
          <div style={{ display: 'flex', borderBottom: '2px solid #000', paddingBottom: 8, marginBottom: 8, fontSize: 12 }}>
            <div style={{ flex: 1, borderRight: '1px solid #000', paddingRight: 8 }}>
              {pl.mostrarDomicilioNegocio && <div>Domicilio: {negocio.direccion}</div>}
              {pl.mostrarTelefonoNegocio && <div>TE: {negocio.telefono}</div>}
            </div>
            <div style={{ flex: 1, paddingLeft: 8 }}>
              {pl.mostrarAlias && <div>Alias: {negocio.alias}</div>}
              {pl.mostrarInstagram && <div>Instagram: {negocio.instagram}</div>}
            </div>
          </div>
        )}
      </>
    ),
    cliente: (
      <div style={{ borderBottom: '2px solid #000', paddingBottom: 8, marginBottom: 8, fontSize: 12 }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{pl.labelCliente || 'SR.(ES):'}</div>
        <div>{cliente ? cliente.nombre : 'Consumidor final'}</div>
        {pl.mostrarDireccionCliente && cliente && cliente.direccion && <div>{cliente.direccion}</div>}
        {pl.mostrarTelefonoCliente && cliente && cliente.telefono && <div>Tel: {cliente.telefono}</div>}
      </div>
    ),
    tabla: (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 16 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #000' }}>
            {columnas.map(c => <th key={c.key} style={{ textAlign: alineado(c.key), padding: '4px 2px' }}>{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {pedido.items.map((it, i) => (
            <tr key={i}>
              {columnas.map(c => <td key={c.key} style={{ padding: '3px 2px', textAlign: alineado(c.key) }}>{valorColumna(it, c.key)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    ),
    notas: pl.mostrarNotas && pedido.notas ? <div style={{ marginBottom: 12, fontSize: 11 }}>Notas: {pedido.notas}</div> : null,
    total: (
      <div style={{ border: '2px solid #000', padding: '10px 14px', textAlign: 'right', fontSize: 18, fontWeight: 700 }}>
        {pl.labelTotal || 'TOTAL'} $ {pedido.total.toFixed(2)}
      </div>
    ),
  };

  return (
    <div style={{ border: '2px solid #000', padding: 18, fontFamily: 'Arial, Helvetica, sans-serif', color: '#000', background: '#fff', maxWidth: 680, margin: '0 auto' }}>
      {bloques.map(key => <div key={key}>{nodos[key]}</div>)}
    </div>
  );
}

function PedidoImprimirModal({ pedidoId, pedidos, clientes, negocio, closeModal }) {
  const pedido = pedidos.find(p => p.id === pedidoId);
  useEffect(() => { if (!pedido) closeModal(); }, [pedido]);
  if (!pedido) return null;
  const cliente = clientes.find(c => c.id === pedido.clienteId);

  return (
    <Modal title="Vista previa del remito" subtitle="Asi se ve (y se imprime)" onClose={closeModal} wide>
      <div className="rounded-lg mb-4" style={{ background: '#DEE3E9', padding: 16, overflowX: 'auto' }}>
        <ReceiptContent pedido={pedido} cliente={cliente} negocio={negocio} plantilla={negocio.plantillaRemito} />
      </div>
      <p className="text-xs mb-3" style={{ color: 'var(--ink-2)' }}>
        Si "Imprimir" no abre el dialogo de tu navegador, podes hacer una captura de esta pantalla y enviarla por WhatsApp.
      </p>
      <div className="flex justify-end">
        <button onClick={() => window.print()} className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-1.5">
          <Printer size={16} /> Imprimir
        </button>
      </div>
    </Modal>
  );
}

function PrintOnly({ pedidoId, pedidos, clientes, negocio }) {
  const pedido = pedidos.find(p => p.id === pedidoId);
  if (!pedido) return null;
  const cliente = clientes.find(c => c.id === pedido.clienteId);
  return (
    <div className="print-only">
      <ReceiptContent pedido={pedido} cliente={cliente} negocio={negocio} plantilla={negocio.plantillaRemito} />
    </div>
  );
}

/* ---------------------------------- error boundary ---------------------------------- */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    console.error('Error en la app:', error, info);
  }
  render() {
    if (this.state.error) {
      const msg = this.state.error && this.state.error.message ? this.state.error.message : String(this.state.error);
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'Arial, sans-serif', background: '#EEF2F7' }}>
          <div style={{ maxWidth: 440, width: '100%', background: '#fff', border: '1px solid #D6DEE8', borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#152840' }}>Algo salio mal</div>
            <div style={{ fontSize: 13, color: '#5B6B80', marginBottom: 14, lineHeight: 1.5 }}>
              Hubo un error inesperado y la app no puede seguir. Toca "Reintentar" para recargar. Si el problema sigue, mandame el mensaje de abajo tal cual aparece.
            </div>
            <div style={{ fontSize: 12, color: '#B03A2A', background: '#F4DCD7', border: '1px solid #D6DEE8', borderRadius: 8, padding: 10, marginBottom: 14, wordBreak: 'break-word', fontFamily: 'monospace' }}>
              {msg}
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ background: '#F0B429', color: '#1A2942', fontWeight: 700, border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 14, cursor: 'pointer' }}
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ---------------------------------- app ---------------------------------- */

function App() {
  const [loaded, setLoaded] = useState(false);
  const [saveStatus, setSaveStatus] = useState('idle');
  const [tab, setTab] = useState('dashboard');
  const [negocio, setNegocio] = useState(DEFAULT_NEGOCIO);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [role, setRole] = useState(null);
  const [currentVendedorId, setCurrentVendedorId] = useState(null);

  const fileInputRef = useRef(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const openModal = (type, props) => setModal({ type, props: props || {} });
  const closeModal = () => setModal(null);

  /* ---- carga inicial (una consulta por tabla) ---- */
  useEffect(() => {
    (async () => {
      try {
        const [negRes, cliRes, prodRes, empRes, pedRes, pagRes] = await Promise.all([
          supabase.from('negocio').select('*').eq('id', DB_ROW_ID).single(),
          supabase.from('clientes').select('*').order('nombre'),
          supabase.from('productos').select('*').order('nombre'),
          supabase.from('empleados').select('*').order('nombre'),
          supabase.from('pedidos').select('*').order('numero', { ascending: false }),
          supabase.from('pagos').select('*').order('fecha', { ascending: false }),
        ]);
        if (negRes.data) setNegocio(normalizeNegocio(fromDbNegocio(negRes.data)));
        if (cliRes.data) setClientes(cliRes.data.map(fromDbCliente));
        if (prodRes.data) setProductos(prodRes.data.map(fromDbProducto));
        if (empRes.data) setEmpleados(empRes.data.map(fromDbEmpleado));
        if (pedRes.data) setPedidos(pedRes.data.map(fromDbPedido));
        if (pagRes.data) setPagos(pagRes.data.map(fromDbPago));
      } catch (e) {
        /* sin conexion, o el proyecto de Supabase todavia no tiene datos */
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  /* ---- indicador liviano de "Guardando.../Guardado" para varias operaciones en simultaneo ---- */
  const pendingSaves = useRef(0);
  const beginSave = () => { pendingSaves.current += 1; setSaveStatus('saving'); };
  const endSave = () => { pendingSaves.current = Math.max(0, pendingSaves.current - 1); if (pendingSaves.current === 0) setSaveStatus('saved'); };

  /* ---- computed ---- */
  const saldoCliente = useCallback((clienteId) => {
    const totalPedidos = pedidos.filter(p => p.clienteId === clienteId && p.estado !== 'cancelado').reduce((s, p) => s + p.total, 0);
    const totalPagos = pagos.filter(p => p.clienteId === clienteId).reduce((s, p) => s + p.monto, 0);
    return Math.round((totalPedidos - totalPagos) * 100) / 100;
  }, [pedidos, pagos]);

  const ventasEmpleado = useCallback((empleadoId) => {
    return pedidos.filter(p => p.empleadoId === empleadoId && p.estado !== 'cancelado').reduce((s, p) => s + p.total, 0);
  }, [pedidos]);

  /* ---- clientes ---- */
  const saveCliente = async (data) => {
    closeModal();
    if (data.id) {
      setClientes(cs => cs.map(c => c.id === data.id ? { ...c, ...data } : c));
      beginSave();
      const { error } = await supabase.from('clientes').update(toDbCliente({ ...data })).eq('id', data.id);
      endSave();
      showToast(error ? 'No se pudo guardar el cliente. Revisa tu conexion.' : 'Cliente actualizado', error ? 'error' : undefined);
    } else {
      const nuevo = { ...data, id: uid('cli') };
      setClientes(cs => [...cs, nuevo]);
      beginSave();
      const { error } = await supabase.from('clientes').insert(toDbCliente(nuevo));
      endSave();
      showToast(error ? 'No se pudo guardar el cliente. Revisa tu conexion.' : 'Cliente agregado', error ? 'error' : undefined);
    }
  };
  const deleteCliente = async (id) => {
    const tienePedidos = pedidos.some(p => p.clienteId === id);
    if (tienePedidos) { showToast('No se puede eliminar: tiene pedidos asociados', 'error'); closeModal(); return; }
    closeModal();
    setClientes(cs => cs.filter(c => c.id !== id));
    setPagos(ps => ps.filter(p => p.clienteId !== id));
    beginSave();
    const { error } = await supabase.from('clientes').delete().eq('id', id);
    endSave();
    showToast(error ? 'No se pudo eliminar el cliente. Revisa tu conexion.' : 'Cliente eliminado', error ? 'error' : undefined);
  };
  const importarClientesTexto = async (texto) => {
    const lineas = texto.split('\n').map(l => l.trim()).filter(Boolean);
    const nuevos = lineas.map(linea => {
      const partes = linea.split(',').map(p => p.trim());
      return { id: uid('cli'), nombre: partes[0] || '', telefono: partes[1] || '', direccion: partes[2] || '', empresa: partes[3] || '', notas: '' };
    }).filter(c => c.nombre);
    if (nuevos.length === 0) return { ok: 0 };
    setClientes(cs => [...cs, ...nuevos]);
    closeModal();
    beginSave();
    const { error } = await supabase.from('clientes').insert(nuevos.map(toDbCliente));
    endSave();
    showToast(error ? 'Se cargaron en pantalla pero hubo un error al guardar. Revisa tu conexion.' : `${nuevos.length} cliente(s) importado(s)`, error ? 'error' : undefined);
    return { ok: nuevos.length };
  };

  /* ---- productos ---- */
  const saveProducto = async (data) => {
    closeModal();
    if (data.id) {
      setProductos(ps => ps.map(p => p.id === data.id ? { ...p, ...data } : p));
      beginSave();
      const { error } = await supabase.from('productos').update(toDbProducto({ ...data })).eq('id', data.id);
      endSave();
      showToast(error ? 'No se pudo guardar el producto. Revisa tu conexion.' : 'Producto actualizado', error ? 'error' : undefined);
    } else {
      const nuevo = { ...data, id: uid('prod') };
      setProductos(ps => [...ps, nuevo]);
      beginSave();
      const { error } = await supabase.from('productos').insert(toDbProducto(nuevo));
      endSave();
      showToast(error ? 'No se pudo guardar el producto. Revisa tu conexion.' : 'Producto agregado', error ? 'error' : undefined);
    }
  };
  const deleteProducto = async (id) => {
    const enUso = pedidos.some(p => p.items.some(it => it.productoId === id));
    if (enUso) { showToast('No se puede eliminar: aparece en pedidos existentes', 'error'); closeModal(); return; }
    closeModal();
    setProductos(ps => ps.filter(p => p.id !== id));
    beginSave();
    const { error } = await supabase.from('productos').delete().eq('id', id);
    endSave();
    showToast(error ? 'No se pudo eliminar el producto. Revisa tu conexion.' : 'Producto eliminado', error ? 'error' : undefined);
  };
  const registrarMovimientoStock = async (productoId, productoNombre, cantidadAnterior, cantidadNueva, motivo) => {
    const delta = Math.round((cantidadNueva - cantidadAnterior) * 100) / 100;
    if (!delta) return;
    await supabase.from('movimientos_stock').insert({
      id: uid('mov'), producto_id: productoId, producto_nombre: productoNombre,
      cantidad_anterior: cantidadAnterior, cantidad_nueva: cantidadNueva, delta, motivo,
    });
  };

  const ajustarStock = async (id, delta) => {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    const nuevoStock = Math.max(0, Math.round((prod.stock + delta) * 100) / 100);
    setProductos(ps => ps.map(p => p.id === id ? { ...p, stock: nuevoStock } : p));
    beginSave();
    const [{ error }] = await Promise.all([
      supabase.from('productos').update({ stock: nuevoStock }).eq('id', id),
      registrarMovimientoStock(id, prod.nombre, prod.stock, nuevoStock, 'Ajuste manual (+/-)'),
    ]);
    endSave();
    if (error) showToast('No se pudo actualizar el stock. Revisa tu conexion.', 'error');
  };

  const editarStockDirecto = async (id, nuevoValor) => {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;
    const nuevoStock = Math.max(0, Math.round((parseFloat(nuevoValor) || 0) * 100) / 100);
    if (nuevoStock === prod.stock) return;
    setProductos(ps => ps.map(p => p.id === id ? { ...p, stock: nuevoStock } : p));
    beginSave();
    const [{ error }] = await Promise.all([
      supabase.from('productos').update({ stock: nuevoStock }).eq('id', id),
      registrarMovimientoStock(id, prod.nombre, prod.stock, nuevoStock, 'Edicion directa'),
    ]);
    endSave();
    if (error) showToast('No se pudo actualizar el stock. Revisa tu conexion.', 'error');
  };

  const cargarHistorialStock = async (productoId) => {
    const { data, error } = await supabase.from('movimientos_stock').select('*').eq('producto_id', productoId).order('fecha', { ascending: false }).limit(50);
    if (error || !data) return [];
    return data.map(fromDbMovimiento);
  };

  const importarProductosTexto = async (texto) => {
    const lineas = texto.split('\n').map(l => l.trim()).filter(Boolean);
    const nuevos = lineas.map(linea => {
      const partes = linea.split(',').map(p => p.trim());
      return {
        id: uid('prod'), nombre: partes[0] || '', precio: parseFloat(partes[1]) || 0,
        stock: parseFloat(partes[2]) || 0, categoria: partes[3] || '', unidad: partes[4] || 'unidad', codigo: partes[5] || '', stockMinimo: 5,
      };
    }).filter(p => p.nombre);
    if (nuevos.length === 0) return { ok: 0 };
    setProductos(ps => [...ps, ...nuevos]);
    closeModal();
    beginSave();
    const { error } = await supabase.from('productos').insert(nuevos.map(toDbProducto));
    endSave();
    showToast(error ? 'Se cargaron en pantalla pero hubo un error al guardar. Revisa tu conexion.' : `${nuevos.length} producto(s) importado(s)`, error ? 'error' : undefined);
    return { ok: nuevos.length };
  };

  /* ---- empleados ---- */
  const saveEmpleado = async (data) => {
    closeModal();
    if (data.id) {
      setEmpleados(es => es.map(e => e.id === data.id ? { ...e, ...data } : e));
      beginSave();
      const { error } = await supabase.from('empleados').update({ nombre: data.nombre, telefono: data.telefono || '', email: data.email || '' }).eq('id', data.id);
      endSave();
      showToast(error ? 'No se pudo guardar el vendedor. Revisa tu conexion.' : 'Vendedor actualizado', error ? 'error' : undefined);
    } else {
      const nuevo = { ...data, id: uid('emp'), pin: '' };
      setEmpleados(es => [...es, nuevo]);
      beginSave();
      const { error } = await supabase.from('empleados').insert(toDbEmpleado(nuevo));
      endSave();
      showToast(error ? 'No se pudo guardar el vendedor. Revisa tu conexion.' : 'Vendedor agregado', error ? 'error' : undefined);
    }
  };
  const deleteEmpleado = async (id) => {
    const tienePedidos = pedidos.some(p => p.empleadoId === id);
    if (tienePedidos) { showToast('No se puede eliminar: tiene pedidos asociados', 'error'); closeModal(); return; }
    closeModal();
    setEmpleados(es => es.filter(e => e.id !== id));
    beginSave();
    const { error } = await supabase.from('empleados').delete().eq('id', id);
    endSave();
    showToast(error ? 'No se pudo eliminar el vendedor. Revisa tu conexion.' : 'Vendedor eliminado', error ? 'error' : undefined);
  };
  const setEmpleadoPin = async (empleadoId, pin) => {
    setEmpleados(es => es.map(e => e.id === empleadoId ? { ...e, pin } : e));
    const { error } = await supabase.from('empleados').update({ pin }).eq('id', empleadoId);
    if (error) showToast('No se pudo guardar el PIN. Revisa tu conexion.', 'error');
  };
  const resetEmpleadoPin = async (empleadoId) => {
    setEmpleados(es => es.map(e => e.id === empleadoId ? { ...e, pin: '' } : e));
    const { error } = await supabase.from('empleados').update({ pin: '' }).eq('id', empleadoId);
    showToast(error ? 'No se pudo reiniciar el PIN. Revisa tu conexion.' : 'PIN reiniciado', error ? 'error' : undefined);
  };

  /* ---- pedidos ---- */
  const aplicarDeltaStock = async (deltas, motivo) => {
    const cambios = [];
    const nuevosPorId = {};
    deltas.forEach(d => {
      if (!d.delta) return;
      const prod = productos.find(p => p.id === d.productoId);
      if (!prod) return;
      const nuevo = Math.max(0, Math.round((prod.stock + d.delta) * 100) / 100);
      nuevosPorId[d.productoId] = nuevo;
      cambios.push({ productoId: prod.id, nombre: prod.nombre, anterior: prod.stock, nuevo });
    });
    const ids = Object.keys(nuevosPorId);
    if (ids.length === 0) return;
    setProductos(prods => prods.map(pr => nuevosPorId[pr.id] !== undefined ? { ...pr, stock: nuevosPorId[pr.id] } : pr));
    beginSave();
    await Promise.all([
      ...ids.map(id => supabase.from('productos').update({ stock: nuevosPorId[id] }).eq('id', id)),
      ...cambios.map(c => registrarMovimientoStock(c.productoId, c.nombre, c.anterior, c.nuevo, motivo)),
    ]);
    endSave();
  };

  const crearPedido = async ({ clienteId, empleadoId, fecha, items, notas }) => {
    const total = items.reduce((s, it) => s + it.cantidad * it.precioUnitario, 0);
    const numero = pedidos.reduce((max, p) => Math.max(max, p.numero), 0) + 1;
    const nuevo = { id: uid('ped'), numero, clienteId, empleadoId: empleadoId || null, fecha, items, estado: 'pendiente', total: Math.round(total * 100) / 100, notas: notas || '' };
    setPedidos(ps => [nuevo, ...ps]);
    closeModal();
    beginSave();
    const { error } = await supabase.from('pedidos').insert(toDbPedido(nuevo));
    endSave();
    if (error) { showToast('No se pudo guardar el pedido. Revisa tu conexion.', 'error'); return; }
    showToast('Pedido creado');
    await aplicarDeltaStock(items.map(it => ({ productoId: it.productoId, delta: -it.cantidad })), `Pedido REM-${String(numero).padStart(4, '0')} creado`);
  };

  const editarPedido = async (pedidoId, { clienteId, empleadoId, fecha, items, notas }) => {
    const original = pedidos.find(p => p.id === pedidoId);
    if (!original) return;
    const total = items.reduce((s, it) => s + it.cantidad * it.precioUnitario, 0);
    const actualizado = { ...original, clienteId, empleadoId: empleadoId || null, fecha, items, notas: notas || '', total: Math.round(total * 100) / 100 };
    setPedidos(ps => ps.map(p => p.id === pedidoId ? actualizado : p));
    closeModal();
    beginSave();
    const { error } = await supabase.from('pedidos').update({
      cliente_id: actualizado.clienteId, empleado_id: actualizado.empleadoId, fecha: actualizado.fecha,
      items: actualizado.items, notas: actualizado.notas, total: actualizado.total,
    }).eq('id', pedidoId);
    endSave();
    if (error) { showToast('No se pudo guardar el pedido. Revisa tu conexion.', 'error'); return; }
    showToast('Pedido actualizado');

    const productoIds = new Set([...original.items.map(i => i.productoId), ...items.map(i => i.productoId)]);
    const deltas = Array.from(productoIds).map(pid => {
      const oldQty = (original.items.find(i => i.productoId === pid) || {}).cantidad || 0;
      const newQty = (items.find(i => i.productoId === pid) || {}).cantidad || 0;
      return { productoId: pid, delta: oldQty - newQty };
    });
    await aplicarDeltaStock(deltas, `Pedido REM-${String(original.numero).padStart(4, '0')} editado`);
  };

  const cambiarEstadoPedido = async (id, nuevoEstado) => {
    const p = pedidos.find(x => x.id === id);
    if (!p) return;
    const estadoAnterior = p.estado;
    setPedidos(ps => ps.map(x => x.id === id ? { ...x, estado: nuevoEstado } : x));
    beginSave();
    const { error } = await supabase.from('pedidos').update({ estado: nuevoEstado }).eq('id', id);
    endSave();
    if (error) { showToast('No se pudo actualizar el pedido. Revisa tu conexion.', 'error'); return; }
    showToast(nuevoEstado === 'entregado' ? 'Pedido marcado como entregado' : 'Pedido cancelado, stock restituido');
    if (nuevoEstado === 'cancelado' && estadoAnterior !== 'cancelado') {
      await aplicarDeltaStock(p.items.map(it => ({ productoId: it.productoId, delta: it.cantidad })), `Pedido REM-${String(p.numero).padStart(4, '0')} cancelado`);
    }
  };

  const eliminarPedido = async (id) => {
    const p = pedidos.find(x => x.id === id);
    if (!p) return;
    setPedidos(ps => ps.filter(x => x.id !== id));
    closeModal();
    beginSave();
    const { error } = await supabase.from('pedidos').delete().eq('id', id);
    endSave();
    if (error) { showToast('No se pudo eliminar el pedido. Revisa tu conexion.', 'error'); return; }
    showToast('Pedido eliminado');
    if (p.estado !== 'cancelado') {
      await aplicarDeltaStock(p.items.map(it => ({ productoId: it.productoId, delta: it.cantidad })), `Pedido REM-${String(p.numero).padStart(4, '0')} eliminado`);
    }
  };

  /* ---- pagos ---- */
  const registrarPago = async (data) => {
    const nuevo = { ...data, id: uid('pago') };
    setPagos(ps => [nuevo, ...ps]);
    beginSave();
    const { error } = await supabase.from('pagos').insert(toDbPago(nuevo));
    endSave();
    showToast(error ? 'No se pudo registrar el pago. Revisa tu conexion.' : 'Pago registrado', error ? 'error' : undefined);
  };
  const eliminarPago = async (id) => {
    setPagos(ps => ps.filter(p => p.id !== id));
    beginSave();
    const { error } = await supabase.from('pagos').delete().eq('id', id);
    endSave();
    showToast(error ? 'No se pudo eliminar el pago. Revisa tu conexion.' : 'Pago eliminado', error ? 'error' : undefined);
  };

  /* ---- negocio / ajustes ---- */
  const guardarNegocio = async (data) => {
    setNegocio(n => ({ ...n, ...data }));
    beginSave();
    const { error } = await supabase.from('negocio').update(data).eq('id', DB_ROW_ID);
    endSave();
    showToast(error ? 'No se pudieron guardar los ajustes. Revisa tu conexion.' : 'Ajustes guardados', error ? 'error' : undefined);
  };
  const setNegocioPin = async (pin) => {
    setNegocio(n => ({ ...n, pin }));
    const { error } = await supabase.from('negocio').update({ pin }).eq('id', DB_ROW_ID);
    if (error) showToast('No se pudo guardar el PIN. Revisa tu conexion.', 'error');
  };
  const guardarPlantillaRemito = async (plantilla) => {
    setNegocio(n => ({ ...n, plantillaRemito: plantilla }));
    beginSave();
    const { error } = await supabase.from('negocio').update({ plantilla_remito: plantilla }).eq('id', DB_ROW_ID);
    endSave();
    showToast(error ? 'No se pudo guardar el diseno. Revisa tu conexion.' : 'Diseno del remito guardado', error ? 'error' : undefined);
  };

  /* ---- sesion ---- */
  const entrar = (r, vendedorId) => {
    setRole(r);
    setCurrentVendedorId(vendedorId);
    setTab(r === 'vendedor' ? 'pedidos' : 'dashboard');
  };
  const salir = () => {
    setRole(null);
    setCurrentVendedorId(null);
    closeModal();
  };

  /* ---- backup ---- */
  const exportarRespaldo = () => {
    const payload = JSON.stringify({ negocio, clientes, productos, empleados, pedidos, pagos }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo-${negocio.nombre.replace(/\s+/g, '_').toLowerCase()}-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Respaldo descargado');
  };
  const importarRespaldo = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const data = JSON.parse(reader.result);
        const neg = normalizeNegocio(data.negocio);
        const cli = data.clientes || [];
        const prod = data.productos || [];
        const emp = data.empleados || [];
        const ped = data.pedidos || [];
        const pag = data.pagos || [];

        await Promise.all([
          supabase.from('pagos').delete().neq('id', '__ninguno__'),
          supabase.from('pedidos').delete().neq('id', '__ninguno__'),
        ]);
        await Promise.all([
          supabase.from('clientes').delete().neq('id', '__ninguno__'),
          supabase.from('productos').delete().neq('id', '__ninguno__'),
          supabase.from('empleados').delete().neq('id', '__ninguno__'),
        ]);

        if (cli.length) await supabase.from('clientes').insert(cli.map(toDbCliente));
        if (prod.length) await supabase.from('productos').insert(prod.map(toDbProducto));
        if (emp.length) await supabase.from('empleados').insert(emp.map(toDbEmpleado));
        if (ped.length) await supabase.from('pedidos').insert(ped.map(toDbPedido));
        if (pag.length) await supabase.from('pagos').insert(pag.map(toDbPago));
        await supabase.from('negocio').update({ nombre: neg.nombre, direccion: neg.direccion, telefono: neg.telefono, alias: neg.alias, instagram: neg.instagram, pin: neg.pin }).eq('id', DB_ROW_ID);

        setNegocio(neg);
        setClientes(cli);
        setProductos(prod);
        setEmpleados(emp);
        setPedidos(ped);
        setPagos(pag);
        showToast('Respaldo importado');
      } catch (err) {
        showToast('El archivo no es un respaldo valido, o hubo un error al restaurarlo', 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!loaded) {
    return (
      <div className="distro-root flex items-center justify-center min-h-screen">
        <StyleSheet />
        <div className="text-sm" style={{ color: 'var(--ink-2)' }}>Cargando…</div>
      </div>
    );
  }

  const shared = {
    clientes, productos, empleados, pedidos, pagos, negocio,
    saldoCliente, ventasEmpleado,
    openModal, closeModal, showToast,
    saveCliente, deleteCliente, importarClientesTexto,
    saveProducto, deleteProducto, ajustarStock, editarStockDirecto, cargarHistorialStock, importarProductosTexto,
    saveEmpleado, deleteEmpleado, resetEmpleadoPin,
    crearPedido, editarPedido, cambiarEstadoPedido, eliminarPedido,
    registrarPago, eliminarPago,
    setTab, role, currentVendedorId,
  };

  const navItems = role === 'admin' ? NAV : NAV.filter(n => n.key === 'pedidos');
  const usuarioLabel = role === 'admin' ? 'Administrador' : (empleados.find(e => e.id === currentVendedorId) || {}).nombre || 'Vendedor';
  const printPedidoId = (modal && modal.type === 'pedidoImprimir') ? modal.props.pedidoId : null;

  return (
    <>
      <div className="distro-root app-shell">
        <StyleSheet />
        {role === null ? (
          <RoleGate negocio={negocio} empleados={empleados} setNegocioPin={setNegocioPin} setEmpleadoPin={setEmpleadoPin} onEnter={entrar} />
        ) : (
          <>
            <ToastView toast={toast} />
            <input type="file" ref={fileInputRef} accept="application/json" className="hidden" onChange={importarRespaldo} />

            <div className="flex min-h-screen">
              <aside className="hidden md:flex flex-col w-60 shrink-0" style={{ background: 'var(--primary)' }}>
                <div className="px-5 py-6 flex items-center gap-3">
                  <img src={LOGO_SRC} alt="Logo" className="w-10 h-10 rounded-lg shrink-0" />
                  <div className="min-w-0">
                    <div className="display font-bold text-base text-white leading-tight truncate">{negocio.nombre}</div>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Gestion de distribucion</div>
                  </div>
                </div>
                <nav className="flex-1 px-3 space-y-1">
                  {navItems.map(item => (
                    <button
                      key={item.key}
                      onClick={() => setTab(item.key)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${tab === item.key ? 'nav-item-active' : ''}`}
                      style={{ color: tab === item.key ? 'var(--gold)' : 'rgba(255,255,255,0.72)' }}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  ))}
                </nav>
                <div className="px-3 pb-5 space-y-1">
                  {role === 'admin' && (
                    <button onClick={() => openModal('ajustes')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>
                      <Settings size={18} /> Ajustes
                    </button>
                  )}
                  <button onClick={salir} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium" style={{ color: 'rgba(255,255,255,0.72)' }}>
                    <LogOut size={18} /> Cambiar usuario
                  </button>
                </div>
              </aside>

              <div className="flex-1 min-w-0 flex flex-col pb-20 md:pb-0">
                <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 sticky top-0 z-30" style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                  <div className="flex items-center gap-2 md:hidden">
                    <img src={LOGO_SRC} alt="Logo" className="w-7 h-7 rounded-md" />
                    <div className="display font-bold text-base" style={{ color: 'var(--ink)' }}>{negocio.nombre}</div>
                  </div>
                  <h1 className="display font-semibold text-xl hidden md:block" style={{ color: 'var(--ink)' }}>
                    {NAV.find(n => n.key === tab) ? NAV.find(n => n.key === tab).label : ''}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="text-xs hidden lg:inline" style={{ color: 'var(--ink-2)' }}>{usuarioLabel}</span>
                    <span className="text-xs hidden sm:inline" style={{ color: 'var(--ink-2)' }}>
                      {saveStatus === 'saving' ? 'Guardando…' : 'Guardado'}
                    </span>
                    <button onClick={salir} className="sm:hidden p-2 rounded-lg" style={{ color: 'var(--ink-2)' }}>
                      <LogOut size={18} />
                    </button>
                    <button
                      onClick={() => openModal('pedidoForm')}
                      className="btn-primary px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5"
                    >
                      <Plus size={16} /> <span className="hidden sm:inline">Nuevo pedido</span>
                    </button>
                  </div>
                </header>

                <main className="flex-1 px-4 md:px-8 py-5">
                  {tab === 'dashboard' && role === 'admin' && <DashboardView {...shared} />}
                  {tab === 'pedidos' && <PedidosView {...shared} />}
                  {tab === 'estadisticas' && role === 'admin' && <EstadisticasView {...shared} />}
                  {tab === 'clientes' && role === 'admin' && <ClientesView {...shared} />}
                  {tab === 'stock' && role === 'admin' && <StockView {...shared} />}
                  {tab === 'empleados' && role === 'admin' && <EmpleadosView {...shared} />}
                </main>
              </div>
            </div>

            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex" style={{ background: 'var(--primary)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {navItems.map(item => (
                <button
                  key={item.key}
                  onClick={() => setTab(item.key)}
                  className="flex-1 flex flex-col items-center gap-0.5 py-2.5"
                  style={{ color: tab === item.key ? 'var(--gold)' : 'rgba(255,255,255,0.55)' }}
                >
                  <item.icon size={19} />
                  <span style={{ fontSize: '10px', fontWeight: 500 }}>{item.label}</span>
                </button>
              ))}
            </nav>

            {modal && modal.type === 'clienteForm' && <ClienteFormModal {...shared} {...modal.props} />}
            {modal && modal.type === 'clienteDetail' && <ClienteDetailModal {...shared} {...modal.props} />}
            {modal && modal.type === 'pagoForm' && <PagoFormModal {...shared} {...modal.props} />}
            {modal && modal.type === 'productoForm' && <ProductoFormModal {...shared} {...modal.props} />}
            {modal && modal.type === 'importarClientes' && <ImportarClientesModal {...shared} {...modal.props} />}
            {modal && modal.type === 'importarProductos' && <ImportarProductosModal {...shared} {...modal.props} />}
            {modal && modal.type === 'stockHistorial' && <StockHistorialModal {...shared} {...modal.props} />}
            {modal && modal.type === 'pedidoForm' && <PedidoFormModal {...shared} {...modal.props} />}
            {modal && modal.type === 'pedidoDetail' && <PedidoDetailModal {...shared} {...modal.props} />}
            {modal && modal.type === 'pedidoImprimir' && <PedidoImprimirModal {...shared} {...modal.props} />}
            {modal && modal.type === 'empleadoForm' && <EmpleadoFormModal {...shared} {...modal.props} />}
            {modal && modal.type === 'empleadoDetail' && <EmpleadoDetailModal {...shared} {...modal.props} />}
            {modal && modal.type === 'confirm' && <ConfirmDialog {...modal.props} onCancel={closeModal} />}
            {modal && modal.type === 'ajustes' && (
              <AjustesModal
                negocio={negocio}
                onSave={guardarNegocio}
                onExport={exportarRespaldo}
                onImportClick={() => fileInputRef.current && fileInputRef.current.click()}
                onClose={closeModal}
                openModal={openModal}
              />
            )}
            {modal && modal.type === 'disenoRemito' && (
              <DisenoRemitoModal negocio={negocio} guardarPlantillaRemito={guardarPlantillaRemito} closeModal={closeModal} />
            )}
          </>
        )}
      </div>
      {printPedidoId && (
        <PrintOnly pedidoId={printPedidoId} pedidos={pedidos} clientes={clientes} negocio={negocio} />
      )}
    </>
  );
}

/* ---------------------------------- dashboard ---------------------------------- */

function DashboardView({ clientes, productos, empleados, pedidos, saldoCliente, ventasEmpleado, openModal, setTab }) {
  const hoyMes = todayISO().slice(0, 7);
  const ventasMes = pedidos.filter(p => p.estado !== 'cancelado' && p.fecha.slice(0, 7) === hoyMes).reduce((s, p) => s + p.total, 0);
  const deudaTotal = clientes.reduce((s, c) => s + Math.max(0, saldoCliente(c.id)), 0);
  const stockBajo = productos.filter(p => p.stock <= p.stockMinimo);
  const stockCerca = productos.filter(p => p.stock > p.stockMinimo && p.stock <= p.stockMinimo + MARGEN_CERCA_MINIMO);
  const pendientes = pedidos.filter(p => p.estado === 'pendiente');

  const ultimosPedidos = [...pedidos].sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 5);
  const clientesDeudores = clientes
    .map(c => ({ ...c, saldo: saldoCliente(c.id) }))
    .filter(c => c.saldo > 0)
    .sort((a, b) => b.saldo - a.saldo)
    .slice(0, 5);

  const ventasPorEmpleado = empleados
    .map(e => ({ ...e, total: ventasEmpleado(e.id) }))
    .filter(e => e.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);
  const maxVenta = Math.max(1, ...ventasPorEmpleado.map(e => e.total));

  const topClientesCompras = clientes
    .map(c => ({ ...c, total: pedidos.filter(p => p.clienteId === c.id && p.estado !== 'cancelado').reduce((s, p) => s + p.total, 0) }))
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const productosVendidosMap = {};
  pedidos.filter(p => p.estado !== 'cancelado').forEach(p => {
    p.items.forEach(it => {
      if (!productosVendidosMap[it.productoId]) productosVendidosMap[it.productoId] = { nombre: it.nombre, cantidad: 0, total: 0 };
      productosVendidosMap[it.productoId].cantidad += it.cantidad;
      productosVendidosMap[it.productoId].total += it.cantidad * it.precioUnitario;
    });
  });
  const topProductos = Object.values(productosVendidosMap).sort((a, b) => b.cantidad - a.cantidad).slice(0, 5);

  if (!clientes.length && !productos.length && !pedidos.length) {
    return (
      <EmptyState
        icon={Home}
        title="Bienvenido a tu panel"
        subtitle="Empeza cargando algunos productos y clientes para poder registrar tu primer pedido."
        actionLabel="Agregar producto"
        onAction={() => { setTab('stock'); openModal('productoForm'); }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={TrendingUp} label="Ventas del mes" value={money(ventasMes)} tone="var(--accent)" />
        <StatCard icon={DollarSign} label="Deuda total" value={money(deudaTotal)} tone="var(--rust)" />
        <StatCard icon={AlertTriangle} label="Stock bajo" value={stockBajo.length} tone="var(--amber)" />
        <StatCard icon={Clock} label="Pedidos pendientes" value={pendientes.length} tone="var(--ink)" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="display font-semibold text-sm" style={{ color: 'var(--ink)' }}>Ultimos pedidos</h3>
            <button onClick={() => setTab('pedidos')} className="text-xs font-medium flex items-center" style={{ color: 'var(--primary)' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          {ultimosPedidos.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: 'var(--ink-2)' }}>Todavia no hay pedidos.</p>
          ) : (
            <div>
              {ultimosPedidos.map(p => {
                const cliente = clientes.find(c => c.id === p.clienteId);
                const est = ESTADOS[p.estado];
                return (
                  <button key={p.id} onClick={() => openModal('pedidoDetail', { pedidoId: p.id })} className="list-row w-full flex items-center justify-between py-2.5 px-1 text-left">
                    <div>
                      <div className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{cliente ? cliente.nombre : 'Cliente eliminado'}</div>
                      <div className="text-xs mono" style={{ color: 'var(--ink-2)' }}>REM-{String(p.numero).padStart(4, '0')} · {fmtDate(p.fecha)}</div>
                    </div>
                    <div className="text-right">
                      <div className="mono text-sm font-semibold">{money(p.total)}</div>
                      <Pill bg={est.bg} fg={est.fg}>{est.label}</Pill>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="card rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="display font-semibold text-sm" style={{ color: 'var(--ink)' }}>Clientes con mayor deuda</h3>
            <button onClick={() => setTab('clientes')} className="text-xs font-medium flex items-center" style={{ color: 'var(--primary)' }}>
              Ver todos <ChevronRight size={14} />
            </button>
          </div>
          {clientesDeudores.length === 0 ? (
            <p className="text-sm py-6 text-center" style={{ color: 'var(--ink-2)' }}>Ningun cliente tiene deuda pendiente.</p>
          ) : (
            <div>
              {clientesDeudores.map(c => (
                <button key={c.id} onClick={() => openModal('clienteDetail', { clienteId: c.id })} className="list-row w-full flex items-center justify-between py-2.5 px-1 text-left">
                  <span className="text-sm font-medium" style={{ color: 'var(--ink)' }}>{c.nombre}</span>
                  <span className="mono text-sm font-semibold" style={{ color: 'var(--rust)' }}>{money(c.saldo)}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3 flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
            <Star size={15} style={{ color: 'var(--gold-2)' }} /> Mejores clientes (historico)
          </h3>
          {topClientesCompras.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: 'var(--ink-2)' }}>Todavia no hay ventas registradas.</p>
          ) : (
            <div>
              {topClientesCompras.map((c, i) => (
                <button key={c.id} onClick={() => openModal('clienteDetail', { clienteId: c.id })} className="list-row w-full flex items-center justify-between py-2.5 px-1 text-left">
                  <span className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--ink)' }}>
                    <span className="mono text-xs" style={{ color: 'var(--ink-2)' }}>#{i + 1}</span> {c.nombre}
                  </span>
                  <span className="mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>{money(c.total)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3 flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
            <Star size={15} style={{ color: 'var(--gold-2)' }} /> Productos mas vendidos
          </h3>
          {topProductos.length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: 'var(--ink-2)' }}>Todavia no hay ventas registradas.</p>
          ) : (
            <div>
              {topProductos.map((p, i) => (
                <div key={p.nombre + i} className="list-row flex items-center justify-between py-2.5 px-1">
                  <span className="text-sm font-medium flex items-center gap-2" style={{ color: 'var(--ink)' }}>
                    <span className="mono text-xs" style={{ color: 'var(--ink-2)' }}>#{i + 1}</span> {p.nombre}
                  </span>
                  <span className="mono text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>{p.cantidad} un.</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {ventasPorEmpleado.length > 0 && (
        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3" style={{ color: 'var(--ink)' }}>Ventas por vendedor</h3>
          <div className="space-y-2.5">
            {ventasPorEmpleado.map(e => (
              <div key={e.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium" style={{ color: 'var(--ink)' }}>{e.nombre}</span>
                  <span className="mono" style={{ color: 'var(--ink-2)' }}>{money(e.total)}</span>
                </div>
                <div className="h-2 rounded-full" style={{ background: 'var(--surface-alt)' }}>
                  <div className="h-2 rounded-full" style={{ width: `${(e.total / maxVenta) * 100}%`, background: 'var(--primary)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(stockBajo.length > 0 || stockCerca.length > 0) && (
        <div className="card rounded-xl p-4">
          {stockBajo.length > 0 && (
            <div className={stockCerca.length > 0 ? 'mb-4' : ''}>
              <h3 className="display font-semibold text-sm mb-3 flex items-center gap-1.5" style={{ color: 'var(--rust)' }}>
                <AlertTriangle size={16} /> Stock bajo
              </h3>
              <div className="flex flex-wrap gap-2">
                {stockBajo.map(p => (
                  <Pill key={p.id} bg="var(--rust-bg)" fg="var(--rust)">{p.nombre} · {p.stock} {p.unidad}</Pill>
                ))}
              </div>
            </div>
          )}
          {stockCerca.length > 0 && (
            <div>
              <h3 className="display font-semibold text-sm mb-3 flex items-center gap-1.5" style={{ color: 'var(--amber)' }}>
                <AlertTriangle size={16} /> Por agotarse pronto (a {MARGEN_CERCA_MINIMO} unidades o menos del minimo)
              </h3>
              <div className="flex flex-wrap gap-2">
                {stockCerca.map(p => (
                  <Pill key={p.id} bg="var(--amber-bg)" fg="var(--amber)">{p.nombre} · {p.stock} {p.unidad}</Pill>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- estadisticas ---------------------------------- */

function EstadisticasView({ clientes, empleados, pedidos }) {
  const activos = pedidos.filter(p => p.estado !== 'cancelado');
  const totalHistorico = activos.reduce((s, p) => s + p.total, 0);
  const cantidadPedidos = activos.length;
  const ticketPromedio = cantidadPedidos ? totalHistorico / cantidadPedidos : 0;
  const clientesConCompras = new Set(activos.map(p => p.clienteId)).size;

  const hace30 = new Date();
  hace30.setDate(hace30.getDate() - 30);
  const hace30ISO = hace30.toISOString().slice(0, 10);
  const porDiaMap = {};
  activos.filter(p => p.fecha >= hace30ISO).forEach(p => { porDiaMap[p.fecha] = (porDiaMap[p.fecha] || 0) + p.total; });
  const porDia = Object.entries(porDiaMap).sort((a, b) => b[0].localeCompare(a[0]));
  const maxDia = Math.max(1, ...porDia.map(([, v]) => v));

  const porMesMap = {};
  activos.forEach(p => { const mes = p.fecha.slice(0, 7); porMesMap[mes] = (porMesMap[mes] || 0) + p.total; });
  const porMes = Object.entries(porMesMap).sort((a, b) => b[0].localeCompare(a[0])).slice(0, 12);
  const maxMes = Math.max(1, ...porMes.map(([, v]) => v));

  const porCliente = clientes
    .map(c => {
      const propios = activos.filter(p => p.clienteId === c.id);
      return { ...c, total: propios.reduce((s, p) => s + p.total, 0), cantidad: propios.length };
    })
    .filter(c => c.total > 0)
    .sort((a, b) => b.total - a.total);
  const maxCliente = Math.max(1, ...porCliente.map(c => c.total));

  const porVendedor = empleados
    .map(e => {
      const propios = activos.filter(p => p.empleadoId === e.id);
      return { ...e, total: propios.reduce((s, p) => s + p.total, 0), cantidad: propios.length };
    })
    .filter(e => e.total > 0)
    .sort((a, b) => b.total - a.total);
  const maxVendedor = Math.max(1, ...porVendedor.map(e => e.total));

  const mesLabel = (ym) => {
    const [y, m] = ym.split('-');
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' });
  };

  if (activos.length === 0) {
    return <EmptyState icon={BarChart3} title="Todavia no hay ventas registradas" subtitle="Cuando cargues tus primeros pedidos, vas a ver las estadisticas del negocio aca." />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard icon={DollarSign} label="Total vendido" value={money(totalHistorico)} tone="var(--accent)" />
        <StatCard icon={Truck} label="Pedidos" value={cantidadPedidos} tone="var(--ink)" />
        <StatCard icon={BarChart3} label="Ticket promedio" value={money(ticketPromedio)} tone="var(--primary)" />
        <StatCard icon={Users} label="Clientes activos" value={clientesConCompras} tone="var(--ink)" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3" style={{ color: 'var(--ink)' }}>Ventas por dia (ultimos 30 dias)</h3>
          {porDia.length === 0 ? <p className="text-sm text-center py-6" style={{ color: 'var(--ink-2)' }}>Sin ventas en este periodo.</p> : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {porDia.map(([fecha, total]) => (
                <div key={fecha}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="mono" style={{ color: 'var(--ink-2)' }}>{fmtDate(fecha)}</span>
                    <span className="mono font-semibold" style={{ color: 'var(--ink)' }}>{money(total)}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-alt)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(total / maxDia) * 100}%`, background: 'var(--accent)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3" style={{ color: 'var(--ink)' }}>Ventas por mes</h3>
          {porMes.length === 0 ? <p className="text-sm text-center py-6" style={{ color: 'var(--ink-2)' }}>Sin ventas registradas.</p> : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {porMes.map(([mes, total]) => (
                <div key={mes}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="mono capitalize" style={{ color: 'var(--ink-2)' }}>{mesLabel(mes)}</span>
                    <span className="mono font-semibold" style={{ color: 'var(--ink)' }}>{money(total)}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-alt)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(total / maxMes) * 100}%`, background: 'var(--primary)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3" style={{ color: 'var(--ink)' }}>Ventas por cliente</h3>
          {porCliente.length === 0 ? <p className="text-sm text-center py-6" style={{ color: 'var(--ink-2)' }}>Sin ventas registradas.</p> : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {porCliente.map(c => (
                <div key={c.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium" style={{ color: 'var(--ink)' }}>{c.nombre} <span className="mono" style={{ color: 'var(--ink-2)' }}>({c.cantidad})</span></span>
                    <span className="mono font-semibold" style={{ color: 'var(--ink)' }}>{money(c.total)}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-alt)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(c.total / maxCliente) * 100}%`, background: 'var(--gold)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card rounded-xl p-4">
          <h3 className="display font-semibold text-sm mb-3" style={{ color: 'var(--ink)' }}>Ventas por vendedor</h3>
          {porVendedor.length === 0 ? <p className="text-sm text-center py-6" style={{ color: 'var(--ink-2)' }}>Sin ventas registradas.</p> : (
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {porVendedor.map(e => (
                <div key={e.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium" style={{ color: 'var(--ink)' }}>{e.nombre} <span className="mono" style={{ color: 'var(--ink-2)' }}>({e.cantidad})</span></span>
                    <span className="mono font-semibold" style={{ color: 'var(--ink)' }}>{money(e.total)}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'var(--surface-alt)' }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${(e.total / maxVendedor) * 100}%`, background: 'var(--accent)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- clientes ---------------------------------- */

function ClientesView({ clientes, saldoCliente, openModal }) {
  const [q, setQ] = useState('');
  const filtered = clientes.filter(c =>
    c.nombre.toLowerCase().includes(q.toLowerCase()) || (c.empresa || '').toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="sm:w-72"><SearchBox value={q} onChange={setQ} placeholder="Buscar cliente…" /></div>
        <div className="flex gap-2">
          <button onClick={() => openModal('importarClientes')} className="px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 justify-center" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
            <Upload size={16} /> Importar
          </button>
          <button onClick={() => openModal('clienteForm')} className="btn-primary px-4 py-2.5 rounded-lg text-sm flex items-center gap-1.5 justify-center">
            <Plus size={16} /> Nuevo cliente
          </button>
        </div>
      </div>

      {clientes.length === 0 ? (
        <EmptyState icon={Users} title="Sin clientes todavia" subtitle="Agrega tu primer cliente para empezar a registrar pedidos." actionLabel="Nuevo cliente" onAction={() => openModal('clienteForm')} />
      ) : filtered.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: 'var(--ink-2)' }}>No se encontraron clientes.</p>
      ) : (
        <div className="card rounded-xl">
          {filtered.map(c => {
            const saldo = saldoCliente(c.id);
            return (
              <button key={c.id} onClick={() => openModal('clienteDetail', { clienteId: c.id })} className="list-row w-full flex items-center justify-between px-4 py-3.5 text-left">
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>{c.nombre}</div>
                  <div className="text-xs truncate" style={{ color: 'var(--ink-2)' }}>{c.empresa || c.telefono || 'Sin datos adicionales'}</div>
                </div>
                <div className="text-right shrink-0 pl-3">
                  <div className="mono text-sm font-semibold" style={{ color: saldo > 0 ? 'var(--rust)' : 'var(--ink-2)' }}>
                    {saldo > 0 ? money(saldo) : saldo < 0 ? `A favor ${money(Math.abs(saldo))}` : 'Sin deuda'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function ClienteFormModal({ clienteId, saveCliente, deleteCliente, clientes, openModal, closeModal }) {
  const existing = clienteId ? clientes.find(c => c.id === clienteId) : null;
  const [form, setForm] = useState({
    nombre: existing ? existing.nombre : '',
    telefono: existing ? existing.telefono : '',
    direccion: existing ? existing.direccion : '',
    empresa: existing ? existing.empresa : '',
    notas: existing ? existing.notas : '',
  });
  const [error, setError] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) { setError('El nombre es obligatorio.'); return; }
    setError('');
    saveCliente({ id: existing ? existing.id : undefined, ...form, nombre: form.nombre.trim() });
  };

  return (
    <Modal title={existing ? 'Editar cliente' : 'Nuevo cliente'} onClose={closeModal}>
      <div>
        <Field label="Nombre" required>
          <input autoFocus className="field-input w-full px-3 py-2.5 rounded-lg" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Almacen Don Jose" />
        </Field>
        <Field label="Empresa / rubro">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.empresa} onChange={e => set('empresa', e.target.value)} placeholder="Opcional" />
        </Field>
        <Field label="Telefono">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="Opcional" />
        </Field>
        <Field label="Direccion">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.direccion} onChange={e => set('direccion', e.target.value)} placeholder="Opcional" />
        </Field>
        <Field label="Notas">
          <textarea className="field-textarea w-full px-3 py-2.5 rounded-lg" rows={2} value={form.notas} onChange={e => set('notas', e.target.value)} />
        </Field>
        {error && <p className="text-xs mb-3" style={{ color: 'var(--rust)' }}>{error}</p>}
        <div className="flex items-center justify-between pt-2">
          {existing ? (
            <button type="button" onClick={() => openModal('confirm', {
              title: 'Eliminar cliente', message: `¿Eliminar a ${existing.nombre}? Esta accion no se puede deshacer.`, confirmLabel: 'Eliminar', danger: true,
              onConfirm: () => deleteCliente(existing.id),
            })} className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--rust)' }}>
              <Trash2 size={15} /> Eliminar
            </button>
          ) : <span />}
          <button type="button" onClick={submit} className="btn-primary px-5 py-2.5 rounded-lg text-sm">Guardar</button>
        </div>
      </div>
    </Modal>
  );
}

function ImportarClientesModal({ importarClientesTexto, closeModal }) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const lineasValidas = texto.split('\n').map(l => l.trim()).filter(Boolean).length;

  const enviar = async () => {
    if (!texto.trim() || enviando) return;
    setEnviando(true);
    await importarClientesTexto(texto);
    setEnviando(false);
  };

  return (
    <Modal title="Importar clientes" subtitle="Un cliente por linea" onClose={closeModal} wide>
      <p className="text-sm mb-3" style={{ color: 'var(--ink-2)' }}>
        Pega tu lista, un cliente por renglon, separando los datos con comas:
      </p>
      <div className="rounded-lg px-3 py-2.5 mb-3 mono text-xs" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }}>
        Nombre, Telefono, Direccion, Empresa<br />
        Almacen Don Jose, 2344-111111, Rossi 123, <br />
        Kiosco Belgrano, , , 
      </div>
      <p className="text-xs mb-3" style={{ color: 'var(--ink-2)' }}>
        Solo el nombre es obligatorio — podes dejar los demas campos vacios, o cargar solo nombres, uno por linea.
      </p>
      <textarea
        className="field-textarea w-full px-3 py-2.5 rounded-lg mono text-sm"
        rows={10}
        placeholder={'Almacen Don Jose, 2344-111111\nKiosco Belgrano\nDespensa Ortega, , Mitre 456'}
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <div className="flex items-center justify-between pt-3">
        <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{lineasValidas} linea{lineasValidas !== 1 ? 's' : ''} lista{lineasValidas !== 1 ? 's' : ''}</span>
        <button type="button" onClick={enviar} disabled={!texto.trim() || enviando} className="btn-primary px-5 py-2.5 rounded-lg text-sm">
          {enviando ? 'Importando…' : 'Importar'}
        </button>
      </div>
    </Modal>
  );
}

function ClienteDetailModal({ clienteId, clientes, pedidos, pagos, saldoCliente, eliminarPago, openModal, closeModal }) {
  const cliente = clientes.find(c => c.id === clienteId);
  useEffect(() => { if (!cliente) closeModal(); }, [cliente]);
  if (!cliente) return null;
  const saldo = saldoCliente(cliente.id);
  const misPedidos = pedidos.filter(p => p.clienteId === cliente.id).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  const misPagos = pagos.filter(p => p.clienteId === cliente.id).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  return (
    <Modal title={cliente.nombre} subtitle={cliente.empresa} onClose={closeModal} wide>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {cliente.telefono && <Pill bg="var(--neutral-bg)" fg="var(--neutral-fg)"><Phone size={11} className="inline mr-1" />{cliente.telefono}</Pill>}
        {cliente.direccion && <Pill bg="var(--neutral-bg)" fg="var(--neutral-fg)"><MapPin size={11} className="inline mr-1" />{cliente.direccion}</Pill>}
        <button onClick={() => openModal('clienteForm', { clienteId: cliente.id })} className="ml-auto text-xs font-medium flex items-center gap-1" style={{ color: 'var(--primary)' }}>
          <Pencil size={13} /> Editar
        </button>
      </div>

      <div className="card rounded-xl p-4 mb-4 flex items-center justify-between flex-wrap gap-3" style={{ background: 'var(--surface-alt)' }}>
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>SALDO ACTUAL</div>
          <div className="mono text-xl font-bold" style={{ color: saldo > 0 ? 'var(--rust)' : 'var(--accent)' }}>
            {saldo > 0 ? money(saldo) : saldo < 0 ? `A favor ${money(Math.abs(saldo))}` : money(0)}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => openModal('pedidoForm', { clienteId: cliente.id, returnTo: 'clienteDetail', returnProps: { clienteId: cliente.id } })} className="px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5" style={{ background: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--border)' }}>
            <Plus size={15} /> Pedido
          </button>
          <button onClick={() => openModal('pagoForm', { clienteId: cliente.id })} className="btn-primary px-3.5 py-2 rounded-lg text-sm flex items-center gap-1.5">
            <DollarSign size={15} /> Registrar pago
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Pedidos ({misPedidos.length})</h4>
          {misPedidos.length === 0 ? <p className="text-sm" style={{ color: 'var(--ink-2)' }}>Sin pedidos.</p> : (
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {misPedidos.map(p => {
                const est = ESTADOS[p.estado];
                return (
                  <button key={p.id} onClick={() => openModal('pedidoDetail', { pedidoId: p.id, returnTo: 'clienteDetail', returnProps: { clienteId: cliente.id } })} className="w-full flex items-center justify-between text-left px-2.5 py-2 rounded-lg" style={{ background: 'var(--surface-alt)' }}>
                    <span className="text-xs mono" style={{ color: 'var(--ink-2)' }}>REM-{String(p.numero).padStart(4, '0')}<br />{fmtDate(p.fecha)}</span>
                    <span className="text-right">
                      <span className="block mono text-sm font-semibold">{money(p.total)}</span>
                      <Pill bg={est.bg} fg={est.fg}>{est.label}</Pill>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Pagos ({misPagos.length})</h4>
          {misPagos.length === 0 ? <p className="text-sm" style={{ color: 'var(--ink-2)' }}>Sin pagos registrados.</p> : (
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {misPagos.map(p => (
                <div key={p.id} className="flex items-center justify-between px-2.5 py-2 rounded-lg" style={{ background: 'var(--surface-alt)' }}>
                  <div className="text-xs" style={{ color: 'var(--ink-2)' }}>{fmtDate(p.fecha)} · {p.metodo}</div>
                  <div className="flex items-center gap-2.5">
                    <span className="mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>{money(p.monto)}</span>
                    <button onClick={() => openModal('confirm', {
                      title: 'Eliminar pago', message: '¿Eliminar este pago del historial?', confirmLabel: 'Eliminar', danger: true,
                      onConfirm: () => { eliminarPago(p.id); openModal('clienteDetail', { clienteId: cliente.id }); },
                    })} style={{ color: 'var(--rust)' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

function PagoFormModal({ clienteId, clientes, registrarPago, openModal }) {
  const cliente = clientes.find(c => c.id === clienteId);
  const [form, setForm] = useState({ monto: '', fecha: todayISO(), metodo: METODOS_PAGO[0], notas: '' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    const monto = parseFloat(form.monto);
    if (!monto || monto <= 0) return;
    registrarPago({ clienteId, monto, fecha: form.fecha, metodo: form.metodo, notas: form.notas });
    openModal('clienteDetail', { clienteId });
  };

  return (
    <Modal title="Registrar pago" subtitle={cliente ? cliente.nombre : ''} onClose={() => openModal('clienteDetail', { clienteId })}>
      <div>
        <Field label="Monto" required>
          <input autoFocus type="number" min="0" step="0.01" className="field-input w-full px-3 py-2.5 rounded-lg mono" value={form.monto} onChange={e => set('monto', e.target.value)} placeholder="0" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fecha" required>
            <input type="date" className="field-input w-full px-3 py-2.5 rounded-lg" value={form.fecha} onChange={e => set('fecha', e.target.value)} />
          </Field>
          <Field label="Metodo">
            <select className="field-select w-full px-3 py-2.5 rounded-lg" value={form.metodo} onChange={e => set('metodo', e.target.value)}>
              {METODOS_PAGO.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Notas">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.notas} onChange={e => set('notas', e.target.value)} placeholder="Opcional" />
        </Field>
        <div className="flex justify-end pt-2">
          <button type="button" onClick={submit} className="btn-primary px-5 py-2.5 rounded-lg text-sm">Registrar</button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------------------------- stock ---------------------------------- */

function StockInput({ producto, editarStockDirecto, color }) {
  const [valor, setValor] = useState(String(producto.stock));
  useEffect(() => { setValor(String(producto.stock)); }, [producto.stock]);
  const commit = () => {
    const n = parseFloat(valor);
    if (!isNaN(n) && n >= 0 && n !== producto.stock) editarStockDirecto(producto.id, n);
    else setValor(String(producto.stock));
  };
  return (
    <input
      type="number" min="0" step="0.01"
      className="field-input w-16 px-1.5 py-1 rounded-lg mono text-sm text-center"
      style={{ color }}
      value={valor}
      onChange={e => setValor(e.target.value)}
      onBlur={commit}
      onKeyDown={e => { if (e.key === 'Enter') e.target.blur(); }}
      onClick={e => e.stopPropagation()}
    />
  );
}

function StockView({ productos, openModal, ajustarStock, editarStockDirecto }) {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('todas');
  const categorias = ['todas', ...Array.from(new Set(productos.map(p => p.categoria).filter(Boolean)))];
  const filtered = productos.filter(p =>
    p.nombre.toLowerCase().includes(q.toLowerCase()) && (cat === 'todas' || p.categoria === cat)
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="sm:w-72"><SearchBox value={q} onChange={setQ} placeholder="Buscar producto…" /></div>
        <div className="flex gap-2">
          <button onClick={() => openModal('importarProductos')} className="px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 justify-center" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
            <Upload size={16} /> Importar
          </button>
          <button onClick={() => openModal('productoForm')} className="btn-primary px-4 py-2.5 rounded-lg text-sm flex items-center gap-1.5 justify-center">
            <Plus size={16} /> Nuevo producto
          </button>
        </div>
      </div>

      {categorias.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categorias.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{ background: cat === c ? 'var(--primary)' : 'var(--surface)', color: cat === c ? '#fff' : 'var(--ink-2)', border: '1px solid var(--border)' }}>
              {c === 'todas' ? 'Todas' : c}
            </button>
          ))}
        </div>
      )}

      {productos.length === 0 ? (
        <EmptyState icon={Package} title="Sin productos todavia" subtitle="Carga tu primer producto para poder armar pedidos." actionLabel="Nuevo producto" onAction={() => openModal('productoForm')} />
      ) : filtered.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: 'var(--ink-2)' }}>No se encontraron productos.</p>
      ) : (
        <div className="card rounded-xl">
          {filtered.map(p => {
            const bajo = p.stock <= p.stockMinimo;
            const cerca = !bajo && p.stock <= p.stockMinimo + MARGEN_CERCA_MINIMO;
            const colorStock = bajo ? 'var(--rust)' : cerca ? 'var(--amber)' : 'var(--ink)';
            return (
              <div key={p.id} className="list-row flex items-center justify-between px-4 py-3.5 gap-3">
                <button onClick={() => openModal('productoForm', { productoId: p.id })} className="min-w-0 text-left flex-1">
                  <div className="text-sm font-semibold truncate flex items-center gap-1.5" style={{ color: 'var(--ink)' }}>
                    {p.codigo && <span className="mono text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }}>{p.codigo}</span>}
                    {p.nombre}
                  </div>
                  <div className="text-xs flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--ink-2)' }}>
                    <span>{p.categoria || 'Sin categoria'} · {money(p.precio)} / {p.unidad}</span>
                    {bajo && <Pill bg="var(--rust-bg)" fg="var(--rust)">Stock bajo</Pill>}
                    {cerca && <Pill bg="var(--amber-bg)" fg="var(--amber)">Por agotarse</Pill>}
                  </div>
                </button>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => openModal('stockHistorial', { productoId: p.id })} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }} title="Ver historial">
                    <History size={14} />
                  </button>
                  <button onClick={() => ajustarStock(p.id, -1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }}><Minus size={14} /></button>
                  <StockInput producto={p} editarStockDirecto={editarStockDirecto} color={colorStock} />
                  <button onClick={() => ajustarStock(p.id, 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }}><Plus size={14} /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StockHistorialModal({ productoId, productos, cargarHistorialStock, closeModal }) {
  const producto = productos.find(p => p.id === productoId);
  const [movs, setMovs] = useState(null);

  useEffect(() => {
    let activo = true;
    cargarHistorialStock(productoId).then(data => { if (activo) setMovs(data); });
    return () => { activo = false; };
  }, [productoId]);

  return (
    <Modal title={producto ? `Historial de stock` : 'Historial de stock'} subtitle={producto ? producto.nombre : ''} onClose={closeModal}>
      {movs === null ? (
        <p className="text-sm text-center py-8" style={{ color: 'var(--ink-2)' }}>Cargando…</p>
      ) : movs.length === 0 ? (
        <p className="text-sm text-center py-8" style={{ color: 'var(--ink-2)' }}>Todavia no hay movimientos registrados para este producto.</p>
      ) : (
        <div className="space-y-1.5 max-h-96 overflow-y-auto">
          {movs.map(m => (
            <div key={m.id} className="list-row flex items-center justify-between px-2.5 py-2.5">
              <div>
                <div className="text-sm" style={{ color: 'var(--ink)' }}>{m.motivo || 'Ajuste'}</div>
                <div className="text-xs mono" style={{ color: 'var(--ink-2)' }}>{fmtDateHora(m.fecha)}</div>
              </div>
              <div className="text-right">
                <div className="mono text-sm font-semibold" style={{ color: m.delta > 0 ? 'var(--accent)' : 'var(--rust)' }}>
                  {m.delta > 0 ? '+' : ''}{m.delta}
                </div>
                <div className="text-xs mono" style={{ color: 'var(--ink-2)' }}>{m.cantidadAnterior} → {m.cantidadNueva}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

function ImportarProductosModal({ importarProductosTexto, closeModal }) {
  const [texto, setTexto] = useState('');
  const [enviando, setEnviando] = useState(false);
  const lineasValidas = texto.split('\n').map(l => l.trim()).filter(Boolean).length;

  const enviar = async () => {
    if (!texto.trim() || enviando) return;
    setEnviando(true);
    await importarProductosTexto(texto);
    setEnviando(false);
  };

  return (
    <Modal title="Importar productos" subtitle="Un producto por linea" onClose={closeModal} wide>
      <p className="text-sm mb-3" style={{ color: 'var(--ink-2)' }}>
        Pega tu lista, un producto por renglon, separando los datos con comas:
      </p>
      <div className="rounded-lg px-3 py-2.5 mb-3 mono text-xs" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }}>
        Nombre, Precio, Stock, Categoria, Unidad, Codigo<br />
        Aceite girasol 900ml, 2500, 40, Almacen, unidad, 10<br />
        Fideos 500g, 900, 100
      </div>
      <p className="text-xs mb-3" style={{ color: 'var(--ink-2)' }}>
        Nombre y precio son los importantes — el resto podes dejarlo vacio (stock arranca en 0, unidad en "unidad").
      </p>
      <textarea
        className="field-textarea w-full px-3 py-2.5 rounded-lg mono text-sm"
        rows={10}
        placeholder={'Aceite girasol 900ml, 2500, 40\nFideos 500g, 900, 100'}
        value={texto}
        onChange={e => setTexto(e.target.value)}
      />
      <div className="flex items-center justify-between pt-3">
        <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{lineasValidas} linea{lineasValidas !== 1 ? 's' : ''} lista{lineasValidas !== 1 ? 's' : ''}</span>
        <button type="button" onClick={enviar} disabled={!texto.trim() || enviando} className="btn-primary px-5 py-2.5 rounded-lg text-sm">
          {enviando ? 'Importando…' : 'Importar'}
        </button>
      </div>
    </Modal>
  );
}

function ProductoFormModal({ productoId, productos, saveProducto, deleteProducto, openModal, closeModal }) {
  const existing = productoId ? productos.find(p => p.id === productoId) : null;
  const [form, setForm] = useState({
    codigo: existing ? existing.codigo : '',
    nombre: existing ? existing.nombre : '',
    categoria: existing ? existing.categoria : '',
    precio: existing ? existing.precio : '',
    stock: existing ? existing.stock : '',
    stockMinimo: existing ? existing.stockMinimo : 5,
    unidad: existing ? existing.unidad : 'unidad',
  });
  const [error, setError] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) { setError('El nombre es obligatorio.'); return; }
    setError('');
    saveProducto({
      id: existing ? existing.id : undefined,
      codigo: (form.codigo || '').trim(),
      nombre: form.nombre.trim(),
      categoria: (form.categoria || '').trim(),
      precio: parseFloat(form.precio) || 0,
      stock: parseFloat(form.stock) || 0,
      stockMinimo: parseFloat(form.stockMinimo) || 0,
      unidad: form.unidad,
    });
  };

  return (
    <Modal title={existing ? 'Editar producto' : 'Nuevo producto'} onClose={closeModal}>
      <div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <Field label="Codigo">
              <input className="field-input w-full px-3 py-2.5 rounded-lg mono" value={form.codigo} onChange={e => set('codigo', e.target.value)} placeholder="Opcional" />
            </Field>
          </div>
          <div className="col-span-2">
            <Field label="Nombre" required>
              <input autoFocus className="field-input w-full px-3 py-2.5 rounded-lg" value={form.nombre} onChange={e => set('nombre', e.target.value)} placeholder="Aceite de girasol 900ml" />
            </Field>
          </div>
        </div>
        <Field label="Categoria">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.categoria} onChange={e => set('categoria', e.target.value)} placeholder="Almacen, bebidas, lacteos…" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Precio" required>
            <input type="number" min="0" step="0.01" className="field-input w-full px-3 py-2.5 rounded-lg mono" value={form.precio} onChange={e => set('precio', e.target.value)} placeholder="0" />
          </Field>
          <Field label="Unidad">
            <select className="field-select w-full px-3 py-2.5 rounded-lg" value={form.unidad} onChange={e => set('unidad', e.target.value)}>
              {UNIDADES.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Stock actual" required>
            <input type="number" min="0" step="0.01" className="field-input w-full px-3 py-2.5 rounded-lg mono" value={form.stock} onChange={e => set('stock', e.target.value)} placeholder="0" />
          </Field>
          <Field label="Stock minimo">
            <input type="number" min="0" step="0.01" className="field-input w-full px-3 py-2.5 rounded-lg mono" value={form.stockMinimo} onChange={e => set('stockMinimo', e.target.value)} />
          </Field>
        </div>
        {error && <p className="text-xs mb-3" style={{ color: 'var(--rust)' }}>{error}</p>}
        <div className="flex items-center justify-between pt-2">
          {existing ? (
            <button type="button" onClick={() => openModal('confirm', {
              title: 'Eliminar producto', message: `¿Eliminar ${existing.nombre}?`, confirmLabel: 'Eliminar', danger: true,
              onConfirm: () => deleteProducto(existing.id),
            })} className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--rust)' }}>
              <Trash2 size={15} /> Eliminar
            </button>
          ) : <span />}
          <button type="button" onClick={submit} className="btn-primary px-5 py-2.5 rounded-lg text-sm">Guardar</button>
        </div>
      </div>
    </Modal>
  );
}

/* ---------------------------------- pedidos ---------------------------------- */

function PedidoRow({ pedido, clientes, empleados, openModal }) {
  const cliente = clientes.find(c => c.id === pedido.clienteId);
  const empleado = empleados.find(e => e.id === pedido.empleadoId);
  const est = ESTADOS[pedido.estado];
  return (
    <button onClick={() => openModal('pedidoDetail', { pedidoId: pedido.id })} className="list-row w-full flex items-center justify-between px-4 py-3.5 text-left">
      <div className="min-w-0">
        <div className="text-sm font-semibold truncate" style={{ color: 'var(--ink)' }}>{cliente ? cliente.nombre : 'Cliente eliminado'}</div>
        <div className="text-xs mono" style={{ color: 'var(--ink-2)' }}>REM-{String(pedido.numero).padStart(4, '0')} · {fmtDate(pedido.fecha)}{empleado ? ` · ${empleado.nombre}` : ''}</div>
      </div>
      <div className="text-right shrink-0 pl-3">
        <div className="mono text-sm font-semibold mb-1">{money(pedido.total)}</div>
        <Pill bg={est.bg} fg={est.fg}>{est.label}</Pill>
      </div>
    </button>
  );
}

function PedidosView({ pedidos, clientes, empleados, openModal, role, currentVendedorId }) {
  const [q, setQ] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState('todos');
  const [vista, setVista] = useState('lista');

  const basePedidos = role === 'vendedor' ? pedidos.filter(p => p.empleadoId === currentVendedorId) : pedidos;

  const filtered = basePedidos
    .filter(p => estadoFiltro === 'todos' || p.estado === estadoFiltro)
    .filter(p => {
      const cliente = clientes.find(c => c.id === p.clienteId);
      const texto = `${cliente ? cliente.nombre : ''} ${p.numero}`.toLowerCase();
      return texto.includes(q.toLowerCase());
    })
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1));

  const porDiaMap = {};
  filtered.forEach(p => {
    if (!porDiaMap[p.fecha]) porDiaMap[p.fecha] = [];
    porDiaMap[p.fecha].push(p);
  });
  const dias = Object.keys(porDiaMap).sort((a, b) => b.localeCompare(a));

  const hoyMes = todayISO().slice(0, 7);
  const misVentasMes = basePedidos.filter(p => p.estado !== 'cancelado' && p.fecha.slice(0, 7) === hoyMes).reduce((s, p) => s + p.total, 0);

  return (
    <div className="space-y-4">
      {role === 'vendedor' && (
        <div className="card rounded-xl p-4 flex items-center justify-between">
          <span className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>Tus ventas del mes</span>
          <span className="mono text-lg font-bold" style={{ color: 'var(--accent)' }}>{money(misVentasMes)}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="sm:w-72"><SearchBox value={q} onChange={setQ} placeholder="Buscar por cliente o N de pedido…" /></div>
        <button onClick={() => openModal('pedidoForm')} className="btn-primary px-4 py-2.5 rounded-lg text-sm flex items-center gap-1.5 justify-center">
          <Plus size={16} /> Nuevo pedido
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {['todos', 'pendiente', 'entregado', 'cancelado'].map(e => (
            <button key={e} onClick={() => setEstadoFiltro(e)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{ background: estadoFiltro === e ? 'var(--primary)' : 'var(--surface)', color: estadoFiltro === e ? '#fff' : 'var(--ink-2)', border: '1px solid var(--border)' }}>
              {e === 'todos' ? 'Todos' : ESTADOS[e].label}
            </button>
          ))}
        </div>
        <div className="flex rounded-lg overflow-hidden shrink-0" style={{ border: '1px solid var(--border)' }}>
          <button onClick={() => setVista('lista')} className="px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5" style={{ background: vista === 'lista' ? 'var(--primary)' : 'var(--surface)', color: vista === 'lista' ? '#fff' : 'var(--ink-2)' }}>
            <ListChecks size={13} /> Lista
          </button>
          <button onClick={() => setVista('dia')} className="px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5" style={{ background: vista === 'dia' ? 'var(--primary)' : 'var(--surface)', color: vista === 'dia' ? '#fff' : 'var(--ink-2)' }}>
            <Calendar size={13} /> Por dia
          </button>
        </div>
      </div>

      {basePedidos.length === 0 ? (
        <EmptyState icon={Truck} title="Sin pedidos todavia" subtitle="Crea tu primer pedido para empezar a vender." actionLabel="Nuevo pedido" onAction={() => openModal('pedidoForm')} />
      ) : filtered.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: 'var(--ink-2)' }}>No se encontraron pedidos.</p>
      ) : vista === 'lista' ? (
        <div className="card rounded-xl">
          {filtered.map(p => <PedidoRow key={p.id} pedido={p} clientes={clientes} empleados={empleados} openModal={openModal} />)}
        </div>
      ) : (
        <div className="space-y-4">
          {dias.map(dia => {
            const pedidosDelDia = porDiaMap[dia];
            const totalDia = pedidosDelDia.filter(p => p.estado !== 'cancelado').reduce((s, p) => s + p.total, 0);
            return (
              <div key={dia}>
                <div className="flex items-center justify-between mb-2 px-1">
                  <h3 className="display font-semibold text-sm" style={{ color: 'var(--ink)' }}>{fmtDate(dia)}</h3>
                  <span className="mono text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>{pedidosDelDia.length} pedido{pedidosDelDia.length !== 1 ? 's' : ''} · {money(totalDia)}</span>
                </div>
                <div className="card rounded-xl">
                  {pedidosDelDia.map(p => <PedidoRow key={p.id} pedido={p} clientes={clientes} empleados={empleados} openModal={openModal} />)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PedidoFormModal({ clientes, productos, empleados, pedidos, crearPedido, editarPedido, openModal, closeModal, setTab, clienteId, pedidoId, returnTo, returnProps, role, currentVendedorId }) {
  const editing = pedidoId ? pedidos.find(p => p.id === pedidoId) : null;

  const [selCliente, setSelCliente] = useState(editing ? editing.clienteId : (clienteId || ''));
  const [empleadoId, setEmpleadoId] = useState(editing ? (editing.empleadoId || '') : (role === 'vendedor' ? currentVendedorId : ''));
  const [fecha, setFecha] = useState(editing ? editing.fecha : todayISO());
  const [notas, setNotas] = useState(editing ? editing.notas : '');
  const [buscadorCliente, setBuscadorCliente] = useState('');
  const [buscador, setBuscador] = useState('');

  const cantidadOriginal = {};
  if (editing) editing.items.forEach(it => { cantidadOriginal[it.productoId] = it.cantidad; });
  const stockDisponibleDe = (producto) => producto.stock + (cantidadOriginal[producto.id] || 0);

  const [items, setItems] = useState(() => {
    if (!editing) return [];
    return editing.items.map(it => {
      const prod = productos.find(p => p.id === it.productoId);
      return {
        productoId: it.productoId, nombre: it.nombre, codigo: it.codigo || '',
        unidad: prod ? prod.unidad : '', precioUnitario: it.precioUnitario, cantidad: it.cantidad,
        stockDisponible: prod ? stockDisponibleDe(prod) : it.cantidad,
      };
    });
  });

  const goBack = () => (returnTo ? openModal(returnTo, returnProps) : closeModal());
  const titulo = editing ? `Editar REM-${String(editing.numero).padStart(4, '0')}` : 'Nuevo pedido';

  if (clientes.length === 0) {
    return (
      <Modal title={titulo} onClose={closeModal}>
        <EmptyState icon={Users} title="Todavia no hay clientes cargados" subtitle="Pedile al administrador que cargue el primer cliente." actionLabel={role === 'admin' ? 'Ir a clientes' : undefined} onAction={role === 'admin' ? () => { closeModal(); setTab('clientes'); } : undefined} />
      </Modal>
    );
  }
  if (productos.length === 0) {
    return (
      <Modal title={titulo} onClose={closeModal}>
        <EmptyState icon={Package} title="Todavia no hay productos cargados" subtitle="Pedile al administrador que cargue el primer producto." actionLabel={role === 'admin' ? 'Ir a stock' : undefined} onAction={role === 'admin' ? () => { closeModal(); setTab('stock'); } : undefined} />
      </Modal>
    );
  }

  const clienteSeleccionado = clientes.find(c => c.id === selCliente);
  const clientesFiltrados = clientes.filter(c => c.nombre.toLowerCase().includes(buscadorCliente.toLowerCase())).slice(0, 6);

  const disponibles = productos.filter(p =>
    p.nombre.toLowerCase().includes(buscador.toLowerCase()) &&
    !items.some(it => it.productoId === p.id)
  ).slice(0, 6);

  const addItem = (p) => {
    setItems(list => [...list, { productoId: p.id, nombre: p.nombre, codigo: p.codigo || '', unidad: p.unidad, precioUnitario: p.precio, cantidad: 1, stockDisponible: stockDisponibleDe(p) }]);
    setBuscador('');
  };
  const removeItem = (productoId) => setItems(list => list.filter(it => it.productoId !== productoId));
  const setCantidad = (productoId, cantidad) => setItems(list => list.map(it => it.productoId === productoId ? { ...it, cantidad } : it));

  const total = items.reduce((s, it) => s + (parseFloat(it.cantidad) || 0) * it.precioUnitario, 0);
  const hayExcesos = items.some(it => (parseFloat(it.cantidad) || 0) > it.stockDisponible);
  const hayCantidadInvalida = items.some(it => !(parseFloat(it.cantidad) > 0));

  let motivoBloqueo = '';
  if (!selCliente) motivoBloqueo = 'Elegi un cliente para poder guardar.';
  else if (items.length === 0) motivoBloqueo = 'Agrega al menos un producto.';
  else if (hayCantidadInvalida) motivoBloqueo = 'Revisa las cantidades cargadas.';
  else if (hayExcesos) motivoBloqueo = 'Hay productos con stock insuficiente.';

  const submit = (e) => {
    e.preventDefault();
    if (!selCliente || items.length === 0 || hayExcesos || hayCantidadInvalida) return;
    const payload = {
      clienteId: selCliente, empleadoId,
      fecha,
      items: items.map(it => ({ productoId: it.productoId, nombre: it.nombre, codigo: it.codigo, cantidad: parseFloat(it.cantidad) || 0, precioUnitario: it.precioUnitario })),
      notas,
    };
    if (editing) editarPedido(editing.id, payload);
    else crearPedido(payload);
    if (returnTo) openModal(returnTo, returnProps);
  };

  return (
    <Modal title={titulo} onClose={goBack} wide>
      <div>
        <Field label="Cliente" required>
          {clienteSeleccionado ? (
            <div className="field-input w-full px-3 py-2.5 rounded-lg flex items-center justify-between">
              <span style={{ color: 'var(--ink)' }}>{clienteSeleccionado.nombre}</span>
              <button type="button" onClick={() => { setSelCliente(''); setBuscadorCliente(''); }} style={{ color: 'var(--rust)' }}><X size={16} /></button>
            </div>
          ) : (
            <div>
              <SearchBox value={buscadorCliente} onChange={setBuscadorCliente} placeholder="Buscar cliente por nombre…" />
              {buscadorCliente && (
                <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
                  {clientesFiltrados.length === 0 ? (
                    <p className="text-xs px-3 py-2.5" style={{ color: 'var(--ink-2)' }}>Sin resultados.</p>
                  ) : clientesFiltrados.map(c => (
                    <button type="button" key={c.id} onClick={() => { setSelCliente(c.id); setBuscadorCliente(''); }} className="list-row w-full text-left px-3 py-2.5 text-sm" style={{ color: 'var(--ink)' }}>
                      {c.nombre}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </Field>

        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Vendedor">
            {role === 'vendedor' ? (
              <div className="field-input w-full px-3 py-2.5 rounded-lg" style={{ color: 'var(--ink-2)' }}>
                {(empleados.find(e => e.id === currentVendedorId) || {}).nombre || 'Vos'}
              </div>
            ) : (
              <select className="field-select w-full px-3 py-2.5 rounded-lg" value={empleadoId} onChange={e => setEmpleadoId(e.target.value)}>
                <option value="">Sin asignar</option>
                {empleados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
              </select>
            )}
          </Field>
          <Field label="Fecha" required>
            <input type="date" className="field-input w-full px-3 py-2.5 rounded-lg" value={fecha} onChange={e => setFecha(e.target.value)} />
          </Field>
        </div>

        <div className="mb-4">
          <span className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--ink-2)' }}>Agregar productos</span>
          <SearchBox value={buscador} onChange={setBuscador} placeholder="Buscar producto por nombre…" />
          {buscador && (
            <div className="mt-2 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              {disponibles.length === 0 ? (
                <p className="text-xs px-3 py-2.5" style={{ color: 'var(--ink-2)' }}>Sin resultados.</p>
              ) : disponibles.map(p => (
                <button type="button" key={p.id} onClick={() => addItem(p)} className="list-row w-full flex items-center justify-between px-3 py-2.5 text-left">
                  <span className="text-sm" style={{ color: 'var(--ink)' }}>{p.nombre}</span>
                  <span className="text-xs mono" style={{ color: 'var(--ink-2)' }}>{money(p.precio)} · stock {stockDisponibleDe(p)}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="mb-4 space-y-2">
            {items.map(it => {
              const cantidadNum = parseFloat(it.cantidad) || 0;
              const excede = cantidadNum > it.stockDisponible;
              const restante = Math.round((it.stockDisponible - cantidadNum) * 100) / 100;
              return (
                <div key={it.productoId} className="rounded-lg p-3" style={{ background: 'var(--surface-alt)' }}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium flex-1 min-w-0 truncate" style={{ color: 'var(--ink)' }}>{it.nombre}</span>
                    <input type="number" min="0.01" step="0.01" value={it.cantidad}
                      onChange={e => setCantidad(it.productoId, e.target.value)}
                      className="field-input w-20 px-2 py-1.5 rounded-lg mono text-sm text-center" />
                    <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{it.unidad}</span>
                    <span className="mono text-sm font-semibold w-20 text-right">{money(cantidadNum * it.precioUnitario)}</span>
                    <button type="button" onClick={() => removeItem(it.productoId)} style={{ color: 'var(--rust)' }}><X size={16} /></button>
                  </div>
                  {excede ? (
                    <p className="text-xs mt-1" style={{ color: 'var(--rust)' }}>Stock insuficiente (disponible: {it.stockDisponible} {it.unidad})</p>
                  ) : (
                    <p className="text-xs mt-1" style={{ color: 'var(--ink-2)' }}>Quedan {restante} {it.unidad} en stock</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <Field label="Notas">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={notas} onChange={e => setNotas(e.target.value)} placeholder="Opcional" />
        </Field>

        <div className="ticket-divider my-4" />

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>TOTAL</div>
            <div className="mono text-2xl font-bold" style={{ color: 'var(--ink)' }}>{money(total)}</div>
          </div>
          <div className="text-right">
            <button type="button" onClick={submit} disabled={!selCliente || items.length === 0 || hayExcesos || hayCantidadInvalida} className="btn-primary px-6 py-3 rounded-lg text-sm">
              {editing ? 'Guardar cambios' : 'Guardar pedido'}
            </button>
            {motivoBloqueo && <p className="text-xs mt-1.5" style={{ color: 'var(--ink-2)' }}>{motivoBloqueo}</p>}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function PedidoDetailModal({ pedidoId, pedidos, clientes, empleados, cambiarEstadoPedido, eliminarPedido, openModal, closeModal, returnTo, returnProps }) {
  const pedido = pedidos.find(p => p.id === pedidoId);
  const goBack = () => (returnTo ? openModal(returnTo, returnProps) : closeModal());
  useEffect(() => { if (!pedido) closeModal(); }, [pedido]);
  if (!pedido) return null;
  const cliente = clientes.find(c => c.id === pedido.clienteId);
  const empleado = empleados.find(e => e.id === pedido.empleadoId);
  const est = ESTADOS[pedido.estado];

  return (
    <Modal title={`REM-${String(pedido.numero).padStart(4, '0')}`} subtitle={fmtDate(pedido.fecha)} onClose={goBack}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{cliente ? cliente.nombre : 'Cliente eliminado'}</div>
          <div className="text-xs" style={{ color: 'var(--ink-2)' }}>{empleado ? `Vendedor: ${empleado.nombre}` : 'Sin vendedor asignado'}</div>
        </div>
        <span className="stamp text-xs font-semibold px-2 py-1 rounded" style={{ color: est.fg }}>{est.label}</span>
      </div>

      <div className="rounded-lg mb-4" style={{ border: '1px solid var(--border)' }}>
        {pedido.items.map((it, i) => (
          <div key={i} className="list-row flex items-center justify-between px-3 py-2.5">
            <span className="text-sm" style={{ color: 'var(--ink)' }}>{it.nombre} <span className="mono text-xs" style={{ color: 'var(--ink-2)' }}>×{it.cantidad}</span></span>
            <span className="mono text-sm font-medium">{money(it.cantidad * it.precioUnitario)}</span>
          </div>
        ))}
      </div>

      <div className="ticket-divider mb-4" />
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>TOTAL</span>
        <span className="mono text-xl font-bold">{money(pedido.total)}</span>
      </div>

      {pedido.notas && <p className="text-sm mb-5 px-3 py-2 rounded-lg" style={{ background: 'var(--surface-alt)', color: 'var(--ink-2)' }}>{pedido.notas}</p>}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => openModal('pedidoImprimir', { pedidoId: pedido.id })} className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5" style={{ background: 'var(--surface-alt)', color: 'var(--primary)' }}>
          <Printer size={16} /> Imprimir remito
        </button>
        {pedido.estado === 'pendiente' && (
          <button onClick={() => openModal('pedidoForm', { pedidoId: pedido.id, returnTo: 'pedidoDetail', returnProps: { pedidoId: pedido.id } })} className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5" style={{ background: 'var(--surface-alt)', color: 'var(--primary)' }}>
            <Pencil size={16} /> Editar pedido
          </button>
        )}
        {pedido.estado === 'pendiente' && (
          <button onClick={() => cambiarEstadoPedido(pedido.id, 'entregado')} className="btn-primary px-4 py-2 rounded-lg text-sm flex items-center gap-1.5">
            <CheckCircle2 size={16} /> Marcar entregado
          </button>
        )}
        {pedido.estado !== 'cancelado' && (
          <button onClick={() => openModal('confirm', {
            title: 'Cancelar pedido', message: 'El stock de los productos se va a restituir. ¿Confirmas?', confirmLabel: 'Cancelar pedido', danger: true,
            onConfirm: () => { cambiarEstadoPedido(pedido.id, 'cancelado'); goBack(); },
          })} className="px-4 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--surface-alt)', color: 'var(--rust)' }}>
            Cancelar pedido
          </button>
        )}
        <button onClick={() => openModal('confirm', {
          title: 'Eliminar pedido', message: 'Se eliminara por completo el registro del pedido.', confirmLabel: 'Eliminar', danger: true,
          onConfirm: () => eliminarPedido(pedido.id),
        })} className="ml-auto text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--rust)' }}>
          <Trash2 size={15} /> Eliminar
        </button>
      </div>
    </Modal>
  );
}

/* ---------------------------------- empleados ---------------------------------- */

function EmpleadosView({ empleados, ventasEmpleado, pedidos, openModal }) {
  const [q, setQ] = useState('');
  const filtered = empleados.filter(e => e.nombre.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="sm:w-72"><SearchBox value={q} onChange={setQ} placeholder="Buscar vendedor…" /></div>
        <button onClick={() => openModal('empleadoForm')} className="btn-primary px-4 py-2.5 rounded-lg text-sm flex items-center gap-1.5 justify-center">
          <Plus size={16} /> Nuevo vendedor
        </button>
      </div>

      {empleados.length === 0 ? (
        <EmptyState icon={UserCog} title="Sin vendedores cargados" subtitle="Agrega a las personas que toman pedidos para llevar un control de sus ventas y darles acceso a la app." actionLabel="Nuevo vendedor" onAction={() => openModal('empleadoForm')} />
      ) : filtered.length === 0 ? (
        <p className="text-sm text-center py-10" style={{ color: 'var(--ink-2)' }}>No se encontraron vendedores.</p>
      ) : (
        <div className="card rounded-xl">
          {filtered.map(e => {
            const total = ventasEmpleado(e.id);
            const cantidad = pedidos.filter(p => p.empleadoId === e.id && p.estado !== 'cancelado').length;
            return (
              <button key={e.id} onClick={() => openModal('empleadoDetail', { empleadoId: e.id })} className="list-row w-full flex items-center justify-between px-4 py-3.5 text-left">
                <div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>{e.nombre}</div>
                  <div className="text-xs" style={{ color: 'var(--ink-2)' }}>{cantidad} pedido{cantidad !== 1 ? 's' : ''}</div>
                </div>
                <span className="mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>{money(total)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmpleadoFormModal({ empleadoId, empleados, saveEmpleado, deleteEmpleado, resetEmpleadoPin, openModal, closeModal }) {
  const existing = empleadoId ? empleados.find(e => e.id === empleadoId) : null;
  const [form, setForm] = useState({
    nombre: existing ? existing.nombre : '',
    telefono: existing ? existing.telefono : '',
    email: existing ? existing.email : '',
  });
  const [error, setError] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim()) { setError('El nombre es obligatorio.'); return; }
    setError('');
    saveEmpleado({ id: existing ? existing.id : undefined, ...form, nombre: form.nombre.trim() });
  };

  return (
    <Modal title={existing ? 'Editar vendedor' : 'Nuevo vendedor'} onClose={closeModal}>
      <div>
        <Field label="Nombre" required>
          <input autoFocus className="field-input w-full px-3 py-2.5 rounded-lg" value={form.nombre} onChange={e => set('nombre', e.target.value)} />
        </Field>
        <Field label="Telefono">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.telefono} onChange={e => set('telefono', e.target.value)} placeholder="Opcional" />
        </Field>
        <Field label="Email">
          <input type="email" className="field-input w-full px-3 py-2.5 rounded-lg" value={form.email} onChange={e => set('email', e.target.value)} placeholder="Opcional" />
        </Field>
        <p className="text-xs mb-2" style={{ color: 'var(--ink-2)' }}>Este vendedor va a poder entrar a la app eligiendo su nombre. La primera vez le va a pedir crear su propio PIN, y solo va a poder cargar y gestionar sus propios pedidos.</p>
        {existing && existing.pin && (
          <button type="button" onClick={() => openModal('confirm', {
            title: 'Restablecer PIN', message: `${existing.nombre} va a tener que crear un PIN nuevo la proxima vez que entre.`, confirmLabel: 'Restablecer', danger: true,
            onConfirm: () => { resetEmpleadoPin(existing.id); openModal('empleadoForm', { empleadoId: existing.id }); },
          })} className="text-xs font-medium mb-4" style={{ color: 'var(--primary)' }}>
            Restablecer PIN de este vendedor
          </button>
        )}
        {error && <p className="text-xs mb-3" style={{ color: 'var(--rust)' }}>{error}</p>}
        <div className="flex items-center justify-between pt-2">
          {existing ? (
            <button type="button" onClick={() => openModal('confirm', {
              title: 'Eliminar vendedor', message: `¿Eliminar a ${existing.nombre}?`, confirmLabel: 'Eliminar', danger: true,
              onConfirm: () => deleteEmpleado(existing.id),
            })} className="text-sm font-medium flex items-center gap-1.5" style={{ color: 'var(--rust)' }}>
              <Trash2 size={15} /> Eliminar
            </button>
          ) : <span />}
          <button type="button" onClick={submit} className="btn-primary px-5 py-2.5 rounded-lg text-sm">Guardar</button>
        </div>
      </div>
    </Modal>
  );
}

function EmpleadoDetailModal({ empleadoId, empleados, pedidos, clientes, ventasEmpleado, openModal, closeModal }) {
  const empleado = empleados.find(e => e.id === empleadoId);
  useEffect(() => { if (!empleado) closeModal(); }, [empleado]);
  if (!empleado) return null;
  const misPedidos = pedidos.filter(p => p.empleadoId === empleado.id).sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  const total = ventasEmpleado(empleado.id);

  return (
    <Modal title={empleado.nombre} onClose={closeModal}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-xs" style={{ color: 'var(--ink-2)' }}>{empleado.telefono || 'Sin telefono'}</div>
        <button onClick={() => openModal('empleadoForm', { empleadoId: empleado.id })} className="text-xs font-medium flex items-center gap-1" style={{ color: 'var(--primary)' }}>
          <Pencil size={13} /> Editar
        </button>
      </div>
      <div className="card rounded-xl p-4 mb-4" style={{ background: 'var(--surface-alt)' }}>
        <div className="text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>TOTAL VENDIDO</div>
        <div className="mono text-xl font-bold" style={{ color: 'var(--accent)' }}>{money(total)}</div>
      </div>
      <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Pedidos ({misPedidos.length})</h4>
      {misPedidos.length === 0 ? <p className="text-sm" style={{ color: 'var(--ink-2)' }}>Sin pedidos.</p> : (
        <div className="space-y-1.5 max-h-72 overflow-y-auto">
          {misPedidos.map(p => {
            const cliente = clientes.find(c => c.id === p.clienteId);
            const est = ESTADOS[p.estado];
            return (
              <button key={p.id} onClick={() => openModal('pedidoDetail', { pedidoId: p.id, returnTo: 'empleadoDetail', returnProps: { empleadoId: empleado.id } })} className="w-full flex items-center justify-between text-left px-2.5 py-2 rounded-lg" style={{ background: 'var(--surface-alt)' }}>
                <span className="text-xs" style={{ color: 'var(--ink-2)' }}>{cliente ? cliente.nombre : 'Cliente eliminado'}<br /><span className="mono">{fmtDate(p.fecha)}</span></span>
                <span className="text-right">
                  <span className="block mono text-sm font-semibold">{money(p.total)}</span>
                  <Pill bg={est.bg} fg={est.fg}>{est.label}</Pill>
                </span>
              </button>
            );
          })}
        </div>
      )}
    </Modal>
  );
}

/* ---------------------------------- ajustes ---------------------------------- */

function AjustesModal({ negocio, onSave, onExport, onImportClick, onClose, openModal }) {
  const [form, setForm] = useState({
    nombre: negocio.nombre, direccion: negocio.direccion, telefono: negocio.telefono,
    alias: negocio.alias, instagram: negocio.instagram,
  });
  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pinMsg, setPinMsg] = useState('');
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const guardarDatos = () => {
    onSave({
      nombre: form.nombre.trim() || 'Mi Distribuidora',
      direccion: form.direccion,
      telefono: form.telefono,
      alias: form.alias,
      instagram: form.instagram,
    });
  };

  const cambiarPin = () => {
    if (pin1.length < 4) { setPinMsg('El PIN debe tener al menos 4 digitos.'); return; }
    if (pin1 !== pin2) { setPinMsg('Los PIN no coinciden.'); return; }
    onSave({ pin: pin1 });
    setPinMsg('PIN actualizado.');
    setPin1(''); setPin2('');
  };

  return (
    <Modal title="Ajustes" onClose={onClose} wide>
      <h4 className="text-xs font-semibold mb-3 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Datos para el remito</h4>
      <div className="grid sm:grid-cols-2 gap-x-3">
        <Field label="Nombre del negocio">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.nombre} onChange={e => set('nombre', e.target.value)} onBlur={guardarDatos} />
        </Field>
        <Field label="Telefono">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.telefono} onChange={e => set('telefono', e.target.value)} onBlur={guardarDatos} />
        </Field>
        <Field label="Direccion">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.direccion} onChange={e => set('direccion', e.target.value)} onBlur={guardarDatos} />
        </Field>
        <Field label="Alias">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.alias} onChange={e => set('alias', e.target.value)} onBlur={guardarDatos} />
        </Field>
        <Field label="Instagram">
          <input className="field-input w-full px-3 py-2.5 rounded-lg" value={form.instagram} onChange={e => set('instagram', e.target.value)} onBlur={guardarDatos} />
        </Field>
      </div>

      <div className="ticket-divider my-4" />
      <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>PIN de administrador</h4>
      <div className="grid sm:grid-cols-2 gap-3 mb-2">
        <input type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" autoCorrect="off" spellCheck="false" className="field-input w-full px-3 py-2.5 rounded-lg mono" placeholder="Nuevo PIN" value={pin1} onChange={e => setPin1(e.target.value.replace(/\D/g, ''))} maxLength={6} />
        <input type="text" inputMode="numeric" pattern="[0-9]*" autoComplete="off" autoCorrect="off" spellCheck="false" className="field-input w-full px-3 py-2.5 rounded-lg mono" placeholder="Repetir PIN" value={pin2} onChange={e => setPin2(e.target.value.replace(/\D/g, ''))} maxLength={6} />
      </div>
      {pinMsg && <p className="text-xs mb-2" style={{ color: pinMsg.includes('actualizado') ? 'var(--accent)' : 'var(--rust)' }}>{pinMsg}</p>}
      <button type="button" onClick={cambiarPin} className="px-3.5 py-2 rounded-lg text-sm font-semibold" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
        Cambiar PIN
      </button>

      <div className="ticket-divider my-4" />
      <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Diseno del remito</h4>
      <p className="text-sm mb-3" style={{ color: 'var(--ink-2)' }}>Elegi que se imprime, en que orden, y con que textos.</p>
      <button type="button" onClick={() => openModal('disenoRemito')} className="px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
        <Pencil size={15} /> Disenar remito
      </button>

      <div className="ticket-divider my-4" />
      <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Copia de seguridad</h4>
      <p className="text-sm mb-3" style={{ color: 'var(--ink-2)' }}>Descarga un archivo con todos tus datos, o restaura uno anterior.</p>
      <div className="flex gap-2">
        <button onClick={onExport} className="flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
          <Download size={15} /> Descargar
        </button>
        <button onClick={onImportClick} className="flex-1 px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5" style={{ background: 'var(--surface-alt)', color: 'var(--ink)' }}>
          <Upload size={15} /> Restaurar
        </button>
      </div>
    </Modal>
  );
}

/* ---------------------------------- diseno del remito ---------------------------------- */

function DisenoRemitoModal({ negocio, guardarPlantillaRemito, closeModal }) {
  const [plantilla, setPlantilla] = useState(() => {
    const base = negocio.plantillaRemito || DEFAULT_PLANTILLA;
    return JSON.parse(JSON.stringify(base));
  });
  const [guardando, setGuardando] = useState(false);

  const pedidoDemo = {
    numero: 1, fecha: todayISO(), notas: 'Entregar antes de las 12hs',
    items: [
      { codigo: '10', cantidad: 20, nombre: 'Tapa empanada hojaldre x12', precioUnitario: 1800 },
      { codigo: '641', cantidad: 30, nombre: 'Untable salame', precioUnitario: 1800 },
    ],
    total: 20 * 1800 + 30 * 1800,
  };
  const clienteDemo = { nombre: 'Cliente de ejemplo', direccion: 'Direccion de ejemplo 123', telefono: '11-5555-5555' };

  const set = (k, v) => setPlantilla(pl => ({ ...pl, [k]: v }));
  const toggleColumna = (key) => setPlantilla(pl => ({ ...pl, columnas: pl.columnas.map(c => c.key === key ? { ...c, visible: !c.visible } : c) }));
  const renombrarColumna = (key, label) => setPlantilla(pl => ({ ...pl, columnas: pl.columnas.map(c => c.key === key ? { ...c, label } : c) }));
  const moverColumna = (idx, dir) => setPlantilla(pl => {
    const cols = [...pl.columnas];
    const j = idx + dir;
    if (j < 0 || j >= cols.length) return pl;
    [cols[idx], cols[j]] = [cols[j], cols[idx]];
    return { ...pl, columnas: cols };
  });
  const toggleBloque = (key) => setPlantilla(pl => ({ ...pl, bloques: pl.bloques.map(b => b.key === key ? { ...b, visible: !b.visible } : b) }));
  const moverBloque = (idx, dir) => setPlantilla(pl => {
    const bs = [...pl.bloques];
    const j = idx + dir;
    if (j < 0 || j >= bs.length) return pl;
    [bs[idx], bs[j]] = [bs[j], bs[idx]];
    return { ...pl, bloques: bs };
  });

  const guardar = async () => {
    setGuardando(true);
    await guardarPlantillaRemito(plantilla);
    setGuardando(false);
    closeModal();
  };
  const restaurar = () => setPlantilla(JSON.parse(JSON.stringify(DEFAULT_PLANTILLA)));

  return (
    <Modal title="Disenar remito" subtitle="Elegi que se muestra, en que orden, y con que textos" onClose={closeModal} wide>
      <div className="grid lg:grid-cols-2 gap-5">
        <div className="min-w-0">
          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Secciones (orden de impresion)</h4>
          <div className="space-y-1.5 mb-4">
            {plantilla.bloques.map((b, i) => (
              <div key={b.key} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'var(--surface-alt)' }}>
                <input type="checkbox" checked={b.visible} onChange={() => toggleBloque(b.key)} />
                <span className="text-sm flex-1" style={{ color: 'var(--ink)' }}>{b.label}</span>
                <button type="button" onClick={() => moverBloque(i, -1)} disabled={i === 0} style={{ color: 'var(--ink-2)', opacity: i === 0 ? 0.3 : 1 }}><ChevronUp size={15} /></button>
                <button type="button" onClick={() => moverBloque(i, 1)} disabled={i === plantilla.bloques.length - 1} style={{ color: 'var(--ink-2)', opacity: i === plantilla.bloques.length - 1 ? 0.3 : 1 }}><ChevronDown size={15} /></button>
              </div>
            ))}
          </div>

          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Datos del negocio a mostrar</h4>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarLogo} onChange={() => set('mostrarLogo', !plantilla.mostrarLogo)} /> Logo</label>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarDomicilioNegocio} onChange={() => set('mostrarDomicilioNegocio', !plantilla.mostrarDomicilioNegocio)} /> Domicilio</label>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarTelefonoNegocio} onChange={() => set('mostrarTelefonoNegocio', !plantilla.mostrarTelefonoNegocio)} /> Telefono</label>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarAlias} onChange={() => set('mostrarAlias', !plantilla.mostrarAlias)} /> Alias</label>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarInstagram} onChange={() => set('mostrarInstagram', !plantilla.mostrarInstagram)} /> Instagram</label>
          </div>

          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Datos del cliente</h4>
          <Field label="Texto antes del nombre del cliente">
            <input className="field-input w-full px-3 py-2 rounded-lg text-sm" value={plantilla.labelCliente} onChange={e => set('labelCliente', e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarDireccionCliente} onChange={() => set('mostrarDireccionCliente', !plantilla.mostrarDireccionCliente)} /> Direccion</label>
            <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink)' }}><input type="checkbox" checked={plantilla.mostrarTelefonoCliente} onChange={() => set('mostrarTelefonoCliente', !plantilla.mostrarTelefonoCliente)} /> Telefono</label>
          </div>

          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Columnas de la tabla de productos</h4>
          <div className="space-y-1.5 mb-4">
            {plantilla.columnas.map((c, i) => (
              <div key={c.key} className="flex items-center gap-2 px-2.5 py-2 rounded-lg" style={{ background: 'var(--surface-alt)' }}>
                <input type="checkbox" checked={c.visible} onChange={() => toggleColumna(c.key)} />
                <input className="field-input flex-1 min-w-0 px-2 py-1 rounded text-sm" value={c.label} onChange={e => renombrarColumna(c.key, e.target.value)} />
                <button type="button" onClick={() => moverColumna(i, -1)} disabled={i === 0} style={{ color: 'var(--ink-2)', opacity: i === 0 ? 0.3 : 1 }}><ChevronUp size={15} /></button>
                <button type="button" onClick={() => moverColumna(i, 1)} disabled={i === plantilla.columnas.length - 1} style={{ color: 'var(--ink-2)', opacity: i === plantilla.columnas.length - 1 ? 0.3 : 1 }}><ChevronDown size={15} /></button>
              </div>
            ))}
          </div>

          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Otros</h4>
          <Field label="Texto del total">
            <input className="field-input w-full px-3 py-2 rounded-lg text-sm" value={plantilla.labelTotal} onChange={e => set('labelTotal', e.target.value)} />
          </Field>
          <label className="flex items-center gap-2 text-sm mb-2" style={{ color: 'var(--ink)' }}>
            <input type="checkbox" checked={plantilla.mostrarNotas} onChange={() => set('mostrarNotas', !plantilla.mostrarNotas)} /> Mostrar notas del pedido (cuando tenga)
          </label>
        </div>

        <div className="min-w-0">
          <h4 className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--ink-2)' }}>Vista previa</h4>
          <div className="rounded-lg overflow-x-auto lg:sticky lg:top-0" style={{ background: '#DEE3E9', padding: 16 }}>
            <div style={{ transform: 'scale(0.82)', transformOrigin: 'top left', width: '122%' }}>
              <ReceiptContent pedido={pedidoDemo} cliente={clienteDemo} negocio={negocio} plantilla={plantilla} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-5">
        <button type="button" onClick={restaurar} className="text-sm font-medium" style={{ color: 'var(--ink-2)' }}>Restaurar diseno original</button>
        <button type="button" onClick={guardar} disabled={guardando} className="btn-primary px-5 py-2.5 rounded-lg text-sm">{guardando ? 'Guardando…' : 'Guardar diseno'}</button>
      </div>
    </Modal>
  );
}

/* ---------------------------------- root export ---------------------------------- */

export default function RootApp() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
