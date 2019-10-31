import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';

export const showNotification = ({
  type,
  message,
}: {
  type: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  message: string;
}): void => {
  let backgroundColor: string;
  switch (type) {
    case 'ERROR':
      backgroundColor = red.A400;
      break;
    case 'WARNING':
      backgroundColor = orange.A400;
      break;
    case 'SUCCESS':
      backgroundColor = green.A400;
      break;
    default:
      backgroundColor = green.A400;
      break;
  }
  // eslint-disable-next-line no-alert
  alert(`${type}-${backgroundColor}: ${message}`);
};
