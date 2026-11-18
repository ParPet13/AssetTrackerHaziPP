import { Asset } from '../types/Types';

export const initialAssets: Asset[] = [
  {
    id: '1',
    name: 'Dell Latitude 5540',
    serialNumber: 'DL-2024-8891',
    purchasePrice: 420000,
    category: 'Laptop',
    status: 'Elérhető',
    notes: 'Tartalék tanári gép, frissen telepített Windows 11.'
  },
  {
    id: '2',
    name: 'Lenovo ThinkPad T14 Gen 4',
    serialNumber: 'LN-2023-4412',
    purchasePrice: 485000,
    category: 'Laptop',
    status: 'Kikölcsönözve',
    borrowerName: 'Kovács János (Informatika tanszék)',
    notes: 'Töltővel és laptoptáskával együtt kiadva.'
  },
  {
    id: '3',
    name: 'Dell UltraSharp U2723QE 27"',
    serialNumber: 'MN-2024-1102',
    purchasePrice: 215000,
    category: 'Monitor',
    status: 'Elérhető'
  },
  {
    id: '4',
    name: 'Epson EB-FH06 Full HD',
    serialNumber: 'EP-2022-9930',
    purchasePrice: 260000,
    category: 'Projektor',
    status: 'Szervizben',
    notes: 'Izzócsere szükséges, garanciális javításon.'
  },
  {
    id: '5',
    name: 'Apple MacBook Air M2',
    serialNumber: 'AP-2024-5521',
    purchasePrice: 510000,
    category: 'Laptop',
    status: 'Kikölcsönözve',
    borrowerName: 'Nagy Eszter (Grafika szakkör)'
  },
  {
    id: '6',
    name: 'Logitech MX Master 3S Egér',
    serialNumber: 'LG-2024-3319',
    purchasePrice: 38000,
    category: 'Kiegészítő',
    status: 'Elérhető'
  },
  {
    id: '7',
    name: 'LG 24" IPS Irodai Monitor',
    serialNumber: 'LG-2023-7741',
    purchasePrice: 65000,
    category: 'Monitor',
    status: 'Elérhető',
    notes: 'HDMI kábellel dobozban.'
  }
];