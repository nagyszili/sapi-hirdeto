import { AlertProps } from '../../modals/types';
import { uiStateVar } from '../reactiveVariables';

export const setLoading = (loading: boolean) => {
  uiStateVar({ ...uiStateVar(), isLoading: loading });
};

export const showAlert = (alert: AlertProps) => {
  uiStateVar({ ...uiStateVar(), isLoading: false, activeAlert: alert });
};

export const hideAlert = () => {
  uiStateVar({ ...uiStateVar(), activeAlert: null });
};
