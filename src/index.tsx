import App from '@app/App';
import { mockRows } from '@app/mock/data';
import ErrorBoundary from '@app/providers/ErrorBoundary';
import { StateSchema, StoreProvider } from '@app/providers/StoreProvider';
import '@app/styles/index.scss';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

if (!container) {
  throw new Error(
    'Контейнер root не найден. Не удалось вмонтировать реакт приложение',
  );
}

const initialState: StateSchema = {
  table: {
    columns: ['', 'Название комании', 'Адрес'],
    rows: mockRows,
    selectedRows: [],
    allSelected: false,
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
