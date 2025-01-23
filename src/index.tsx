import App from '@app/App';
import ErrorBoundary from '@app/providers/ErrorBoundary';
import { StateSchema, StoreProvider } from '@app/providers/StoreProvider';
import '@app/styles/index.scss';
import { Row } from '@entities/table';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. Не удалось вмонтировать реакт приложение',
  );
}

const mockRows: Row[] = [
  {
    id: '1',
    company: 'Company A',
    address: '123 Main St, City A',
    selected: false,
  },
  {
    id: '2',
    company: 'Company B',
    address: '456 Side St, City B',
    selected: false,
  },
  {
    id: '3',
    company: 'Company C',
    address: '789 Other St, City C',
    selected: false,
  },
];

const initialState: StateSchema = {
  table: {
    columns: ['', 'Название комании', 'Адрес'],
    rows: mockRows,
    selectedRows: [],
  },
};

const root = createRoot(container);

root.render(
  <StoreProvider initialState={initialState}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StoreProvider>,
);
