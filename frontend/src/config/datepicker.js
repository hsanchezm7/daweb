import { TempusDominus, loadLocale } from '@eonasdan/tempus-dominus';
import '@eonasdan/tempus-dominus/dist/css/tempus-dominus.min.css';
import {
  localization as esLocalization,
  name as esName,
} from '@eonasdan/tempus-dominus/dist/locales/es';

const esLocale = {
  ...esLocalization,
  format: 'L',
  dayViewHeaderFormat: { month: 'long', year: 'numeric' },
  dateFormats: {
    ...esLocalization.dateFormats,
    L: 'dd/MM/yyyy',
  },
};

loadLocale({ localization: esLocale, name: esName });

// display en formato dd/MM/yyyy (ES)
const displayFormatter = new Intl.DateTimeFormat('es-ES', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

export const formatDateForDisplay = (date) => displayFormatter.format(date);

// convierte dd/MM/yyyy -> yyyy-MM-dd
export const formatDateForPayload = (displayDate) => {
  if (!displayDate) return '';
  const [day, month, year] = displayDate.split('/');
  if (!day || !month || !year) return '';
  return `${year}-${month}-${day}`;
};

// convierte yyyy-MM-dd -> dd/MM/yyyy
export const formatDateFromBackend = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
};

export const createBirthDatePicker = (element) => {
  const picker = new TempusDominus(element, {
    container: document.body,
    useCurrent: false,
    viewDate: new Date(2000, 0, 1),
    restrictions: {
      maxDate: new Date(),
    },
    display: {
      icons: {
        type: 'icons',
        time: 'bi bi-clock',
        date: 'bi bi-calendar',
        up: 'bi bi-chevron-up',
        down: 'bi bi-chevron-down',
        previous: 'bi bi-chevron-left',
        next: 'bi bi-chevron-right',
        today: 'bi bi-calendar-check',
        clear: 'bi bi-trash',
        close: 'bi bi-x-lg',
      },
      components: {
        clock: false,
        hours: false,
        minutes: false,
        seconds: false,
      },
      buttons: {
        today: true,
        clear: true,
        close: true,
      },
      inline: false,
    },
  });

  picker.locale(esName);
  return picker;
};
