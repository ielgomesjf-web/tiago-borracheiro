export const clientProfile = {
  name: 'Carlos Eduardo Silva',
  phone: '(11) 98765-4321',
  email: 'carlos.silva@email.com',
  vehicles: [
    { model: 'Toyota Corolla 2022', plate: 'ABC-1D23', type: 'car' as const },
    { model: 'Honda CB 500 2024', plate: 'XYZ-9A87', type: 'moto' as const },
  ],
};

export const providerProfile = {
  name: 'Nome da Sua Empresa Aqui',
  initials: 'NA',
  rating: 4.8,
  memberSince: 'junho de 2023',
  totalServices: 1247,
  acceptanceRate: 94,
  avgResponseTime: 8,
  todayEarnings: 320.0,
  todayServices: 5,
  hoursOnline: 6.5,
  weekEarnings: 1840.0,
  weekServices: 28,
  weekHours: 38,
  monthEarnings: 7260.0,
  monthServices: 112,
  monthHours: 156,
  isOnline: false,
};

export const services = [
  { id: 1, name: 'Troca de pneu', duration: 25, price: 60.0 },
  { id: 2, name: 'Remendo (vulcanizacao)', duration: 20, price: 40.0 },
  { id: 3, name: 'Calibragem (4 pneus)', duration: 10, price: 20.0 },
  { id: 4, name: 'Troca de pneu novo', duration: 30, price: 80.0 },
  { id: 5, name: 'Rodizio de pneus', duration: 40, price: 100.0 },
  { id: 6, name: 'Balanceamento', duration: 30, price: 70.0 },
];

export const nearbyProviders = [
  { id: 1, name: 'Tiago', rating: 4.8, lat: -23.561, lng: -46.656, online: true },
  { id: 2, name: 'Marcos', rating: 4.6, lat: -23.565, lng: -46.652, online: true },
  { id: 3, name: 'Roberto', rating: 4.9, lat: -23.558, lng: -46.659, online: true },
  { id: 4, name: 'Fernando', rating: 4.5, lat: -23.567, lng: -46.648, online: true },
  { id: 5, name: 'Wellington', rating: 4.7, lat: -23.570, lng: -46.660, online: false },
];

export const trackingProvider = {
  name: 'Roberto',
  rating: 4.9,
  eta: 5,
};

export const orderHistory = [
  { id: 1, service: 'Remendo (vulcanizacao)', provider: 'Marcos Lima', date: '27/02/2026', rating: 4, price: 40.0, status: 'completed' as const, vehicleType: 'car' as const },
  { id: 2, service: 'Calibragem', provider: 'Nome da Empresa', date: '14/02/2026', rating: 5, price: 10.0, status: 'completed' as const, vehicleType: 'car' as const },
  { id: 3, service: 'Troca de pneu', provider: 'Fernando Santos', date: '19/01/2026', rating: 0, price: 100.0, status: 'cancelled' as const, vehicleType: 'moto' as const },
  { id: 4, service: 'Rodizio de pneus', provider: 'Wellington Oliveira', date: '04/01/2026', rating: 5, price: 100.0, status: 'completed' as const, vehicleType: 'car' as const },
];

export const weeklyEarnings = [
  { day: 'Seg', value: 180 },
  { day: 'Ter', value: 260 },
  { day: 'Qua', value: 320 },
  { day: 'Qui', value: 210 },
  { day: 'Sex', value: 390 },
  { day: 'Sab', value: 280 },
  { day: 'Dom', value: 200 },
];

export const transactions = [
  { id: 1, service: 'Troca de pneu', client: 'Carlos E.', time: '14:30', amount: 60.0, method: 'pix' as const, status: 'received' as const },
  { id: 2, service: 'Remendo', client: 'Ana Paula M.', time: '12:15', amount: 40.0, method: 'card' as const, status: 'received' as const },
  { id: 3, service: 'Calibragem (4 pneus)', client: 'Ricardo F.', time: '10:00', amount: 20.0, method: 'pix' as const, status: 'received' as const },
  { id: 4, service: 'Troca de pneu novo', client: 'Fernanda L.', time: '08:30', amount: 80.0, method: 'cash' as const, status: 'received' as const },
  { id: 5, service: 'Balanceamento', client: 'Bruno S.', time: '16:45', amount: 70.0, method: 'card' as const, status: 'pending' as const },
];

export const providerReviews = [
  { id: 1, client: 'Carlos E.', rating: 5, comment: 'Excelente! Chegou rapido e resolveu na hora.', date: '11/03/2026', service: 'Troca de pneu' },
  { id: 2, client: 'Ana Paula M.', rating: 5, comment: 'Muito profissional, recomendo!', date: '11/03/2026', service: 'Remendo' },
  { id: 3, client: 'Ricardo F.', rating: 4, comment: 'Bom servico, so demorou um pouco.', date: '10/03/2026', service: 'Calibragem' },
  { id: 4, client: 'Fernanda L.', rating: 5, comment: 'Salvou meu dia! Top demais.', date: '09/03/2026', service: 'Troca de pneu novo' },
  { id: 5, client: 'Bruno S.', rating: 5, comment: 'Trabalho bem feito.', date: '08/03/2026', service: 'Troca de pneu' },
];

export const aiResponses: Record<string, string> = {
  'preco|custo|custa|valor|quanto': 'Os precos variam conforme o servico:\n\n- Troca de pneu: R$ 60,00 (25 min)\n- Remendo/Vulcanizacao: R$ 40,00 (20 min)\n- Calibragem (4 pneus): R$ 20,00 (10 min)\n- Troca pneu novo: R$ 80,00 (30 min)\n- Rodizio: R$ 100,00 (40 min)\n- Balanceamento: R$ 70,00 (30 min)',
  'pressao|calibra': 'A pressao ideal para carros de passeio e geralmente 32 PSI (libras). Verifique sempre o manual do veiculo ou a etiqueta na porta do motorista. Pneus moto variam entre 28-36 PSI dependendo do modelo.',
  'troca|furou|furo': 'Para troca de pneu, o servico custa R$ 60,00 e leva cerca de 25 minutos. Se for apenas um furo, o remendo (vulcanizacao) sai por R$ 40,00 em 20 minutos. Basta acionar o botao SOS no app!',
  'pagamento|pagar|pix': 'Aceitamos 3 formas de pagamento:\n\n- Pix (transferencia instantanea)\n- Cartao de credito/debito\n- Dinheiro\n\nO pagamento e feito diretamente ao borracheiro apos o servico.',
  'manutencao|dica|cuidado': 'Dicas de manutencao de pneus:\n\n1. Calibre os pneus a cada 15 dias\n2. Faca rodizio a cada 10.000 km\n3. Verifique o desgaste regularmente\n4. Evite freadas bruscas\n5. Nao suba em calcadas\n6. Faca balanceamento a cada 10.000 km',
  'horario|funciona|atende': 'Nosso servico funciona 24 horas por dia, 7 dias por semana! Sempre que voce precisar, tera um borracheiro disponivel na sua regiao.',
  'vulcaniza': 'A vulcanizacao (remendo) e o processo de reparo de furos no pneu. Custa R$ 40,00 e leva cerca de 20 minutos. E indicada para furos pequenos. Para danos maiores, recomendamos a troca do pneu.',
};

export const defaultAiResponse = 'Posso te ajudar com informacoes sobre precos, servicos, pressao de pneus, formas de pagamento e dicas de manutencao. O que gostaria de saber?';
