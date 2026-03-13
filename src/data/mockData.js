// CLIENT PROFILE
export const clientProfile = {
  id: 'cli-001',
  name: 'Carlos Eduardo Silva',
  phone: '(11) 98765-4321',
  email: 'carlos.silva@email.com',
  vehicles: [
    {
      id: 'v1',
      type: 'carro',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      plate: 'ABC-1D23',
      tireSize: '205/55 R16',
    },
    {
      id: 'v2',
      type: 'moto',
      brand: 'Honda',
      model: 'CB 500',
      year: 2024,
      plate: 'XYZ-9A87',
      tireSize: '120/70 R17',
    },
  ],
};

// PROVIDER PROFILE
export const providerProfile = {
  id: 'prv-001',
  name: 'Tiago Borracheiro',
  phone: '(11) 91234-5678',
  rating: 4.8,
  totalServices: 1247,
  acceptanceRate: 94,
  avgResponseTime: '8 min',
  memberSince: '2023-06-15',
  specialties: ['Carros', 'Vans', 'Motos'],
  workArea: 'Zona Sul - Sao Paulo',
};

// SERVICE CATEGORIES with prices in BRL
export const serviceCategories = {
  moto: {
    label: 'Moto',
    services: [
      { id: 'moto-1', name: 'Troca de pneu', price: 40, duration: '20 min' },
      {
        id: 'moto-2',
        name: 'Remendo (vulcanizacao)',
        price: 25,
        duration: '15 min',
      },
      { id: 'moto-3', name: 'Calibragem', price: 10, duration: '5 min' },
      {
        id: 'moto-4',
        name: 'Troca de camara de ar',
        price: 35,
        duration: '15 min',
      },
    ],
  },
  carro: {
    label: 'Carro',
    services: [
      {
        id: 'carro-1',
        name: 'Troca de pneu (estepe)',
        price: 60,
        duration: '25 min',
      },
      {
        id: 'carro-2',
        name: 'Remendo (vulcanizacao)',
        price: 40,
        duration: '20 min',
      },
      {
        id: 'carro-3',
        name: 'Calibragem (4 pneus)',
        price: 20,
        duration: '10 min',
      },
      {
        id: 'carro-4',
        name: 'Troca de pneu novo',
        price: 80,
        duration: '30 min',
      },
      {
        id: 'carro-5',
        name: 'Rodizio de pneus',
        price: 100,
        duration: '40 min',
      },
      {
        id: 'carro-6',
        name: 'Balanceamento',
        price: 70,
        duration: '30 min',
      },
    ],
  },
  van: {
    label: 'Van / Utilitario',
    services: [
      { id: 'van-1', name: 'Troca de pneu', price: 100, duration: '35 min' },
      {
        id: 'van-2',
        name: 'Remendo (vulcanizacao)',
        price: 60,
        duration: '25 min',
      },
      { id: 'van-3', name: 'Calibragem', price: 30, duration: '15 min' },
      {
        id: 'van-4',
        name: 'Troca de pneu novo',
        price: 120,
        duration: '40 min',
      },
    ],
  },
};

// PAYMENT METHODS
export const paymentMethods = [
  { id: 'pix', label: 'Pix', description: 'Transferencia instantanea' },
  { id: 'card', label: 'Cartao', description: 'Credito ou debito' },
  { id: 'cash', label: 'Dinheiro', description: 'Pagamento em especie' },
];

// NEARBY PROVIDERS (São Paulo real coordinates)
export const nearbyProviders = [
  {
    id: 'prv-001',
    name: 'Tiago',
    rating: 4.8,
    distance: '1.2 km',
    eta: '8 min',
    lat: -23.5615,
    lng: -46.656,
    services: 1247,
    online: true,
  },
  {
    id: 'prv-002',
    name: 'Marcos',
    rating: 4.6,
    distance: '2.1 km',
    eta: '12 min',
    lat: -23.558,
    lng: -46.649,
    services: 890,
    online: true,
  },
  {
    id: 'prv-003',
    name: 'Roberto',
    rating: 4.9,
    distance: '0.8 km',
    eta: '5 min',
    lat: -23.564,
    lng: -46.653,
    services: 2100,
    online: true,
  },
  {
    id: 'prv-004',
    name: 'Fernando',
    rating: 4.5,
    distance: '3.4 km',
    eta: '18 min',
    lat: -23.555,
    lng: -46.661,
    services: 456,
    online: true,
  },
  {
    id: 'prv-005',
    name: 'Wellington',
    rating: 4.7,
    distance: '1.8 km',
    eta: '10 min',
    lat: -23.567,
    lng: -46.647,
    services: 678,
    online: false,
  },
];

// ORDER HISTORY (5 orders)
export const orderHistory = [
  {
    id: 'ord-001',
    date: '2026-03-12',
    status: 'completed',
    service: 'Troca de pneu (estepe)',
    vehicleType: 'carro',
    provider: { name: 'Roberto Souza', rating: 4.9 },
    price: 60,
    payment: 'pix',
    rating: 5,
    address: 'Av. Paulista, 1578 - Sao Paulo',
    duration: '22 min',
  },
  {
    id: 'ord-002',
    date: '2026-02-28',
    status: 'completed',
    service: 'Remendo (vulcanizacao)',
    vehicleType: 'carro',
    provider: { name: 'Marcos Lima', rating: 4.6 },
    price: 40,
    payment: 'card',
    rating: 4,
    address: 'R. Oscar Freire, 300 - Sao Paulo',
    duration: '18 min',
  },
  {
    id: 'ord-003',
    date: '2026-02-15',
    status: 'completed',
    service: 'Calibragem',
    vehicleType: 'moto',
    provider: { name: 'Tiago Borracheiro', rating: 4.8 },
    price: 10,
    payment: 'cash',
    rating: 5,
    address: 'R. Augusta, 2200 - Sao Paulo',
    duration: '7 min',
  },
  {
    id: 'ord-004',
    date: '2026-01-20',
    status: 'cancelled',
    service: 'Troca de pneu',
    vehicleType: 'van',
    provider: { name: 'Fernando Santos', rating: 4.5 },
    price: 100,
    payment: 'pix',
    rating: null,
    address: 'Av. Brasil, 500 - Sao Paulo',
    duration: null,
  },
  {
    id: 'ord-005',
    date: '2026-01-05',
    status: 'completed',
    service: 'Rodizio de pneus',
    vehicleType: 'carro',
    provider: { name: 'Wellington Oliveira', rating: 4.7 },
    price: 100,
    payment: 'card',
    rating: 5,
    address: 'R. Consolacao, 1500 - Sao Paulo',
    duration: '38 min',
  },
];

// PROVIDER EARNINGS
export const providerEarnings = {
  today: { total: 320, services: 5, hours: 6.5 },
  week: { total: 1840, services: 28, hours: 38 },
  month: { total: 7260, services: 112, hours: 156 },
};

// PROVIDER TRANSACTIONS (8 items)
export const providerTransactions = [
  {
    id: 't1',
    date: '2026-03-13 14:30',
    service: 'Troca de pneu',
    client: 'Carlos E.',
    amount: 60,
    payment: 'pix',
    status: 'received',
  },
  {
    id: 't2',
    date: '2026-03-13 12:15',
    service: 'Remendo',
    client: 'Ana Paula M.',
    amount: 40,
    payment: 'card',
    status: 'received',
  },
  {
    id: 't3',
    date: '2026-03-13 10:00',
    service: 'Calibragem (4 pneus)',
    client: 'Ricardo F.',
    amount: 20,
    payment: 'cash',
    status: 'received',
  },
  {
    id: 't4',
    date: '2026-03-13 08:30',
    service: 'Troca de pneu novo',
    client: 'Fernanda L.',
    amount: 80,
    payment: 'pix',
    status: 'received',
  },
  {
    id: 't5',
    date: '2026-03-12 16:45',
    service: 'Troca de pneu',
    client: 'Bruno S.',
    amount: 100,
    payment: 'card',
    status: 'received',
  },
  {
    id: 't6',
    date: '2026-03-12 14:20',
    service: 'Balanceamento',
    client: 'Patricia O.',
    amount: 70,
    payment: 'pix',
    status: 'pending',
  },
  {
    id: 't7',
    date: '2026-03-12 11:00',
    service: 'Remendo',
    client: 'Diego M.',
    amount: 40,
    payment: 'cash',
    status: 'received',
  },
  {
    id: 't8',
    date: '2026-03-12 09:15',
    service: 'Calibragem',
    client: 'Camila R.',
    amount: 10,
    payment: 'pix',
    status: 'received',
  },
];

export const providerWeeklyEarnings = [
  { day: 'Seg', earnings: 280 },
  { day: 'Ter', earnings: 340 },
  { day: 'Qua', earnings: 220 },
  { day: 'Qui', earnings: 380 },
  { day: 'Sex', earnings: 420 },
  { day: 'Sab', earnings: 200 },
  { day: 'Dom', earnings: 0 },
];

// PROVIDER REVIEWS
export const providerReviews = [
  {
    id: 'r1',
    client: 'Carlos E.',
    rating: 5,
    comment: 'Excelente! Chegou rapido e resolveu na hora.',
    date: '2026-03-12',
    service: 'Troca de pneu',
  },
  {
    id: 'r2',
    client: 'Ana Paula M.',
    rating: 5,
    comment: 'Muito profissional, recomendo!',
    date: '2026-03-12',
    service: 'Remendo',
  },
  {
    id: 'r3',
    client: 'Ricardo F.',
    rating: 4,
    comment: 'Bom servico, so demorou um pouco.',
    date: '2026-03-11',
    service: 'Calibragem',
  },
  {
    id: 'r4',
    client: 'Fernanda L.',
    rating: 5,
    comment: 'Salvou meu dia! Top demais.',
    date: '2026-03-10',
    service: 'Troca de pneu novo',
  },
  {
    id: 'r5',
    client: 'Bruno S.',
    rating: 4,
    comment: 'Trabalho bem feito.',
    date: '2026-03-09',
    service: 'Troca de pneu',
  },
];

// ACTIVE ORDER (for tracking page)
export const activeOrder = {
  id: 'ord-active',
  status: 'provider_en_route',
  provider: {
    id: 'prv-003',
    name: 'Roberto',
    rating: 4.9,
    distance: '0.8 km',
    eta: '5 min',
    lat: -23.564,
    lng: -46.653,
    services: 2100,
  },
  service: {
    name: 'Troca de pneu (estepe)',
    price: 60,
    vehicleType: 'carro',
  },
  eta: '5 min',
  payment: 'pix',
  clientLocation: { lat: -23.563, lng: -46.6545 },
  createdAt: '2026-03-13T14:25:00',
};

// INCOMING CALL (provider view)
export const incomingCall = {
  id: 'call-001',
  client: { name: 'Carlos E.', phone: '(11) 98765-xxxx' },
  service: 'Troca de pneu (estepe)',
  vehicleType: 'carro',
  distance: '1.2 km',
  estimatedEarnings: 60,
  address: 'Av. Paulista, 1578 - Bela Vista',
  clientLocation: { lat: -23.563, lng: -46.6545 },
  timeLimit: 30,
};
