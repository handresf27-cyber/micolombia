import type { Department } from '../models/department'

// DIVIPOLA department codes; Bogotá D. C. is excluded from this 32-department MVP.
export const departments: Department[] = [
  { id: '91', name: 'Amazonas', flagCode: 'CO-AMA' }, { id: '05', name: 'Antioquia', flagCode: 'CO-ANT' },
  { id: '81', name: 'Arauca', flagCode: 'CO-ARA' }, { id: '08', name: 'Atlántico', flagCode: 'CO-ATL' },
  { id: '13', name: 'Bolívar', flagCode: 'CO-BOL' }, { id: '15', name: 'Boyacá', flagCode: 'CO-BOY' },
  { id: '17', name: 'Caldas', flagCode: 'CO-CAL' }, { id: '18', name: 'Caquetá', flagCode: 'CO-CAQ' },
  { id: '85', name: 'Casanare', flagCode: 'CO-CAS' }, { id: '19', name: 'Cauca', flagCode: 'CO-CAU' },
  { id: '20', name: 'Cesar', flagCode: 'CO-CES' }, { id: '27', name: 'Chocó', flagCode: 'CO-CHO' },
  { id: '23', name: 'Córdoba', flagCode: 'CO-COR' }, { id: '25', name: 'Cundinamarca', flagCode: 'CO-CUN' },
  { id: '94', name: 'Guainía', flagCode: 'CO-GUA' }, { id: '95', name: 'Guaviare', flagCode: 'CO-GUV' },
  { id: '41', name: 'Huila', flagCode: 'CO-HUI' }, { id: '44', name: 'La Guajira', flagCode: 'CO-LAG' },
  { id: '47', name: 'Magdalena', flagCode: 'CO-MAG' }, { id: '50', name: 'Meta', flagCode: 'CO-MET' },
  { id: '52', name: 'Nariño', flagCode: 'CO-NAR' }, { id: '54', name: 'Norte de Santander', flagCode: 'CO-NSA' },
  { id: '86', name: 'Putumayo', flagCode: 'CO-PUT' }, { id: '63', name: 'Quindío', flagCode: 'CO-QUI' },
  { id: '66', name: 'Risaralda', flagCode: 'CO-RIS' }, { id: '88', name: 'San Andrés, Providencia y Santa Catalina', shortName: 'San Andrés', flagCode: 'CO-SAP' },
  { id: '68', name: 'Santander', flagCode: 'CO-SAN' }, { id: '70', name: 'Sucre', flagCode: 'CO-SUC' },
  { id: '73', name: 'Tolima', flagCode: 'CO-TOL' }, { id: '76', name: 'Valle del Cauca', flagCode: 'CO-VAC' },
  { id: '97', name: 'Vaupés', flagCode: 'CO-VAU' }, { id: '99', name: 'Vichada', flagCode: 'CO-VID' },
]
